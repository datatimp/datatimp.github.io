---
# ─── Meta (shown in the hero + snapshot bar) ───────────────────────────
title: "Palettary"
slug: palettary
draft: true              # unfinished — hidden from the live site, visible in dev
order: 3
disciplines:
  - Product Design
  - Design Systems
  - Front-end
  - Brand
role: Designer & Developer
client: Self-initiated
timeline: 2026–present
tools:
  - Figma
  - Illustrator
  - Rive
  - Vanilla JS
platform: Web · Figma · CLI
liveUrl: "https://www.palettary.com"
liveLabel: "Visit palettary.com"
summary: >
  Palettary is a toolset I built for the friction I kept hitting in my own Figma work.
  It started as one page of color palettes and grew into *four browser tools*, a
  *Figma component library*, and a *published CLI* — designed, built, and shipped solo,
  with no accounts and no subscriptions.
card: ./assets/palettary-screenshot.webp
hero: ./assets/palettary-hero-img.webp
tagline: "A designer's toolset, built by the designer who needed it"

# ─── Body blocks ───────────────────────────────────────────────────────
# Skeleton: copy is first-draft — rewrite freely. Every `# TODO asset` line is
# a shot still to make; the block around it is already wired correctly.
blocks:
  # ══════════════ 01 — THE PRODUCT ══════════════
  - type: section
    number: "01"
    heading: "The Product"
    problem: >
      Most of what a working designer needs day to day is small, repetitive, and
      somehow still behind a login. Palettary's rule from the first commit: every
      tool runs entirely in the browser, needs no account, costs nothing, and does
      one job completely.

  - type: subsection
    number: "01a"
    heading: "One shell, four tools"
    body: >
      Each tool is a static page sharing one nav, one stylesheet, and one layout —
      controls on the left, live preview on the right. Adding a tool means adding a
      page, not rethinking the product. The constraint is what keeps four unrelated
      utilities feeling like one thing.

  - type: gallery
    heading: "The four web tools"
    body: >
      Color Primitives, Halftone SVG, Thumbnail Generator, and QR Generator — same
      shell, same controls-and-preview rhythm, four different jobs.
    items:
      - media: ./assets/tool-palettes.webp        # TODO asset
        label: "Color Primitives"
        body: "Curated palettes, exportable straight into Figma variables."
      - media: ./assets/tool-halftone.webp        # TODO asset
        label: "Halftone SVG"
        body: "Any image to a scalable vector halftone, live-previewed."
      - media: ./assets/tool-figthumb.webp        # TODO asset
        label: "Thumbnail Generator"
        body: "Figma file covers with status, type, and platform built in."
      - media: ./assets/tool-qr.webp              # TODO asset
        label: "QR Generator"
        body: "Vector QR codes with no redirect, no expiry, no tracking."

  - type: subsection
    number: "01b"
    heading: "Identity"
    body: >
      TODO: the wordmark, the logomark, and the animated hero. Worth a line on why
      the brand is warm and a little retro rather than another neutral dev-tool blue.

  - type: image
    heading: "Animated hero"
    mediaTitle: true
    media: ./assets/palettary-hero.riv           # TODO asset — or a still export
    alt: "TODO: what the hero animation shows."
    background: "#f0f3f7"
    padding: "2rem"
    radius: true

  # ══════════════ 02 — COLOR PRIMITIVES ══════════════
  - type: section
    number: "02"
    heading: "Color Primitives"
    problem: >
      Building a full set of color primitives is a slog — a dozen hues, each with a
      full tonal ramp, all of it named consistently before a single screen gets
      designed. It is foundational work that nobody enjoys doing twice.

  - type: subsection
    number: "02a"
    heading: "Primitives, not decisions"
    body: >
      A primitive says what a color *is* — `blue-600` is `#2563EB`. A semantic token
      says what it is *for* — `color-link-default` points at `blue-600`. Palettary
      ships the first layer so you can spend your time on the second, where the
      actual design decisions live.

  - type: image
    heading: "Primitive → semantic"
    mediaTitle: true
    media: ./assets/primitive-semantic-diagram.svg   # TODO asset
    alt: "TODO: diagram showing a semantic token resolving to a raw primitive value."
    enlarge: true
    box:
      background: "#f0f3f7"
      padding: "2rem"
      radius: "16px"

  - type: subsection
    number: "02b"
    heading: "Designed for the destination"
    body: >
      The palette files are shaped for Figma's variable importer, not for whatever
      was easiest to write — hues grouped, steps named on a fixed scale, preview
      colors declared separately. One file, one import, primitives ready to alias.
      The same data exports to CSS or plain text for anyone not working in Figma.

  - type: image
    heading: "Imported as Figma variables"
    mediaTitle: true
    media: ./assets/figma-variables.webp        # TODO asset — copy from the palettary repo
    alt: "TODO: the Figma Variables panel after importing a Palettary palette."
    enlarge: true
    shadow: true

  # ══════════════ 03 — HALFTONE SVG ══════════════
  - type: section
    number: "03"
    heading: "Halftone SVG"
    problem: >
      Halftones give digital work a printed texture, but the generators that exist
      either output raster — which falls apart the moment you scale it — or output
      vector with a rotation bug that makes the angle control unusable. I wanted
      clean, scalable, correctly-rotated dots, so I wrote the algorithm.

  - type: subsection
    number: "03a"
    heading: "The bug every other tool has"
    body: >
      Rotating a dot grid inside the image bounds leaves the corners bare, so every
      angle but zero produces a clipped halftone. Palettary loops the grid in
      *rotated* coordinate space across the full image diagonal, transforms each
      point back into image space, then clips to bounds with an SVG `clipPath`. Any
      angle, complete coverage, edge to edge.

  - type: image
    heading: "Same image, same angle, two tools"
    mediaTitle: true
    media: ./assets/halftone-rotation-comparison.webp   # TODO asset — the money shot
    alt: "TODO: a competing tool's clipped 45° output beside Palettary's full-bleed output."
    enlarge: true
    box:
      background: "#f0f3f7"
      padding: "2rem"
      radius: "16px"

  - type: subsection
    number: "03b"
    heading: "Two grids, two algorithms"
    body: >
      Square grid blurs the source, samples bilinearly, and scales dot *area* rather
      than radius — linear density reads as linear ink, which is what you want for
      tonal gradients and for color. Diamond halves the row spacing and offsets every
      other row, sampling five points per cell for a chunkier, higher-contrast result
      that suits black-and-white work.

  - type: image
    heading: "Square and Diamond"
    mediaTitle: true
    media: ./assets/halftone-grid-comparison.webp      # TODO asset
    alt: "TODO: the same source image rendered on both grids at identical settings."
    enlarge: true

  - type: subsection
    number: "03c"
    heading: "Gamma as a design control"
    body: >
      Dot weight is the difference between a halftone that reads and one that turns
      to mud. The gamma slider opens the highlights or pushes the whole image heavier
      without touching the source, so an image can be tuned to its output — screen,
      riso, or press — rather than prepped in Photoshop first.

  - type: image
    heading: "Light, default, heavy"
    mediaTitle: true
    media: ./assets/halftone-gamma-3up.webp            # TODO asset
    alt: "TODO: one image at three gamma values."
    enlarge: true

  - type: subsection
    number: "03d"
    heading: "Knowing when to leave the browser"
    body: >
      Full CMYK separation — four plates, four screen angles, moiré-free — is a print
      production job, not something to bolt onto a browser tool aimed at designers who
      want one good halftone. So it became its own product: **Rosette**, a CLI with its
      own identity, published on PyPI. `pip install rosette-halftone`. The web tool
      stayed simple because the hard case moved somewhere it belonged.

  - type: image
    heading: "Four plates, one composite"
    mediaTitle: true
    media: ./assets/rosette-cmyk-plates.webp           # TODO asset
    alt: "TODO: the C, M, Y, and K plates beside the composited preview."
    enlarge: true

  # ══════════════ 04 — BEYOND THE BROWSER ══════════════
  - type: section
    number: "04"
    heading: "Meeting Designers Where They Work"
    problem: >
      The first three tools export *into* Figma. But not every problem is solved by a
      web page — so the toolset also shows up as a Figma library and as a command-line
      tool. Same kit, whichever surface the work is actually happening on.

  - type: subsection
    number: "04a"
    heading: "Thumbnail Generator"
    body: >
      Figma's file browser turns into a wall of identical grey rectangles fast.
      Thumbnails fix that, but hand-making one per file is exactly the kind of chore
      that quietly stops happening. The generator treats status, file type, and
      platform as a small system, and exports true vector SVG as well as PNG — so the
      cover stays crisp and stays editable.

  - type: image
    heading: "Status, type, and platform as a system"
    mediaTitle: true
    media: ./assets/figthumb-matrix.webp               # TODO asset
    alt: "TODO: several generated thumbnails showing status and type variations."
    enlarge: true

  - type: subsection
    number: "04b"
    heading: "QR Generator"
    body: >
      Most free QR generators route through their own domain, which means the code
      dies when the service does — and tracks every scan until it happens. Palettary
      encodes the destination directly into the code. No redirect, no expiry, no
      analytics. Custom dot, corner, and background colors, an embedded logo with
      optional auto-recolor, and a real vector export.

  - type: image
    heading: "Styles and logo embedding"
    mediaTitle: true
    media: ./assets/qr-variants.webp                   # TODO asset
    alt: "TODO: QR codes in several module styles, one with an embedded logo."
    enlarge: true

  - type: subsection
    number: "04c"
    heading: "Handoff Toolset"
    body: >
      Figma will tell a developer that a gap is 16px. It will not tell them *why*, or
      which token that 16 came from. The Handoff Toolset is a published Figma Community
      library for the annotation layer — resizable measurement bars in both
      orientations, callouts with a full set of pointer types, and a token chip that
      names the decision instead of the value.

  - type: image
    heading: "The components in use"
    mediaTitle: true
    media: ./assets/handoff-toolset03.webp
    alt: >
      Three examples from the Handoff Toolset Figma library: measurement bars
      spec'ing the padding on a filter tag, a callout giving a resize instruction,
      and a responsive spec table where every value is a token chip.
    mediaWidth: "640px"
    enlarge: true

  - type: image
    heading: "The component set behind them"
    mediaTitle: true
    media: ./assets/handoff-toolset02.webp
    alt: >
      The Handoff Toolset component library: measurement bars in two colors and both
      orientations with the label at either end, callouts in two colors across every
      pointer type, and the token chip.
    mediaWidth: "640px"
    href: "https://www.figma.com/community/file/1599213625577905854/handoff-toolset"
    linkBadge: "Open in Figma ↗"

  # The token chip is the piece worth dwelling on — it is the same idea as Dime's
  # token architecture, one layer up: Dime needed breakpoints spec'd as tokens, so
  # here I built the chip that draws that table. Consider making that link explicit
  # in 04c's body.

  # ══════════════ 05 — IMPACT ══════════════
  - type: impact
    heading: "Impact"
    body: >
      Palettary runs at its own domain with four tools, nineteen curated palettes, and
      no accounts, subscriptions, or tracking. It has been published to Product Hunt,
      its Figma library to Figma Community, and its CMYK engine to PyPI as
      `rosette-halftone` — three channels, three audiences, one person designing,
      building, and shipping all of it. It is MIT licensed and open to palette
      submissions. TODO: swap in real usage numbers if you want them cited.
