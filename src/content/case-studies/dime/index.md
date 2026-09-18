---
# ─── Meta (shown in the hero + snapshot bar) ───────────────────────────
title: "Dime Payments"
slug: dime
draft: false             # LIVE
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
liveUrl: "https://www.figma.com/design/QaE6JEJ1vNFc1Y8XOrcogl/Dime-Payment-Design-System?node-id=12-67"
liveLabel: "View the design system in Figma"   # friendly label for the snapshot callout (falls back to the URL)
summary: >             # 1–3 sentence TL;DR under the hero — carries the story for skimmers
  Ahead of a major service expansion, Dime needed its public payment pages and multi-role account shell rebuilt for three user types. I *completed a design system* to keep development consistent, *mapped user flows* and *rebuilt the payment pages and account shell*.
card: ./assets/dime-screenshot.webp
hero: ./assets/dime-hero-img.webp
tagline: "A design system and payment flow for a scaling fintech platform"

# ─── Body blocks (rendered in order by the CaseStudy template) ─────────
blocks:
  # ══════════════ 01 — DESIGN SYSTEM ══════════════
  - type: section
    number: "01"
    heading: "Design System"
    problem: >
      Dime's interface spans two surfaces, Payment Processing Page and Account Shell. The solution was to construct a solid foundation on which to build. This meant creating a consistent naming system, implementing semantic tokens, and deploying well-documented components.

  - type: subsection
    number: "01a"
    heading: "Token architecture"
    body: >
      Tokens follow a strict `system / category / property / role / variant` schema. Semantic tokens like `dpds-color-background-brand-primary` resolve on top of raw primitives like `dpds-typography-family-mono`. Primitives hold the values; semantic tokens assign them meaning.

  - type: image
    heading: "Naming & taxonomy"
    mediaTitle: true
    media: ./assets/dime-ds-token-naming.svg
    alt: "The dpds- token naming schema on two examples (a semantic/component token and a primitive token), labeled system, category, property, role, and variant."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: image
    heading: "Single Source of Truth"
    mediaTitle: true
    media: ./assets/figma-variables.webp
    alt: "The Figma Variables panel for the Dime system. Collections are split into Color and Color Primitives."
    enlarge: true
    shadow: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      The Figma Variables panel for the Dime system. Every semantic token resolves to another token, never a hex. `Text / Brand / Primary` points at `Brand/200`. A primitive can be rethemed and every component would inherit the change.

  - type: subsection
    number: "01b"
    heading: "Governing the system"
    body: >
     If any component can grab a raw value, the semantic layer becomes useless and design debt will accrue. To prevent this, primitives are deliberately not exposed to components. The same discipline is used in all elements. Elevation tokens, for example, are composed from depth and alpha tokens, so shadows stay consistent and adjust as a set.

  - type: image
    heading: "Elevation tokens"
    mediaTitle: true
    media: ./assets/dime-ds-elevation.webp
    alt: "Elevation tokens ranging in height from Elevation 02 to Elevation 04"
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: subsection
    number: "01c"
    heading: "Type as tokens"
    body: >
      Type is tokenized as well. Each family is assigned to roles, and every size resolves through a shared numeric scale.

  - type: image
    heading: "Family roles"
    mediaTitle: true
    media: ./assets/dime-ds-type-usage.svg
    alt: "Usage matrix: Nunito for headings, body, and labels; Montserrat for titles; Roboto Mono for code."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: image
    heading: "Size & weight tokens"
    mediaTitle: true
    media: ./assets/dime-ds-type-body-tokens.svg
    alt: "Body type tokens: sizes 18/16/14/12px mapped to shared scale tokens and weight tokens."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: subsection
    number: "01d"
    heading: "Components"
    body: >
      Components are built from semantic tokens. Each is specified in two ways: a full set of variants a developer picks from, and exact measurements for clean handoff.

  - type: image
    heading: "Button variants"
    mediaTitle: true
    media: ./assets/dime-ds-button-matrices.webp
    alt: "The Dime Button across its three intents (Primary, Secondary, Destructive), each shown in Default, Hover, Disabled and Focus states at both sizes, with and without icons. Hover treatments follow the client's existing brand behavior."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: image
    heading: "Specced for handoff"
    mediaTitle: true
    media: ./assets/dime-ds-button-payment-metrics.svg
    alt: "Payment method buttons (Google Pay, Apple Pay, Bank, Card) annotated with build specs: 12px padding, a fixed 80 by 40 size, and 16px spacing in the group."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  # Link-out: the DS cover art, clickable → opens the live Figma file (view-only).
  - type: image
    heading: "Explore the live file"
    mediaTitle: true
    media: ./assets/dime-ds-cover.webp
    href: "https://www.figma.com/design/QaE6JEJ1vNFc1Y8XOrcogl/Dime-Payment-Design-System?node-id=12-67"
    linkBadge: "Open in Figma ↗"
    alt: "Cover of the Dime Payment Design System. Opens the live Figma file in a new tab."
    radius: "20px"
    border: "1.5px solid #e6e2d6"
    body: >
      The Dime Design System is fully viewable. Open the Figma link to explore it firsthand.

  # ══════════════ 02 — THE SHELL ══════════════
  - type: section
    number: "02"
    heading: "Account Shell"
    problem: >
      The account shell served three roles (Customer, Merchant, and Admin) from one component set. The challenge was data density and consistency. Though each role sees different data, the product should feel seamless between them.

  - type: image
    heading: "Breakpoints as tokens"
    mediaTitle: true
    media: ./assets/shell-grid-tokens.webp
    alt: "Layout token table across five breakpoints: device name, device width, padding X and Y, and root font size, with the pixel range each breakpoint covers."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      Each breakpoint is a mode and follows the Tailwind breakpoint standards. Padding resolves through the system-wide `Space` tokens. Root font size holds at `Scale 04` at every breakpoint including mobile, which keeps body copy readable.

  - type: image
    heading: "The shell layout, unpopulated"
    mediaTitle: true
    media: ./assets/shell-grid-layout.webp
    alt: "Shell layout frames across five breakpoints. Desktop S and Desktop L are expanded to show navigation changing from a collapsible overlay to a persistent sidebar, with padding measurements on each."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
     Navigation is a persistent sidebar from 1280 up and collapses to an overlay drawer below it. The content column scrolls while the sidebar stays fixed.

  - type: subsection
    number: "02a"
    heading: "One system, three roles"
    body: >
      The same tables, navigation, and layout primitives reskin per role. Customer and Merchant are shown here. *Admin* is an internal Dime staff role sitting above Merchant with elevated permissions on a near-identical interface.

  - type: laptop
    heading: "Customer: dashboard"
    media: ./assets/customer-dashboard-desktop.webp
    alt: "Dime Customer dashboard in the account shell"
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: laptop
    heading: "Merchant: online transactions"
    media: ./assets/merchant-online-transactions.webp
    alt: "Dime Merchant online-transactions view: a filterable, sortable transaction table with bulk selection, refund and export actions, and pagination."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: phone
    heading: "Customer: Recurring payments (mobile)"
    media: ./assets/customer-recurring-payments-mobile.avif
    alt: "Screen recording of the Dime Customer recurring-payments screen on mobile: a stacked list of recurring-payment cards showing organization, amount, Active or Paused status, method and dates. The list scrolls, and a card flips to reveal its actions."
    statusHeight: "0%"      # the export already carries its own status-bar strip
    maxWidth: "360px"       # bigger than the 300px default — the box is full width
    screenBg: "#ffffff"     # matches that strip behind the Dynamic Island
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  # ══════════════ 03 — PAYMENT PROCESSING PAGE ══════════════
  - type: section
    number: "03"
    heading: "Payment Processing Page"
    problem: >
      The Payment Processing Page is a white-labeled page an organization sends to their customers in order to donate or pay. The page is conversion-critical and used by people with no Dime account. It had to feel trustworthy and let anyone complete a payment with as little friction as possible.

  - type: subsection
    number: "03a"
    heading: "User flow"
    body: >
      I mapped the full flow from landing on an amount through payment and confirmation. The interface was designed on this decision path.

  - type: image
    heading: "Login to payment"
    mediaTitle: true
    media: ./assets/ppp-flow.svg
    alt: "User flow chart for the Dime payment processing page: log in via phone or email, verify with a one-time code, then new users add a payment method (wallet checks out immediately; card or bank is entered and saved) while returning users choose a saved method and pay"
    enlarge: true                           # click → full-screen pan/zoom viewer (readable on mobile)
    box:
      background: "#f0f3f7"     # standard box grey
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"

  - type: subsection
    number: "03b"
    heading: "The flow, screen by screen"
    body: >
      The payment process runs on three screens. Secondary tasks, like changing a payment method or shipping address, open in modals. I worked to keep screen transitions to a minimum, thereby reducing user confusion or frustration.

  - type: gallery
    phone: true             # frame every item in the iPhone mockup
    statusHeight: "0%"      # these exports run edge-to-edge, no status strip
    items:
      - media: ./assets/ppp-mobile-flow01.webp
        label: "Screen 1"
        body: "A user can enter an amount manually or choose from a preset amount (determined by merchant). Login is passwordless and handled by an OTP delivered via text or email."
      - media: ./assets/ppp-mobile-flow02.webp
        label: "Screen 2"
        body: "The user can review everything in one screen prior to submitting a payment, and can still change payment methods, amounts, or shipping addresses."
      - media: ./assets/ppp-mobile-flow03.webp
        label: "Screen 3"
        body: "Confirmation is shown as an overlay on the same screen. The company's logo remains visible at the top, visually reinforcing which transaction went through."

  # No desktop payment-page mockup by design: the client never asked for one —
  # mobile was the priority and desktop was to be served by the same responsive
  # view. Optional future addition.

  # ══════════════ 04 — IMPACT ══════════════
  - type: impact
    heading: "Impact"
    body: |
      Dime came away with a documented, token-driven design system covering color, type, and components across three roles and two surfaces.

      > "The design system he created became the basis for how we build product UI today."
      >
      > — Ben Habeck, CEO, Dime Payments
---
