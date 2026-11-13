import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { imageSize } from 'image-size';
import { load as yamlLoad } from 'js-yaml';
import { createHash } from 'node:crypto';

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

// Link previews (iMessage, Slack, LinkedIn, etc.) read <meta> tags from the raw
// HTML and never run JavaScript. As a single-page app, the site had one
// index.html, and GitHub Pages answered /heartful-gardens with a 404 redirect
// page that had no tags at all. This writes tags into index.html for the home
// page and emits a real <slug>/index.html per live case study, so each URL
// returns 200 with its own title, description and image. Share images live
// in public/og/ (1200x630) at stable URLs: <slug>.jpg for screenshots,
// home.png for the home page. Replace a file and its URL changes on the next
// build (see versioned() below), so previews pick up the new image.
const SITE = 'https://timpevey.com';
const SITE_NAME = 'Tim Pevey';
const HOME = {
  path: '/',
  title: 'Tim Pevey | Product Designer, UI, and Design Systems',
  description: 'Product and UI designer focused on simplicity, clarity, and systems thinking. Work in web, design systems, and motion.',
  image: '/og/home.png', // PNG: crisp type on a flat graphic
};

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Frontmatter uses *asterisks* for emphasis; previews show plain text.
const plain = (s) => String(s || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();

function readStudyPages() {
  const pages = [];
  for (const dir of readdirSync(join(CONTENT, 'case-studies'), { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    let raw;
    try { raw = readFileSync(join(CONTENT, 'case-studies', dir.name, 'index.md'), 'utf8'); } catch { continue; }
    const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
    const data = m ? yamlLoad(m[1]) || {} : {};
    if (!data.slug || data.draft) continue;
    pages.push({
      path: `/${data.slug}/`,
      // metaTitle / metaDescription in the frontmatter win; otherwise fall back.
      title: data.metaTitle || `${data.title} Case Study | ${SITE_NAME}`,
      description: plain(data.metaDescription || data.tagline || data.summary),
      image: `/og/${data.slug}.jpg`,
    });
  }
  return pages;
}

// Link previews cache images by URL, so a replaced file at the same address
// goes unnoticed. Adding a short hash of the file's contents (?v=3f9a2c1b)
// gives every new version of an image a new address automatically.
function versioned(image) {
  try {
    const hash = createHash('sha1').update(readFileSync(join(import.meta.dirname, 'public', image))).digest('hex');
    return `${image}?v=${hash.slice(0, 8)}`;
  } catch {
    return image; // file missing: plain URL
  }
}

function metaTags({ path, title, description, image }) {
  const url = SITE + path;
  const img = SITE + versioned(image);
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  return [
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${t}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ].join('\n    ');
}

const withMeta = (html, page) => html
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>\n    ${metaTags(page)}`);

function socialMeta() {
  return {
    name: 'social-meta',
    apply: 'build',
    enforce: 'post', // run after Vite has written index.html into the bundle
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (!index) return;
      const html = String(index.source);
      index.source = withMeta(html, HOME);
      for (const page of readStudyPages()) {
        this.emitFile({ type: 'asset', fileName: `${page.path.slice(1)}index.html`, source: withMeta(html, page) });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), assetDims(), socialMeta()],
});
