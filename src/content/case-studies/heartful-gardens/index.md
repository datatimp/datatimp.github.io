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
liveUrl: "https://heartfulgardens.com"   # the live site — shown as the mono callout under the snapshot
summary: >
  Heartful Gardens, a small-batch garden & bakery needed brand identity, web presence, and print materials. Deliverables included a  logo system, color decisions, marketing collateral, and a hand-built site featuring custom animated Rive graphics.
card: ./assets/hg-screenshot.webp
hero: ./assets/hg-hero-img.webp
tagline: "Brand & site for a small-batch garden bakery"   # short logline on the home card (not the summary)

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
    heading: "Concept"
    zoom:
      - ./assets/duplo-logo-1977.svg
      - ./assets/boc-logo.svg
    zoomBg: "#ffffff"
    body: >
      The final Heartful Gardens logo merges a classic circular stamp design with genuine warmth. Inspired by the curves found in late-'70s [Duplo](#zoom:0) and [Boards of Canada](#zoom:1) logomarks, it's meant to project growth and friendliness. The
      central landscape does double duty as a rolling countryside and a fresh-baked loaf of bread.

  - type: image
    heading: "Iterations"
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
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
    heading: "Brand colors"
    body: >
      Two key notes were given for color choices: friendliness and recognizability. Essentially, on a bright market day, the logo needed to stand out amongst the other booths. The client reviewed six directions (shown below) before settling on the primary palette of warm green and vibrant orange. 
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
      Give a small, local business a web presence as warm and hand-made as the brand itself. Of primary concern was ease of navigation, especially on mobile, It needs to be credible to first-time visitors, easy to navigate on a phone at the market, and never mistaken for a template.

  - type: subsection
    number: "02a"
    heading: "Utility"
    body: >
      The mission: ensure visitors can quickly find what Heartful Gardens grows and bakes, learn when and where to buy it, and provide contact info.

  - type: laptop
    side: left
    media: ./assets/vid-offer-720.mp4
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    heading: "Products front & center"
    alt: "Screen recording of the Heartful Gardens 'What We Offer' product section on desktop"
    body: >
      The moment a visitor scrolls past the hero, the product lineup takes over. Showcasing the products first, including a nutritional chart, ensures the user doesn't feel their time is wasted hunting for the companies goods and services.

  - type: phone
    side: right
    media: ./assets/find-us-ios.avif
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    screenBg: "#faf9f0"    # fills the strip behind the Dynamic Island (was #e0edd3)
    statusHeight: "9%"     # push the sticky nav down clear of the island
    alt: "Heartful Gardens 'Find Us' button opening the location in Apple Maps on iPhone"
    heading: "Find Us"
    body: >
      The business earns its keep at the market stall so the "Find Us" section allows the client to announce the days and locations of markets. Google Maps is embedded into the accordion dropdowns. As Apple Maps charges for embed, a solution was needed to ensure ease-of-use on iOS devices. The solution was to provide a link that opened in the native iOS maps app.

  - type: subsection
    number: "02b"
    heading: "Engagement"
    body: >
      Custom Rive animations I built into the live site — each designed to add warmth and life without slowing the page down.

  - type: row
    side: right
    media: ./assets/hg-hero-graphic.riv
    riveProps:
      stateMachines: "State Machine 1"
      artboard: "Desktop"
    heading: "Animated hero graphic"
    mediaTitle: true
    hint: right
    enlarge: true
    body: >
      The hero graphic is custom line art drawn in Illustrator, imported into Rive, and animated to come alive on page load. Building it as live vector keeps it crisp at any size and ships lighter than an exported video. Two artboards are present, allowing a state machine to select the proper aspect ratio depending on the user's device. 
    border: true
    radius: true
    background: "#e6ddc6"
    padding: 10px

  - type: row
    side: left
    media: ./assets/booth.riv
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    riveProps:
      stateMachines: "State Machine 1"
    heading: "Market booth banner"
    mediaTitle: true
    enlarge: true
    body: >
      Existing as a subtle animation asset near the close of the page, the booth banner is custom art animated in Rive using keyframes and scripting. Every eight seconds, keyframed wind blows across the image while the banner itself waves in the breeze via a Lua script running in the Rive state machine.
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
    hint: left
    body: >
      I wanted the call-to-action button to reward interaction. The button was drawn and animated in Rive. A hover state on desktop lifts and warms it, and a click state gives a satisfying press before the page reacts. The Rive file allows all logic to be handled by the graphic itself with no extra Javascript.
    border: true
    radius: true
    background: white

  # ══════════════ SECTION 03 — PRINT MATERIALS ══════════════
  - type: section
    number: "03"
    heading: "Print Materials"
    problem: >
      The Heartful Gardens team needed to take the brand off-screen with print-ready CMYK, PDF/X-1a assets that could be handed directly to a printer.

  - type: row
    side: right
    media: ./assets/hg-business-card-mockup.webp
    heading: "Business cards"
    mediaTitle: true
    body: >
      A minimal design fit the brand best, and the business cards were created around this philosophy to be simple, friendly,and eye-catching. The rounded corners mirrored the logo while the textured paper spoke to the rustic aspect of the business.
    border: true
    radius: true
  - type: row
    side: left
    media: ./assets/hg-flyer-mockup.webp
    
    heading: "Flyer"
    mediaTitle: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    zoom:
      - ./assets/whysourdough-1.webp
      - ./assets/whysourdough-2.webp
    body: >
      A full-color, front and back, 5x7 flyer was designed and printed as an educational and promotional tool. Conveying the health benefits of sourdough bread was important the business owners, yet the data density needed to be paired with a scannable layout. [See the flyer up close](#zoom).
    border: true
    radius: true

  - type: row
    side: right
    media: ./assets/hg-table-tent-mockup.webp
    heading: "Table tents"
    mediaTitle: true
    body: >
      Table tents covering their entire product range were needed to offer  at-a-glance pricing/info for the stall, sized and styled to read from a few feet away.
    border: true
    radius: true

  - type: row
    side: left
    media: ./assets/hg-badge-mockup.webp
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    heading: "Badge"
    mediaTitle: true
    body: >
      Certain farmer's markets required identification for staff and volunteers. A badge with logo was a simple solution to that problem.
    border: true
    radius: true

  - type: row
    side: right
    media: ./assets/hg-banner-mockup.webp
    heading: "Banner"
    mediaTitle: true
    body: >
      A large-format banner anchored the market stall — the logo and brand colors scaled up to read from across the lot, prepped as a production-ready file the client could hand straight to a wide-format printer.
    border: true
    radius: true

  - type: impact
    heading: "Impact"
    body: >
      Heartful Gardens walked away with a complete, cohesive brand — a logo system, color and type, a set of production-ready print pieces, and a warm, animated website, all speaking the same friendly language. What began as an idea became a business with a brand customers could recognize across the market stall, the counter, and the screen.
---
