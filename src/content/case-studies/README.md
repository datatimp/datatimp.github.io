# Case study authoring guide

Everything you can control from a case study's `index.md` — no component edits needed.
Each case study lives in its own folder (`dime/`, `heartful-gardens/`, `palettary/`) with an
`index.md` and a colocated `assets/` folder.

An `index.md` has two parts: **top-matter** (meta about the study) and a **`blocks:` list**
(the page content, top to bottom).

---

## Top-matter fields

| Field | What it does |
|---|---|
| `title` | Case study title (hero + nav). |
| `slug` | URL segment, e.g. `heartful-gardens` → `/work/heartful-gardens`. |
| `order` | Sort position on the home page. |
| `disciplines` | List of tags shown under the hero title. |
| `role`, `client`, `tools`, `platform`, `timeline`, `liveUrl` | Fill the **Snapshot bar** under the hero. Any you omit are hidden. `tools` can be a list. `liveUrl` renders a "Visit ↗" link. |
| `summary` | Large intro paragraph above the first block. |
| `card` | Thumbnail image for the home-page grid. |
| `hero` | Hero image or `.riv` at the top of the page. |
| `heroRiveProps` | Rive settings for a `.riv` hero (see **Rive props** below). |

---

## Blocks

Every item under `blocks:` needs a `type:`. Here are the types and their fields.

### Structural headings (your 4-tier hierarchy)

| Tier | How to make it |
|---|---|
| **Section Title** (`01 Identity`) | `type: section` with `number`, `heading`, optional `problem` |
| **Section Sub-title** (`01a Logo`) | `type: subsection` with `number`, `heading`, optional `body` |
| **Section Header** (`Logo concept`) | the `heading` on a `row` / `image` block (default) |
| **Media Title** (`Business cards`) | the `heading` on a `row` / `image` block **with `mediaTitle: true`** — smaller, no tick |

```yaml
- type: section
  number: "01"
  heading: "Identity"
  problem: "Convey the brand's values without seeming derivative."   # optional callout

- type: subsection
  number: "01a"
  heading: "Logo"
  body: "Optional lead paragraph."
```

### `row` — alternating media + text

```yaml
- type: row
  side: right            # which side the media sits on: left | right
  media: ./assets/thing.svg
  heading: "Logo concept"
  body: "Supports **markdown**."
  mediaTitle: true       # optional — use the smaller Media Title style
  # ...plus any Media options below
```

### `image` — a single framed image with heading + body

```yaml
- type: image
  heading: "Iterations"
  body: "..."
  media: ./assets/thing.webp
  # ...plus any Media options below
```

### `gallery` — a grid of media with captions

```yaml
- type: gallery
  heading: "..."
  body: "..."
  items:
    - media: ./assets/a.webp
      caption: "First"
    - media: ./assets/b.riv
      caption: "Second"
      riveProps: { stateMachines: "State Machine 1" }
```

### `brandColors` — color-decision swatch grid

```yaml
- type: brandColors
  heading: "Choosing the brand colors"
  body: "..."
  options:
    - label: "V01"
      logo: ./assets/logo-v01.svg
      swatches: ["#1F6B2E", "#F5A62A", "#F5F3E6"]
    - label: "V04"
      chosen: true       # marks it "Final"
      logo: ./assets/logo-v04.svg
      swatches: ["#1b7b01", "#f8991d", "#f9f8ef"]
```

### `brandDeck` — click-to-open slide viewer

```yaml
- type: brandDeck
  heading: "Brand guidelines"
  body: "..."
  slides:
    - ./assets/deck-slide01.webp
    - ./assets/deck-slide02.webp
```

### `typeSpec` — native type-specimen panel

A bordered box (snapshot-grey) with a role header and labelled fields, each value
rendered in its own face. `color` tints every value; each field's `size` sets that
value's size. `font` must be a CSS family that's actually loaded.

```yaml
- type: typeSpec
  color: "#1b7b01"                 # tints every value
  fonts:
    - role: "Logo / Titles"
      font: "'Fredoka', system-ui, sans-serif"
      fields:
        - label: "Typeface"
          value: "Fredoka"
          size: "2.5rem"
        - label: "Weight"
          value: "Medium"
          size: "1.5rem"
        - label: "Glyphs"
          glyphs: true             # renders an abc…0123 specimen line
          size: "1.75rem"
    - role: "Body Text"
      font: "'Inter', system-ui, sans-serif"
      fields:
        - label: "Typeface"
          value: "Inter"
          size: "2.5rem"
```

### Prose blocks — `overview` / `problem` / `process` / `impact`

Plain heading + body copy. All behave the same; the name is just for your own labelling.

```yaml
- type: process
  heading: "Impact"      # optional
  body: "..."
```

---

## Media options (rows & images)

Set any of these on a `row` or `image` block. All optional, all reversible — delete the line to undo.

| Option | Value | Effect |
|---|---|---|
| `radius` | `true` | Rounds the media corners (uses the `--radius` token). |
| `border` | `true` | Adds a hairline border around the media. |
| `background` | a CSS color, e.g. `white`, `"#f0f3f7"` | Paints the **frame div** behind the media — a mat for transparent `.riv`s. Pairs with `radius` (mat clips to rounded corners). |
| `padding` | a CSS length, e.g. `"1rem"` | Insets the media within its frame / mat. |
| `mediaWidth` | a CSS length, e.g. `"300px"`, `"60%"` | Caps the media width **at all screen sizes** and centers it. |
| `mediaTitle` | `true` | Renders the heading in the smaller Media Title style. |
| `class` | a name, e.g. `hg-logo` | Your **direct CSS escape hatch** — see below. |

### Rive props (`.riv` media)

On a `row`/`image` with a `.riv`, or in a gallery item, pass `riveProps:`:

```yaml
riveProps:
  stateMachines: "State Machine 1"
  artboard: "Desktop"      # which artboard to render
  autoplay: true           # default true
  fit: contain             # contain | cover | fill | fitWidth | fitHeight | scaleDown | none
```

The hero uses the same shape via top-matter `heroRiveProps:`.

---

## The two direct-CSS escape hatches

When a knob above doesn't cover it, drop to real CSS — no component edits.

1. **Per-block class** → `src/css/case-study-overrides.css`
   Give a block `class: my-thing`, then write plain CSS (media queries and all) targeting
   `.my-thing`. The class lands on the media frame and is **not** hashed, so what you write
   is what you get. Example already in that file: shrinking the HG logo on mobile only.

2. **Global tokens** → `src/css/tokens.css`
   Colors, spacing scale, `--radius`, fonts, container width. Change a token, it reflows
   everywhere. `--radius` drives every `radius: true`.

---

## Where things live

| File | What it controls |
|---|---|
| `src/content/case-studies/<slug>/index.md` | The content + all per-block options above |
| `src/css/tokens.css` | Global design tokens (color, space, radius, fonts) |
| `src/css/case-study-overrides.css` | Your hand-written per-block CSS |
| `src/components/CaseStudy/CaseStudy.module.css` | The component styles (heading tiers, layout) |
