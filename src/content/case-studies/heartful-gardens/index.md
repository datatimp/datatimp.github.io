---
# ─── Meta ──────────────────────────────────────────────────────────────
title: "Heartful Gardens"
slug: heartful-gardens
order: 2
disciplines:
  - Brand
  - Web Design
  - UI/UX
  - Product Design
role: Brand & Web Design
client: Heartful Gardens
tools:
  - Figma
  - Rive
  - Illustrator
platform: Web, Print
liveUrl: "https://heartfulgardens.com"   # the live site — shown as the mono callout under the snapshot
summary: >
  Heartful Gardens, a small-batch bakery & garden needed brand identity, web presence, and print materials. As the business grew, it also needed a way to take orders online. Deliverables included a *logo system*, *print-ready marketing collateral*, a *hand-built site* featuring *custom animated Rive graphics*, and an *online ordering system* with an admin page for the owner.
card: ./assets/hg-screenshot.webp
hero: ./assets/hg-hero-img.webp
tagline: "A brand, website and ordering system for a small-batch garden bakery"   # short logline on the home card (not the summary)

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
      The final Heartful Gardens logo merges a classic circular stamp design with genuine warmth. Inspired by the curves found in late-'70s [Duplo](#zoom:0) and mid-2000s [Boards of Canada](#zoom:1) logomarks, while utilizing more organic shapes, it's meant to project growth and friendliness. The central landscape does double duty as a rolling countryside and a fresh-baked loaf of bread.

  - type: image
    heading: "Iterations"
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      The logo was refined over the course of several rounds of discussion with the client. Distinctive points-of-interest, namely the bread hillside and symmetrical flower, were locked in early. Once the primary iconography was ratified, proportions were honed to arrive at the final version.
    media: ./assets/hg-logo-iterations.webp
    radius: true
    border: true

  - type: subsection
    number: "01b"
    heading: "Color"

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
      The display type is Fredoka Medium — a rounded geometric sans that gives the logo and titles their friendly, hand-made warmth. Body copy is set in Inter which stays crisp and legible even at small point sizes.

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
      Give a small, local business a web presence as warm and hand-made as the brand itself. Of primary concern was ease of navigation, especially on mobile, highlight the product and direct customers to a market.

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
    media: ./assets/vid-findus-ios.mp4
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    screenBg: "#f9f7ef"    # the clip's nav cream after video encoding
    statusHeight: "6.8%"   # recorded at 393x793 (below the status bar); lands its bottom on the screen edge
    alt: "Heartful Gardens 'Find Us' market card on iPhone, with Copy address and Open in Apple Maps links above an embedded map"
    heading: "Find Us"
    body: >
      The business earns its keep at the market stall so the "Find Us" section allows the client to quickly find the days and locations of markets. Google Maps is embedded into the accordion dropdowns. As Apple Maps charges for embed, a solution was needed to ensure ease-of-use on iOS devices. The solution was to provide a link that opened in the native iOS maps app.

  - type: subsection
    number: "02b"
    heading: "Engagement"
    body: >
      Custom Rive animations were built into the live site — each designed to add warmth and life without slowing the page down.

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
      The hero graphic is custom line art drawn in Illustrator, imported into Rive, and animated to come alive on page load. Two artboards are present, allowing a state machine to select the proper aspect ratio depending on the user's device. 
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

  # ══════════════ SECTION 03 — ORDERING & OPERATIONS ══════════════
  # Media below are placeholders ("Asset pending") until the files land in ./assets/.
  # Screenshots: use test orders only, and crop or blur Patricia's cell number.
  - type: section
    number: "03"
    heading: "Ordering & Operations"
    problem: >
      Heartful Gardens took orders by email and kept its baking schedule and inventory by hand. The team needed one place to manage all of it, set up around the way they already worked. Customers needed an easy way to order ahead and see what they owed.

  - type: subsection
    number: "03a"
    heading: "Customer flow"
    body: >
      Most customers order about once a week. I wanted ordering ahead to feel as easy as buying at the market stall, with no account to create and no password to remember.

  - type: image
    heading: "From browsing to pickup"
    mediaTitle: true
    media: ./assets/hg-customer-flow.svg
    alt: "User flow chart in two lanes, Customer and Heartful Gardens. The customer browses the product list, opens the order form, picks items and a date, and sends the order. Heartful Gardens gets the order email, reviews it, and replies with an order link. The customer opens the order page and sends payment. Heartful Gardens marks it paid, picks a baking day and bakes. They agree on a time and place by email, and the customer picks up."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      I mapped the customer's path from the product list to pickup. Payment happens outside the site, so the flow had to pass smoothly from the customer to the business and back again.

  - type: gallery
    heading: "Placing an order"
    phone: true
    statusHeight: "0%"
    items:
      - media: ./assets/vid-orderform-01.mp4
        statusHeight: "6.8%"   # recorded at 393x793 (below the status bar); this lands its bottom on the screen edge
        screenBg: "#f9f7ef"   # the clip's nav cream after video encoding
        label: "Opening the form"
        body: "The order form opens over the page, so visitors who came to browse aren't met with a long form. It can be reached from the menu, the product list, or a link shared on Instagram."
      - media: ./assets/vid-orderform-02.mp4
        statusHeight: "6.8%"
        screenBg: "#70716c"   # the nav dimmed behind the open form
        label: "Picking items"
        body: "A stepper sets each quantity and the total updates as you go. Items that come in more than one size list each bag size with its own price."
      - media: ./assets/vid-orderform-03.mp4
        statusHeight: "6.8%"
        screenBg: "#70716c"   # the nav dimmed behind the open form
        label: "Choosing a date"
        body: "The bakery can change its lead time in the admin panel, with the default set to three days. The date picker starts that many days out, so customers can’t ask for a date the team can’t meet."

  - type: gallery
    heading: "Customer order page"
    body: >
      The reply email from Heartful Gardens includes a link to a page for that order. The customer can come back to it to check on their order or find the payment details.
    phone: true
    scroll: true
    statusHeight: "6.8%"
    screenBg: "#fff"
    items:
      - media: ./assets/hg-customer-order01-mobile.webp
        alt: "Order page for HG-0006 before payment: New and Awaiting payment labels, the payment card with a QR code, and the receipt below."
        label: "Awaiting payment"
        body: "The business wanted a way to get paid with no processing fees. My job was to make a manual payment feel as trustworthy as any automated checkout. The card shows the amount due, a QR code, and a copy button for anyone paying from their phone."
      - media: ./assets/hg-customer-order02-mobile.webp
        alt: "The same order page after payment: the payment card dimmed with a PAID stamp, and the receipt below."
        label: "Paid"
        body: "Two labels at the top show where the order stands and whether it has been paid. Once the team marks the order paid, the card dims and a PAID stamp appears. The receipt below can be saved as an image or a PDF, and a black and white version prints on one page."

  - type: subsection
    number: "03b"
    heading: "Owner workflow"
    body: >
      The team tracked orders with Gmail labels. Each order was retyped into a reply email, and the baking schedule was kept by hand. I designed an admin page to take that work off their plate.

  - type: image
    heading: "From order to completion"
    mediaTitle: true
    media: ./assets/hg-owner-flow.svg
    alt: "Workflow chart for the Heartful Gardens team: a new order arrives, they review it and reply with the order link, mark it paid, pick a baking day, bake, and mark it completed after pickup. An order can go on hold for a question to the customer, then return to the flow or be canceled."
    enlarge: true
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      I mapped the steps an order goes through on the business side. Each step became a single action in the admin page.

  - type: image
    heading: "Orders list"
    mediaTitle: true
    media: ./assets/hg-admin-orders-01.webp
    alt: "Heartful Gardens admin orders list with search, status filters, and a row for each order."
    enlarge: true
    border: "1px solid rgba(0, 0, 0, 0.2)"
    shadow: "0 2px 8px rgba(0, 0, 0, 0.12)"
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      The list opens on all orders, with new ones at the top. One search box finds an order by its number, a customer's name, or an email address.

  - type: image
    heading: "Status and payment"
    mediaTitle: true
    media: ./assets/hg-admin-orders-detail.webp
    alt: "An order drawer in the Heartful Gardens admin, with its status menu and Paid checkbox magnified."
    enlarge: true
    border: "1px solid rgba(0, 0, 0, 0.2)"
    shadow: "0 2px 8px rgba(0, 0, 0, 0.12)"
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      Status moves from New to In Process to Completed with one tap. I kept Paid as its own checkbox because an order can be finished and still be unpaid.

  - type: image
    heading: "Baking Schedule"
    mediaTitle: true
    media: ./assets/hg-admin-baking.webp
    alt: "Heartful Gardens baking calendar showing orders on each day, with the selected day's orders and bake totals beside it."
    enlarge: true
    border: "1px solid rgba(0, 0, 0, 0.2)"
    shadow: "0 2px 8px rgba(0, 0, 0, 0.12)"
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    body: >
      Moving an order to In Process asks for a baking day. Each day on the calendar lists its orders and how many of each product to bake. That replaced the handwritten bake list.

  - type: gallery
    heading: "Inventory"
    body: >
      The team found Square's inventory tools hard to use, so I designed an inventory page tied to the online orders. Open orders set aside their items, so the team can see what to bake at a glance.
    enlarge: true
    border: "1px solid rgba(0, 0, 0, 0.2)"
    shadow: "0 2px 8px rgba(0, 0, 0, 0.12)"
    items:
      - media: ./assets/hg-admin-inventory-01.webp
        label: "Dashboard"
        alt: "Heartful Gardens inventory dashboard: summary tiles, filter chips, and a card for each product category with available stock and a status label for each product."
        body: "Tiles at the top flag what needs attention, like sold-out items or stock running low. Color-coded labels on each product make the whole list quick to scan."
      - media: ./assets/hg-admin-inventory-02.webp
        label: "Product panel"
        alt: "A product panel open on the inventory page, showing On hand, Reserved and Available counts, a form to change stock, settings, and a history of changes."
        body: "Clicking a product opens its stock, settings and history. On hand, Reserved and Available sit side by side."
      - media: ./assets/hg-admin-inventory-03.webp
        label: "Add batch"
        alt: "The Add batch form, listing every product with a quantity stepper, grouped by category."
        body: "After a bake, the team logs everything in one form. It uses the same steppers as the customer order form."

  - type: phone
    side: right
    media: ./assets/vid-admin-orders-mobile.mp4
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    screenBg: "#f9f7ef"    # the admin header's cream, behind the Dynamic Island
    statusHeight: "6.8%"   # clip (686×1386) is shorter than the screen; this pins its bottom to the screen's bottom
    alt: "Screen recording of the Heartful Gardens admin on a phone: status tiles above a list of order cards, and an order's details sliding up as a sheet."
    heading: "At the market"
    body: >
      The team often checks orders from the market booth, so the admin page works on a phone too. Status tiles at the top show how many orders are open, unpaid or completed. Tapping an order slides its details up from the bottom of the screen.

  # ══════════════ SECTION 04 — PRINT MATERIALS ══════════════
  - type: section
    number: "04"
    heading: "Print Materials"
    problem: >
      The Heartful Gardens team needed to take the brand off-screen with CMYK, PDF/X-1a assets that could be handed directly to a printer.

  - type: row
    side: right
    media: ./assets/hg-business-card-mockup.webp
    heading: "Business cards"
    mediaTitle: true
    body: >
      A minimal design fit the brand best. The business cards were created to be simple, friendly, and eye-catching. The rounded corners mirrored the logo while the textured paper spoke to the rustic aspect of the business.
    border: true
    radius: true
  - type: row
    side: left
    media: ./assets/hg-sourdough-flyer-mockup.webp
    heading: "Sourdough flyer"
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
      A full-color, front and back, 5x7 flyer was designed and printed as an educational and promotional tool. Conveying the health benefits of sourdough bread was important to the business owners, yet the data density needed to be paired with a scannable layout. [See the flyer up close](#zoom).
    border: true
    radius: true

  - type: row
    side: right
    media: ./assets/hg-granola-flyer-mockup.webp
    heading: "Granola flyer"
    mediaTitle: true
    zoom:
      - ./assets/whygranola-1.webp
      - ./assets/whygranola-2.webp
    body: >
      A companion flyer for the granola line extends the same system with its own plum palette. Like the sourdough flyer, an “ORDER ONLINE!” QR code converts market shoppers to online buyers. All illustrations, including the granola hero image, are hand drawn. [See the flyer up close](#zoom).
    border: true
    radius: true

  - type: row
    side: left
    media: ./assets/hg-table-tent-mockup.webp
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    heading: "Table tents"
    mediaTitle: true
    body: >
      Table tents covering their entire product range were needed to offer at-a-glance pricing/info for the stall, sized and styled to read from a few feet away.
    border: true
    radius: true

  - type: row
    side: right
    media: ./assets/hg-badge-mockup.webp
    heading: "Badge"
    mediaTitle: true
    body: >
      Certain farmer's markets required identification for staff and volunteers. A badge with logo was a simple solution to that problem.
    border: true
    radius: true

  - type: row
    side: left
    media: ./assets/hg-banner-mockup.webp
    box:
      background: "#f0f3f7"
      border: "1px solid #e6e2d6"
      padding: "2rem"
      radius: "16px"
    heading: "Banner"
    mediaTitle: true
    body: >
      A large-format banner anchors the market stall with the logo and brand colors scaled up to read from across the lot. The artwork was delivered production-ready file the client could hand straight to a wide-format printer.
    border: true
    radius: true

  - type: impact
    heading: "Impact"
    body: |
      I made a complete, cohesive brand for Heartful Gardens that included a logo system, a set of production-ready print pieces, and a warm, animated website. I also designed the ordering system the business now runs on. Customers order ahead without an account, and the team tracks orders in one place, from request to payment.
      
      > "What began as an idea became a business with a brand
      > customers could recognize. People spot the logo before anything else!"
      >
      > — Patricia McKeon, Owner, Heartful Gardens
---
