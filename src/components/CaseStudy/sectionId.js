/**
 * Anchor id for a section/subsection, derived from its number ("01", "02a") so
 * the outline nav and the rendered header always agree without the author having
 * to add ids in frontmatter. Falls back to the heading when there's no number.
 */
export const sectionId = (number, heading) =>
    `sec-${String(number || heading || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
