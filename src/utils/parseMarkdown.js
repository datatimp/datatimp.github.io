import { load as yamlLoad } from 'js-yaml';

/**
 * Frontmatter parser: splits `---` YAML frontmatter from the markdown body and
 * parses the frontmatter with js-yaml, so lists (tools:, skills:) and nested
 * values work — not just flat `key: value` pairs. Matches the case-study loader.
 */
export function parseMarkdown(raw) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
    const match = raw.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content: raw };
    }

    const [, frontmatter, content] = match;
    return { data: yamlLoad(frontmatter) || {}, content: content.trim() };
}
