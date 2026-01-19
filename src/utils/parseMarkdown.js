/**
 * Simple browser-friendly frontmatter parser
 * Parses YAML frontmatter from markdown strings
 */
export function parseMarkdown(raw) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/;
    const match = raw.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content: raw };
    }

    const [, frontmatter, content] = match;
    const data = {};

    // Parse simple YAML key: value pairs
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // Convert numbers
            if (!isNaN(value) && value !== '') {
                value = Number(value);
            }

            data[key] = value;
        }
    });

    return { data, content: content.trim() };
}
