---
# ─── Meta (shown in the hero + snapshot bar) ───────────────────────────
title: "Dime Payments"
slug: dime
draft: true              # unfinished — hidden from the site + routes until content is ready
order: 1
disciplines:            # rendered as the hero subtitle + card tags
  - Product Design
  - UI/UX
  - Design Systems
role: Product Designer
timeline: 2025
client: Dime Payments
tools:
  - Figma
platform: Web
summary: >             # 1–3 sentence TL;DR under the hero — carries the story for skimmers
  Ahead of a major service expansion, Dime needed its public payment pages and multi-role account shell rebuilt for three user types. I started at the foundation — a design system to keep development consistent as the product scaled — then mapped the user flows and rebuilt the pages on top of it.
card: ./assets/dime-screenshot.webp
hero: ./assets/dime-hero-img.webp
tagline: "A design system and payment flow for a scaling fintech platform"

# ─── Body blocks (rendered in order by the CaseStudy template) ─────────
# Skeleton: real copy is first-draft (edit freely); every `Asset pending`
# slot is a screen you'll remake, then I wrap in Phone/Laptop frames.
blocks:
  # ══════════════ 01 — CONTEXT ══════════════
  - type: section
    number: "01"
    heading: "Context"
    problem: >
      Dime was about to expand its services — but its interface had grown piecemeal. Two very different surfaces (a public payment page and an internal account shell) and three user roles were drifting apart visually and in code, and every new screen meant redundant design and slow handoff. The fix had to be foundational, not cosmetic.

  - type: overview
    body: >
      Rather than redesign screens one at a time, I built the system first: a documented, token-driven component library that any of Dime's surfaces could be assembled from — so the product could scale without the drift.

  # ══════════════ 02 — DESIGN SYSTEM ══════════════
  - type: section
    number: "02"
    heading: "Design System"
    problem: >
      One library had to serve three roles and two surfaces without fragmenting. That meant a naming system engineers could rely on, tokens that carried brand and intent, and components documented well enough to hand off cleanly.

  - type: subsection
    number: "02a"
    heading: "Token architecture"
    body: >
      Tokens follow a strict `system / category / property / role / variant` schema — semantic tokens like `dpds-color-background-brand-primary` sit on top of raw primitives like `dpds-typography-family-mono`. Primitives define the values; semantic tokens assign them meaning, so a single change propagates everywhere it's used.

  - type: image
    heading: "Naming & taxonomy"
    media: ./assets/ds-taxonomy.webp        # TODO — recreate the taxonomy diagram from Overview
    alt: "Diagram of the dpds- token naming schema: system / category / property / role / variant"
    radius: true
    border: true

  - type: subsection
    number: "02b"
    heading: "Color"
    body: >
      A single brand green (`#31a449`) anchors the palette, extended into a five-step ramp for depth and paired with neutral, and semantic accent ramps (orange, red, blue) for status. Every value is a token with a documented role — never a raw hex in a component.

  - type: image
    heading: "Color tokens"
    media: ./assets/ds-color.webp           # TODO — swatch/ramp visual (real values captured in _dev/figma-map.md)
    alt: "Dime color ramps: brand green, neutrals, and semantic accent colors"
    radius: true
    border: true

  - type: subsection
    number: "02c"
    heading: "Typography"
    body: >
      Roboto carries the interface — clean and legible at UI sizes — while Roboto Mono gives the system its technical, developer-facing voice for code, tokens, and the design-system chrome itself.

  - type: typeSpec
    color: "#31a449"          # Dime brand green — tints every value
    fonts:
      - role: "Display / Titles"
        font: "'Roboto', system-ui, sans-serif"
        fields:
          - label: "Typeface"
            value: "Roboto"
            size: "5rem"
          - label: "Weight"
            value: "Bold"
            size: "3rem"
          - label: "Glyphs"
            glyphs: true
            size: "3rem"
      - role: "Body / UI"
        font: "'Roboto', system-ui, sans-serif"
        fields:
          - label: "Typeface"
            value: "Roboto"
            size: "2.5rem"
          - label: "Weight"
            value: "Regular"
            size: "2rem"
      - role: "Mono / Code"
        font: "'Roboto Mono', ui-monospace, monospace"
        fields:
          - label: "Typeface"
            value: "Roboto Mono"
            size: "2.5rem"

  - type: subsection
    number: "02d"
    heading: "Components"
    body: >
      Primitives and tokens compose into documented components with full variant matrices — states, sizes, and intents — so a developer picks a variant instead of rebuilding one.

  - type: image
    heading: "Button — variant matrix"
    media: ./assets/ds-button-matrix.webp   # TODO — export Button page variant grid
    alt: "Dime Button component showing every documented variant and state"
    radius: true
    border: true

  # ══════════════ 03 — THE SHELL ══════════════
  - type: section
    number: "03"
    heading: "The Shell"
    problem: >
      The account shell served three roles — Customer, Merchant, and Admin — from one component set. The challenge was density and consistency: each role sees different data and controls, but should feel like the same product, and share the same underlying components.

  - type: subsection
    number: "03a"
    heading: "One system, three roles"
    body: >
      The same tables, navigation, and layout primitives reskin per role. Shown here across roles — the point isn't the individual screen, it's that they're all the same system.

  - type: image
    heading: "Customer — dashboard"
    media: ./assets/shell-customer-dashboard.webp   # TODO — remake, desktop
    alt: "Dime Customer dashboard in the account shell"
    radius: true
    border: true

  - type: image
    heading: "Merchant — online transactions"
    media: ./assets/shell-merchant-transactions.webp   # TODO — remake, desktop
    alt: "Dime Merchant online-transactions view in the account shell"
    radius: true
    border: true

  - type: image
    heading: "Mobile shell — recurring payments"
    media: ./assets/shell-customer-mobile.webp   # TODO — remake, mobile (→ Phone frame)
    alt: "Dime Customer recurring-payments screen on mobile"
    radius: true
    border: true

  # ══════════════ 04 — PAYMENT PROCESSING PAGE ══════════════
  - type: section
    number: "04"
    heading: "Payment Processing Page"
    problem: >
      This is the page an organization sends people to in order to donate or pay — public, conversion-critical, and used by people with no Dime account. It had to feel trustworthy on first contact and let anyone complete a payment without signing up.

  - type: subsection
    number: "04a"
    heading: "User flow"
    body: >
      I mapped the full flow before touching a screen — from landing on an amount through payment and confirmation — so the interface follows the decision path, not the other way around.

  - type: image
    heading: "User flow"
    media: ./assets/pay-user-flow.webp      # TODO — the flow chart (full-width centerpiece)
    alt: "User flow chart for the Dime payment processing page"
    radius: true
    border: true

  - type: subsection
    number: "04b"
    heading: "The flow, screen by screen"
    body: >
      Four moments carry the experience. Each screen earns its place by showing a decision, not just a state.

  - type: gallery
    items:
      - media: ./assets/pay-01-amount.webp       # TODO — remake, mobile
        caption: "1 · Enter amount — a trustworthy first impression"
      - media: ./assets/pay-02-verify.webp       # TODO — remake, mobile
        caption: "2 · Verify by phone — identity without forcing an account"
      - media: ./assets/pay-03-method.webp       # TODO — remake, mobile
        caption: "3 · Choose method — Apple Pay, Google Pay, card, or bank"
      - media: ./assets/pay-04-confirm.webp      # TODO — remake, mobile
        caption: "4 · Confirmation — clear close and receipt"

  - type: image
    heading: "Desktop"
    media: ./assets/pay-desktop.webp        # TODO — remake, desktop (responsive range)
    alt: "Dime payment processing page on desktop"
    radius: true
    border: true

  # ══════════════ 05 — IMPACT ══════════════
  - type: impact
    heading: "Impact"
    body: >
      Dime came away with a documented, token-driven design system that its expanding services could be built from — cutting redundant design work, giving developers ready-to-use components, and turning a drifting set of screens into one coherent product across three roles and two surfaces.
---

<!-- Prose here is optional; the template renders the `blocks` above.
     Skeleton status — screens still to remake (then I frame them):
       • 02: taxonomy diagram, color ramp, Button matrix
       • 03: Customer dashboard, Merchant transactions, mobile shell (Admin optional)
       • 04: user-flow chart + 4 mobile money-moments + 1 desktop
     Real token values / node IDs live in _dev/figma-map.md. -->
