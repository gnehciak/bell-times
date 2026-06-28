# ⏰ Bell Time

A timetable website that shows, live, **how much time is left in the current school period**. Built to accommodate wildly different bell schedules across schools and across days of the week — and now covering **201 Sydney public high schools**.

## What it does

- **Live countdown ring** — time remaining in the current period, ticking every second.
- Automatically handles every state: **in class**, **on break** (amber), **between bells** (transition gaps), **before school**, **school's out**, and **weekends**.
- **"Now" and "Up next"** cards so you always know what's coming.
- **Full day schedule** with the current period highlighted and a live progress bar.
- **Searchable school picker** — type to filter 140+ schools by name, with keyboard navigation and match highlighting.
- **Day tabs** to preview any weekday's schedule (today is marked with a green dot).
- **Week A/B selector** appears for schools with fortnightly bell variants.
- Remembers your chosen school, adapts its accent colour, works on mobile, no build step.

## Schools

All 201 schools live in `data.js`, split into two blocks within the one `SCHOOLS` array.

**4 hand-verified** (transcribed and double-checked, shown with a `✓ verified` badge),
at the top of the array: Baulkham Hills, Cumberland, Northmead CAPA, and Muirfield High
Schools. (Three further schools sit just below them in the hand-curated block —
Asquith, Bayside, and Randwick High — corrected for recent co-ed mergers.)

**~197 auto-crawled** from each school's `schools.nsw.gov.au` bell-times page (shown with a
`review` badge), read from the HTML table or transcribed from the timetable image. Each
carries a `source` link to the page it came from and is flagged `needsReview`. These sit
between the `BELLTIME:GENERATED:START` / `:END` markers — the region `merge.js` manages.

> ⚠️ The crawled timetables are machine-extracted and **not hand-verified**. Always
> double-check against your school's official bell times — that's what the `review` badge
> and the footer note are reminding you to do. Found an error? Fix it in `data.js`
> (or re-run the crawler), and to make a school verified, move its object above the
> `BELLTIME:GENERATED:START` marker into the hand-curated block.

## Run it

```bash
npm run dev      # serves at http://localhost:5173
```

…or just open `index.html` directly in a browser (everything is plain HTML/CSS/JS).
Deploy to any static host (including Vercel — no config needed: it's a static site).

### Build for SEO (per-school pages)

The app is one page, but search engines and social cards need a real URL per
school. Run the prebuild before deploying:

```bash
SITE_URL=https://your-domain npm run build
```

This generates, from the school data, a crawlable page per school at
`s/<id>/index.html` (e.g. `/s/caringbah/`) — each with its own `<title>`,
meta description, canonical, Open Graph tags, JSON-LD, pre-rendered bell times,
and a `<noscript>` full-week fallback — then hydrates into the live app via
`app.js`. It also writes `sitemap.xml` and `robots.txt`, and upgrades the
homepage's canonical/OG tags to absolute URLs.

`SITE_URL` must be your real origin (no trailing slash) so canonical/OG/sitemap
URLs are correct; if unset, a placeholder is used and a warning is printed. The
build is idempotent — safe to re-run after editing data or `index.html`.

## Project layout

| File | Purpose |
| --- | --- |
| `index.html` / `home.js` | The home screen: brand, prominent school search, "your schools" — links into the per-school pages |
| `styles.css` / `app.js` | Shared styles + the per-school countdown engine |
| `tools/school-shell.html` | App-shell template `build-pages.js` transforms into each `school/<id>/` page |
| `data.js` | All 201 schools: 4 hand-verified, plus the crawled schools in the auto-managed `BELLTIME:GENERATED` block |
| `logos.generated.js` | School id → logo filename in `logos/` (auto-generated) |
| `accents.generated.js` | School id → accent colour derived from each logo (auto-generated) |
| `week-overrides.js` | Manual Week A/B mappings for generated schools with clear fortnight variants |
| `logos/` | Per-school logo PNGs (the image assets `logos.generated.js` maps to) |
| `tools/derive-accents.js` | Analyses each `logos/*.png` and writes `accents.generated.js` |
| `tools/build-pages.js` | SEO prebuild: generates `school/<id>/` pages, `sitemap.xml`, `robots.txt` |
| `tools/server.js` | Zero-dependency static dev server (serves pretty `/school/<id>/` URLs) |
| `tools/validate.js` / `tools/validate-all.js` | Data integrity checks |
| `tools/merge.js` | Rebuilds the `BELLTIME:GENERATED` block of `data.js` from crawler output |
| `tools/crawl/` | One-off logo/image scrapers used to assemble the dataset (not part of the app or build) |

All build, validation, and data-pipeline scripts live under `tools/`; everything the
browser loads (`index.html`, `app.js`, `styles.css`, the data `.js` files, `logos/`)
stays at the project root. The npm scripts (`npm run dev`/`build`/`validate`) already
point at the `tools/` paths, so day-to-day commands are unchanged.

## The data model

Each school lists named `schedules` (a `schedule` is an ordered list of blocks with a `start`
time), and a `days` map pointing each weekday at one of those schedules. The end of a block is
the start of the next one; the last entry is a `terminal` marker that supplies the final bell
time. Block colour (class / break / event) is inferred from the name. This shape absorbs split
lunches, homeroom days, Wednesday sport, optional Period 0s, early-finish days, and more.

Schools with fortnightly bells can also define `weeks.a.days` and `weeks.b.days` maps, each
pointing weekdays at schedule keys. The app falls back to `days` for schools without a Week A/B
cycle. Generated-school A/B mappings that are clear from source pages live in
`week-overrides.js`, which can also add small manual `schedules` blocks, so the
`BELLTIME:GENERATED` block of `data.js` can remain machine-generated.

## How the schools were crawled

A multi-agent workflow processed the
[Wikipedia list of Sydney public high schools](https://en.wikipedia.org/wiki/Category:Public_high_schools_in_Sydney).
One lightweight agent per school: **WebSearch** → find the official bell-times page →
**WebFetch** → extract the timetable (HTML table, or transcribe an image) → normalise to
24-hour times grouped by day-type → write a small JSON file. Then `merge.js` deterministically
converts those files into the app's data shape, **dropping any school whose times aren't a
valid increasing sequence** so a broken schedule can never produce a wrong countdown.

To re-validate the whole dataset:

```bash
npm run validate         # quick structural checks on data.js (all 201 schools)
npm run validate:all     # replays the app's timetable build for every school/day
```

## School accent colours

Each school's accent (the one focal colour in the UI — ring, tabs, logo chip) is
derived from its own logo so it actually matches the school's identity:

```bash
node tools/derive-accents.js   # logos/*.png → accents.generated.js
```

For each logo it downscales with `sips`, finds the dominant **brand** colour —
the colour with the largest area, ignoring the white/transparent background and
near-black ink, and discounting gold/yellow since it's almost always crest *trim*
rather than the identity — then normalises that hue through OKLCH into the design
system's lightness/chroma band so every accent stays harmonious on the frost-white
canvas and meets the WCAG AA contrast bar. Monochrome logos fall back to a calm
cool slate. `app.js` prefers this logo-derived accent, then any hand-set `accent`
in the data, then a stable hashed fallback for schools without a logo.

> Times use your device's clock. Always double-check against your school's official bell times.
