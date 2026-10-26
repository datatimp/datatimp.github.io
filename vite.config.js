import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { imageSize } from 'image-size';

// Case-study images load lazily, so the browser doesn't know their size until
// they arrive. Without a size, each one starts 0px tall and the page grows as
// they load, which throws off the outline nav's jumps. This reads every image's
// width and height at build time and serves them as `virtual:asset-dims`,
// keyed like the asset glob in src/content/caseStudies.js
// ('./case-studies/<slug>/assets/<file>'), so <img> can reserve its space.
const CONTENT = join(import.meta.dirname, 'src/content');
const IMAGE = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

function readAssetDims() {
  const dims = {};
  for (const slug of readdirSync(join(CONTENT, 'case-studies'), { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const assets = join(CONTENT, 'case-studies', slug.name, 'assets');
    let files;
    try { files = readdirSync(assets, { recursive: true }); } catch { continue; }
    for (const file of files) {
      if (!IMAGE.test(file)) continue;
      const path = join(assets, file);
      try {
        const { width, height } = imageSize(readFileSync(path));
        if (width && height) dims['./' + relative(CONTENT, path).split(sep).join('/')] = [width, height];
      } catch { /* unreadable or unsized (e.g. an SVG without a viewBox): no reservation */ }
    }
  }
  return dims;
}

function assetDims() {
  const id = 'virtual:asset-dims';
  const resolved = '\0' + id;
  return {
    name: 'asset-dims',
    resolveId: (source) => (source === id ? resolved : undefined),
    load: (source) => (source === resolved ? `export default ${JSON.stringify(readAssetDims())};` : undefined),
    // Dev: a new or re-exported image gets its size without restarting Vite.
    configureServer(server) {
      const refresh = (file) => {
        if (!file.includes(`${sep}assets${sep}`) || !IMAGE.test(file)) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('change', refresh);
    },
  };
}

export default defineConfig({
  plugins: [react(), assetDims()],
});
