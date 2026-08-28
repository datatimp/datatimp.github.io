/**
 * Turn a friendly `box:` object from a block's frontmatter into an inline style,
 * so authors can style a block's WHOLE container (not just its media frame) from
 * index.md — no CSS hunting.
 *
 *   - type: phone
 *     box:
 *       background: "#f0f3f7"     # quote hex! (# is a YAML comment otherwise)
 *       border: "1px solid #d8d8d8"
 *       padding: "2rem"
 *       radius: "14px"
 *
 * Note: the existing `background`/`border`/`radius`/`padding` keys style the
 * MEDIA FRAME (the box around the image/video). `box:` styles the block wrapper
 * (media + heading + text together). Use whichever you mean.
 */
export function boxStyle(box) {
    if (!box || typeof box !== 'object') return undefined;
    const s = {};
    if (box.background) s.background = box.background;
    if (box.border) s.border = box.border;
    if (box.padding) s.padding = box.padding;
    if (box.radius) s.borderRadius = box.radius;
    if (box.margin) s.margin = box.margin;
    if (box.maxWidth) s.maxWidth = box.maxWidth;
    if (box.shadow) s.boxShadow = box.shadow;
    if (box.align) s.textAlign = box.align;
    return Object.keys(s).length ? s : undefined;
}