---

<!-- Prose here is optional; the template renders the `blocks` above.

     Shot list — what is still to make:
       01a  Four tool screens for the gallery (tool-palettes / -halftone / -figthumb / -qr)
       01b  Hero .riv or a still export
       02a  Primitive → semantic diagram (SVG; the Palettary README has an ASCII version to adapt)
       02b  figma-variables.webp — already exists in the palettary repo, just copy it over
       03a  Rotation comparison — competitor clipped vs Palettary full-bleed. Best image in the study.
       03b  Square vs Diamond at identical settings
       03c  Gamma 3-up
       03d  Rosette CMYK plates + composite
       04a  Thumbnail variations
       04b  QR styles + logo embed
       04c  DONE — handoff-toolset02/03.webp

     Notes:
       • 04c's two images are capped at 640px so the section does not outweigh 03.
       • -03 uses `enlarge` because the spec table's token names need to be readable.
       • -02 uses `href` instead — `href` wins over `enlarge` in ImageBlock, so it is
         one or the other. Swap if you would rather zoom it than link out.
       • Neither 04c image takes radius/border/shadow/box — the frame and shadow are
         already baked into the export.
       • handoff-toolset01.webp (the Community cover art) is unused. It is advertising
         rather than evidence, but it is there if you want a branded lead-in for 04c.
-->
