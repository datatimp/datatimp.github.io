import { load as yamlLoad } from 'js-yaml';

/**
 * Case-study content loader.
 *
 * Reads every `src/content/case-studies/<slug>/index.md`, parses its YAML
 * frontmatter, and resolves any asset path (a string starting with `./assets/`)
 * to its final bundled URL. Everything a case study needs is colocated in its
 * own folder, so authors just reference `./assets/foo.webp` in the frontmatter.
 */

// Raw markdown of each case study (frontmatter + body), eager as strings.
const rawFiles = import.meta.glob('./case-studies/*/index.md', {
    eager: true,
    query: '?raw',
    import: 'default',
});

// Every colocated asset, resolved to its hashed/bundled URL.
const assetUrls = import.meta.glob(
    './case-studies/*/assets/**/*.{png,jpg,jpeg,webp,svg,gif,riv,avif,mp4,webm}',
    { eager: true, query: '?url', import: 'default' },
);

function splitFrontmatter(raw) {
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return { data: {}, body: raw.trim() };
    return { data: yamlLoad(m[1]) || {}, body: m[2].trim() };
}

// Turn any `./assets/...` reference (relative to the study folder) into its URL.
function resolveAssets(dir, value) {
    if (typeof value === 'string') {
        if (value.startsWith('./')) {
            const key = dir + value.slice(1); // './case-studies/x' + '/assets/y'
            return assetUrls[key] || value;
        }
        return value;
    }
    if (Array.isArray(value)) return value.map((v) => resolveAssets(dir, v));
    if (value && typeof value === 'object') {
        const out = {};
        for (const k of Object.keys(value)) out[k] = resolveAssets(dir, value[k]);
        return out;
    }
    return value;
}

export const caseStudies = Object.entries(rawFiles)
    .map(([path, raw]) => {
        const dir = path.replace(/\/index\.md$/, '');
        const { data, body } = splitFrontmatter(raw);
        return { ...resolveAssets(dir, data), body, path };
    })
    // Hide `draft: true` studies (unfinished) from both the home grid and routes.
    .filter((c) => !c.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
