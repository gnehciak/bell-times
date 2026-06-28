# Bell Time

A no-build static web app (plain HTML/CSS/JS) showing a live countdown of how much time is
left in the current school period, across 143 Sydney public high schools. Run with
`npm run dev` (serves on `http://localhost:5173` via the zero-dependency `tools/server.js`), or
open `index.html` directly. Deploys static. Build/validation/data scripts live in `tools/`
(`tools/crawl/` holds the one-off scrapers). See `README.md` for the data model and crawler details.

## Design Context

Two root files define design intent — **read them before changing any UI**:

- **`PRODUCT.md`** — strategy. Register: **product** (a glanceable utility; design serves the
  countdown). Primary user: **students** on phones in bright daylight. Primary job:
  **glanceability** — the time-left answer in under a second. Personality: **calm, focused,
  trustworthy, like a well-made clock**. Anti-references: generic SaaS dashboard, cluttered
  school portal, childish, sterile. Accessibility bar: **WCAG 2.1 AA**.

- **`DESIGN.md`** — the visual system, *"The Frost Almanac"*. **This is a new, target system,
  not yet reflected in the current code.** The existing `styles.css` (dark navy `#0b1220` +
  electric-blue accent, background glows, gradient cards, side-stripe "Now" block, uppercase
  eyebrow labels) was judged "too AI" and is being replaced. The new direction: a light
  frost-white canvas, a single rounded sans family (Rubik) in two registers — a human *voice*
  and a precise *instrument*, set apart by weight and scale (no serif) — the
  per-school accent as the one focal colour, hairline editorial layout instead of cards, and a
  refined chronograph countdown ring. OKLCH throughout.

When implementing UI, follow `DESIGN.md` (the target), not the current `styles.css`.

This project uses the **impeccable** design skill — run `/impeccable <command>` for design work.

## Working preferences

- **Do not verify changes in the browser.** Make the edits and stop; the user checks the
  result themselves. No screenshots, no launching/driving Chrome to confirm.
