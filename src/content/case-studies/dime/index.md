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
liveUrl: "https://www.figma.com/design/QaE6JEJ1vNFc1Y8XOrcogl/Dime-Payment-Design-System?node-id=12-67"
liveLabel: "View the design system in Figma"   # friendly label for the snapshot callout (falls back to the URL)
summary: >             # 1–3 sentence TL;DR under the hero — carries the story for skimmers
  Ahead of a major service expansion, Dime needed its public payment pages and multi-role account shell rebuilt for three user types. Starting at the foundation, I *completed a design system* to keep development consistent at scale, *mapped user flows* and *rebuilt the payment pages and account shell*.
card: ./assets/dime-screenshot.webp
hero: ./assets/dime-hero-img.webp
tagline: "A design system and payment flow for a scaling fintech platform"

# ─── Body blocks (rendered in order by the CaseStudy template) ─────────
# Skeleton: real copy is first-draft (edit freely); every `Asset pending`
# slot is a screen you'll remake, then I wrap in Phone/Laptop frames.
blocks:
  # ══════════════ 01 — DESIGN SYSTEM ══════════════
  - type: section
    number: "01"
    heading: "Design System"
    problem: >
      Dime's interface involved two different surfaces, Payment Processing Page and Account Shell. The fix had to be foundational: a consistent naming system, tokens that carried meaning and intent, and components documented well enough to hand off cleanly.

  - type: subsection
    number: "01a"
    heading: "Token architecture"
    body: >
      Tokens follow a strict `system / category / property / role / variant` schema. Semantic tokens like `dpds-color-background-brand-primary` resolve on top of raw primitives like `dpds-typography-family-mono`. Primitives hold the values; semantic tokens assign them meaning, so one change propagates everywhere it's used.

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
    heading: "Two layers, one source of truth"
    mediaTitle: true
    media: ./assets/figma-variables.webp
    alt: "The Figma Variables panel for the Dime system. Collections are split into Color and Color Primitives, and every semantic token's value is an alias to a primitive rather than a raw hex."
    enlarge: true
    shadow: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      The values live in Figma Variables, not on a canvas page, which is how a developer actually extracts them. Note the value column: every semantic token resolves to *another token*, never a hex. `Text / Brand / Primary` points at `Brand/200`. That indirection is the whole point. Retheme the primitive and every component downstream follows.

  - type: subsection
    number: "01b"
    heading: "Governing the system"
    body: >
      **Primitives are deliberately not exposed to components.** A component can only reach the semantic layer, so a developer picks `border-focus-primary`, never `green-600`. That constraint is what keeps a design system a system: if any component can grab any raw value, the semantic layer becomes decoration and the first redesign breaks everything. It also means intent survives. `positive` and `brand` happen to share a green today, but they're separate tokens, so rebranding away from green won't quietly turn *success* into the new brand color.

      The same discipline runs past color. Elevation isn't a pasted shadow, it's composed from depth and alpha tokens, so shadows stay consistent and adjust as a set. Icon stroke weight is tokenized alongside icon size, so a 12px icon and a 24px icon keep the same optical weight. Roughly 290 variables across eight collections, built to be consumed rather than admired.

  - type: subsection
    number: "01c"
    heading: "Type as tokens"
    body: >
      Type is tokenized the same way: each family is assigned to roles, and every size resolves through a shared numeric scale rather than one-off pixel values, so "Body / Medium" is a token, not a guess.

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
      Primitives and tokens compose into documented components, specified two ways: a full set of variants a developer picks from, and exact measurements for clean handoff.

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
      The Dime Design System is fully viewable. Open the Figma link to explore the system firsthand.

  # ══════════════ 02 — THE SHELL ══════════════
  - type: section
    number: "02"
    heading: "Account Shell"
    problem: >
      The account shell served three roles (Customer, Merchant, and Admin) from one component set and the challenge was data density and consistency. Though each role sees different data, the product should feel seamless between them.

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
      Each breakpoint is a *mode*, not a set of hand-tuned values. Padding resolves through the same `Space` scale everything else uses, so a component re-pads itself when the frame changes size instead of being adjusted five times. Root font size holds at `Scale 04` at every breakpoint including mobile, which keeps body copy readable and stops iOS zooming the page on input focus.

  - type: image
    heading: "The shell, before anything fills it"
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
      Those tokens drive one skeleton across all five sizes. Navigation is a persistent sidebar from 1280 up and collapses to an overlay drawer below it, which is the only structural decision the shell makes. The content column scrolls while the sidebar stays fixed, and the header's system controls shift from center to right-aligned when the merchant select isn't present.

  - type: subsection
    number: "02a"
    heading: "One system, three roles"
    body: >
      The same tables, navigation, and layout primitives reskin per role. What changes is the data and the privileges, not the parts. Customer and Merchant are shown here. *Admin* is an internal Dime staff role sitting above Merchant: elevated permissions on a near-identical interface, so it shipped without needing a design of its own. That's the clearest result the system produced. A third role cost nothing to serve.

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
      This is the page an organization sends people to in order to donate or pay. It is public, conversion-critical, and used by people with no Dime account. It had to feel trustworthy on first contact and let anyone complete a payment without signing up.

  - type: subsection
    number: "03a"
    heading: "User flow"
    body: >
      I mapped the full flow before touching a screen, from landing on an amount through payment and confirmation, so the interface follows the decision path, not the other way around.

  - type: image
    heading: "User flow"
    media: ./assets/ppp-flow.svg            # DONE — vertical flow chart, SVG (crisp at any zoom)
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
      Four moments carry the experience. Each screen earns its place by showing a decision, not just a state.

  - type: gallery
    items:
      - media: ./assets/pay-01-amount.webp       # TODO — remake, mobile
        caption: "1 · Enter amount: a trustworthy first impression"
      - media: ./assets/pay-02-verify.webp       # TODO — remake, mobile
        caption: "2 · Verify by phone: identity without forcing an account"
      - media: ./assets/pay-03-method.webp       # TODO — remake, mobile
        caption: "3 · Choose method: Apple Pay, Google Pay, card, or bank"
      - media: ./assets/pay-04-confirm.webp      # TODO — remake, mobile
        caption: "4 · Confirmation: clear close and receipt"

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
      Dime came away with a documented, token-driven design system its expanding services could be built from. It cut redundant design work, gave developers ready-to-use components, and turned a drifting set of screens into one coherent product across three roles and two surfaces.
---

<!-- Prose here is optional; the template renders the `blocks` above.
     Skeleton status — screens still to remake (then I frame them):
       • 01 Design System: Button variant matrix (taxonomy + type tables done, SVG)
       • 02 Shell: Customer dashboard, Merchant transactions, mobile shell (Admin optional)
       • 03 Payment: user-flow chart (done) + 4 mobile money-moments + 1 desktop
     Real token values / node IDs live in _dev/figma-map.md. -->
