---
# ─── Meta ──────────────────────────────────────────────────────────────
title: "Heartful Gardens"
slug: heartful-gardens
order: 2
disciplines:
  - Brand
  - Web Design
  - UI/UX
role: Brand & Web Design
client: Heartful Gardens
tools:
  - Figma
  - Rive
  - Illustrator
platform: Web, Print
summary: >
  Brand identity, web presence, and print materials for a small-batch garden & bakery —
  logo system, color decisions, marketing collateral, and a hand-built site
  featuring custom animated Rive graphics.
card: ./assets/hg-screenshot.webp
hero: ./assets/hg-hero-img.webp

# ─── Body blocks ───────────────────────────────────────────────────────
blocks:
  # ══════════════ SECTION 01 — IDENTITY ══════════════
  - type: section
    number: "01"
    heading: "Identity"
    problem: >
      Convey the brand's values and services without seeming derivative.

  - type: subsection
    number: "01a"
    heading: "Logo"

  # Logo concept — native remake of brand-deck slide 3 (text left, mark right).
  - type: row
    side: right
    media: ./assets/hg-logomark-fc.svg
    class: hg-logo
    heading: "Logo concept"
    body: >
      The Heartful Gardens logo merges a classic circular stamp design with
      genuine warmth. Inspired by the curves found in late-'70s Duplo and Boards
      of Canada logomarks, it's meant to project growth and friendliness. The
      central landscape does double duty as a rolling countryside and a
      fresh-baked loaf of bread.

  - type: image
    heading: "Iterations"
    body: >
      The logo was refined over the course of several rounds of discussion with the client. Distinctive points-of-interest - the bread hillside and symmetrical flower - were locked in early. Once the primary iconography was ratified, proportions were honed to arrive at the final version.
    media: ./assets/hg-logo-iterations.webp
    radius: true
    border: true

  - type: subsection
    number: "01b"
    heading: "Color"

  # Hex values below: V04 (Final) uses the real values from the brand deck.
  # V01–V03, V05–V06 are still approximate — replace with exact Figma values.
  - type: brandColors
    heading: "Choosing the brand colors"
    body: >
      The client reviewed six directions before settling on the primary
      palette. These were the color decisions — not usable variations.
    options:
      - label: "V01"
        logo: ./assets/hg-logomark-v01.svg
        swatches: ["#1F6B2E", "#F5A62A", "#F5F3E6"]
      - label: "V02"
        logo: ./assets/hg-logomark-v02.svg
        swatches: ["#2E9E3F", "#F5E11A", "#FFFFFF"]
      - label: "V03"
        logo: ./assets/hg-logomark-v03.svg
        swatches: ["#4A9E3F", "#C7B733", "#FFFFFF"]
      - label: "V04"
        chosen: true
        logo: ./assets/hg-logomark-v04.svg
        swatches: ["#1b7b01", "#f8991d", "#f9f8ef"]
      - label: "V05"
        logo: ./assets/hg-logomark-v05.svg
        swatches: ["#1F6B2E", "#7CC24B", "#F5F3E6"]
      - label: "V06"
        logo: ./assets/hg-logomark-v06.svg
        swatches: ["#1F6B2E", "#F4A9B0", "#FFFFFF"]

  - type: subsection
    number: "01c"
    heading: "Typography"
    body: >
      The display type is Fredoka Medium — a rounded geometric sans that gives the logo and titles their friendly, hand-made warmth. Body copy is set in Inter which stay crisp and legible small, on screen and in print.

  - type: typeSpec
    color: "#1b7b01"          # HG green — tints every value
    fonts:
      - role: "Logo / Titles"
        font: "'Fredoka', system-ui, sans-serif"
        fields:
          - label: "Typeface"
            value: "Fredoka"
            size: "5rem"
          - label: "Weight"
            value: "Medium"
            size: "3rem"
          - label: "Glyphs"
            glyphs: true
            size: "3rem"
      - role: "Body Text"
        font: "'Inter', system-ui, sans-serif"
        fields:
          - label: "Typeface"
            value: "Inter"
            size: "2.5rem"

  - type: brandDeck
    heading: "Brand guidelines"
    body: >
      The original brand system slide deck presented to the client outlined the look and feel of the brand and included sample mockups.
    slides:
      - ./assets/hg-deck-slide01.webp
      - ./assets/hg-deck-slide02.webp
      - ./assets/hg-deck-slide03.webp
      - ./assets/hg-deck-slide04.webp
      - ./assets/hg-deck-slide05.webp
      - ./assets/hg-deck-slide06.webp
      - ./assets/hg-deck-slide07.webp

  # ══════════════ SECTION 02 — SITE DESIGN ══════════════
  - type: section
    number: "02"
    heading: "Site Design"
    problem: >
      Give a small, local garden-and-bakery a web presence as warm and
      hand-made as the brand itself — credible to first-time visitors, easy to
      navigate on a phone at the market, and never mistaken for a template.

  - type: subsection
    number: "02a"
    heading: "Utility"
    body: >
      Before it could charm anyone, the site had to earn its keep. Visitors
      needed to find what Heartful Gardens grows and bakes, learn when and where
      to buy it, and reach the team — quickly, whether at home or standing at the
      market stall. The layout leads with those essentials and holds a clear
      hierarchy from phone to desktop, so the practical questions are answered
      before the personality ever gets a word in. (Screens coming soon.)

  - type: subsection
    number: "02b"
    heading: "Engagement"
    body: >
      Custom Rive animations I built into the live site — each designed to add
      warmth and life without slowing the page down.

  - type: row
    side: right
    media: ./assets/hg-hero-graphic.riv
    riveProps:
      stateMachines: "State Machine 1"
      artboard: "Desktop"
    heading: "Animated hero graphic"
    mediaTitle: true
    body: >
      The hero graphic started as custom line art drawn in Illustrator, then
      rebuilt in Rive so it could come alive on page load instead of sitting
      static. A state machine sequences the reveal, and vector feathering — which
      only renders on Rive's WebGL2 runtime — gives the edges their soft,
      hand-drawn warmth. Building it as live vector keeps it crisp at any size and
      ships far lighter than an exported video ever could.
    border: true
    radius: true
    background: white
    padding: 10px

  - type: row
    side: left
    media: ./assets/booth.riv
    riveProps:
      stateMachines: "State Machine 1"
    heading: "Market booth banner"
    mediaTitle: true
    body: >
      The market booth banner is a line-art asset drawn in Illustrator then imported into Rive. There, the banner paths were isolated and a custom Lua script that warped vector paths was attached, allowing it to 'wave' in the breeze. Finally, the gusts were keyframed to blow across the illustration every five to eight seconds.
    border: true
    radius: true
    background: white
    padding: 10px

  - type: row
    side: right
    media: ./assets/cta-button.riv
    riveProps:
      stateMachines: "State Machine 1"
    heading: "Interactive CTA button"
    mediaTitle: true
    body: >
      The call-to-action button responds to the visitor: a hover state lifts and
      warms it, and a click state gives a satisfying press before the page reacts.
      Both are wired as a Rive state machine, so every transition is handled inside
      the graphic itself — no extra JavaScript. A small touch like this rewards
      interaction and keeps the brand's playful voice present right at the moment
      of conversion.
    border: true
    radius: true
    background: white

  # ══════════════ SECTION 03 — PRINT MATERIALS ══════════════
  - type: section
    number: "03"
    heading: "Print Materials"
    problem: >
      The Heartful Gardens team needed to take the brand off-screen via custom, production-ready print pieces they
      could hand to a printer and use at market.

  - type: process
    body: >
      The brand system carried into print — each piece prepped production-ready
      with proper CMYK, bleed, and crop marks, and packaged as press-ready
      PDF/X-1a the client could hand straight to a printer.

  - type: row
    side: right
    media: ./assets/hg-business-card-mockup.webp
    heading: "Business cards"
    mediaTitle: true
    body: >
      A minimal design fit the brand best, and the business cards were designed around this philosophy: simply, friendly, eye-catching. The rounded corners mirrored the logo while the textured paper spoke to the rustic aspect of the business.
    border: true
    radius: true

  - type: row
    side: left
    media: ./assets/hg-flyer-mockup.webp
    heading: "Flyer"
    mediaTitle: true
    body: >
      A full-color, front and back, 5x7 flyer was designed and printed as an educational and promotional tool. Conveying the health benefits of sourdough bread was important the business owners, yet the data density needed to be paired with a scannable layout.
    border: true
    radius: true

  - type: row
    side: right
    media: ./assets/hg-table-tent-mockup.webp
    heading: "Table tents"
    mediaTitle: true
    body: >
      Table tents covering their entire product range were needed to offer  at-a-glance pricing/info for the stall, sized and
      styled to read from a few feet away.
    border: true
    radius: true

  - type: row
    side: left
    media: ./assets/hg-badge-mockup.webp
    heading: "Badge"
    mediaTitle: true
    body: >
      Certain farmer's markets required identification for staff and volunteers. A badge with logo was a simple solution to that problem.
    border: true
    radius: true

  - type: impact
    heading: "Impact"
    body: >
      Heartful Gardens walked away with a complete, cohesive brand — a logo
      system, color and type, a set of production-ready print pieces, and a warm,
      animated website, all speaking the same friendly language. What began as a
      name became a business with a face customers could recognize across the
      market stall, the counter, and the screen.
---
