---
name: Bell Time
description: A calm, glanceable instrument that tells students how long is left in the current school period.
colors:
  accent-cobalt: "oklch(0.50 0.16 256)"
  frost-white: "oklch(0.985 0.004 256)"
  frost-surface: "oklch(0.972 0.005 256)"
  frost-sunken: "oklch(0.95 0.006 256)"
  hairline: "oklch(0.90 0.007 256)"
  hairline-strong: "oklch(0.84 0.008 256)"
  ink: "oklch(0.25 0.02 264)"
  ink-strong: "oklch(0.17 0.02 264)"
  muted: "oklch(0.46 0.02 262)"
  faint: "oklch(0.58 0.015 262)"
  on-accent: "oklch(0.99 0.01 256)"
  amber-break: "oklch(0.45 0.12 65)"
  violet-event: "oklch(0.46 0.15 300)"
  green-good: "oklch(0.50 0.12 155)"
typography:
  display:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 3.3rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.1rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
    fontFeature: "tnum"
  label:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  countdown:
    typography: "{typography.display}"
    textColor: "{colors.ink-strong}"
  status-line:
    typography: "{typography.headline}"
    textColor: "{colors.ink-strong}"
  ring-progress:
    backgroundColor: "{colors.accent-cobalt}"
  tab-active:
    textColor: "{colors.ink-strong}"
    typography: "{typography.data}"
  tab-inactive:
    textColor: "{colors.muted}"
    typography: "{typography.data}"
  combo-input:
    backgroundColor: "{colors.frost-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 36px"
  badge-verified:
    backgroundColor: "{colors.frost-sunken}"
    textColor: "{colors.green-good}"
    rounded: "{rounded.pill}"
    padding: "1px 8px"
  badge-review:
    backgroundColor: "{colors.frost-sunken}"
    textColor: "{colors.amber-break}"
    rounded: "{rounded.pill}"
    padding: "1px 8px"
  period-row-active:
    backgroundColor: "{colors.frost-sunken}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: Bell Time

## 1. Overview

**Creative North Star: "The Frost Almanac"**

Bell Time is a calm, light **instrument** — closer to a well-made wall clock or a printed
almanac than to an app. It reports one fact, ticking, in bright daytime light: *how long is
left in this period.* The whole system is built so a fifteen-year-old can answer that in under
a second, on a phone, in a sunlit corridor, and walk away. Everything that isn't the answer
recedes. The surface is a cool frost-white — the quiet light of a winter morning through frost
— not a dark dashboard, because the user is in a bright room, and a glowing dark panel is a
worse fit for that moment than a sheet of paper.

Character lives in **structure and typography, never in a signature colour** — because the
accent colour belongs to each *school*, not to the product. A single rounded sans (Rubik)
carries the whole interface in two registers: a human *voice* speaks the words — "On break",
"School's out", the school's name — set apart by weight and scale, while the same family as a
precise *instrument* renders every number with tabular figures. Voice and instrument share one
typeface but never blur — words breathe, numbers lock to the grid. Depth comes from hairline rules
and tonal layering, not drop shadows or card gradients. The one confident stroke of colour is the countdown ring; it earns its
saturation by being the single thing the eye is meant to find.

This system explicitly rejects, per the project's anti-references: the **generic SaaS
dashboard** (no navy-and-electric-blue, no gradient hero-metric tiles, no card grids), the
**cluttered school portal** (one screen, one answer, no menu thickets), the **childish**
(no cartoon mascots or gamification — the audience is teenagers, addressed as such), and the
**sterile** (the human voice, the generous rhythm, and the chronograph ring give it a pulse).

**Key Characteristics:**
- Light frost-white canvas tuned for bright, daytime, at-a-glance reading.
- One huge, precise countdown as the hero; everything else is support.
- One sans family in two registers — a human voice and a precise instrument, set apart by weight and scale, not by a second typeface.
- Per-school accent is the identity; the product layer stays neutral so any school colour drops in cleanly.
- Flat by default. Hairlines and tone for structure; elevation reserved for true overlays.
- Calm under pressure — no urgent reds, no alarms, even at two minutes left.

## 2. Colors

A cool, near-monochrome frost canvas carrying a single, school-owned accent and a small set of
soft semantic tints for state.

### Primary
- **Cobalt** (`oklch(0.50 0.16 256)`): The default brand accent and the colour of the live
  countdown ring, the active-tab marker, links, and focus rings. **It is replaced at runtime by
  the selected school's own accent** — Cobalt is only the fallback before a school is chosen.
  Used as a focal point, not a wash: roughly ≤10% of the screen.

### Neutral
- **Frost White** (`oklch(0.985 0.004 256)`): The page canvas. A whisper of cool chroma (a
  winter-light tint, never warm cream) keeps it from feeling clinical without reading as colour.
- **Frost Surface** (`oklch(0.972 0.005 256)`): The schedule panel and the search input — a
  second neutral layer, one tonal step down from the canvas.
- **Frost Sunken** (`oklch(0.95 0.006 256)`): Hover and the active schedule row; soft badge
  backgrounds.
- **Hairline** (`oklch(0.90 0.007 256)`) / **Hairline Strong** (`oklch(0.84 0.008 256)`):
  Dividers and borders. Structure is drawn with these, not with shadows.
- **Ink** (`oklch(0.25 0.02 264)`): Primary text. ≥7:1 on Frost White.
- **Ink Strong** (`oklch(0.17 0.02 264)`): The countdown, the status voice, max emphasis.
- **Muted** (`oklch(0.46 0.02 262)`): Secondary text — times, sublabels, the footer note. Held
  at ≥4.5:1 on the canvas; this is the floor for *any* readable text.
- **Faint** (`oklch(0.58 0.015 262)`): Non-essential decoration and large-text-only labels.
  Never used for body copy.

### Semantic (state)
Each state is a **soft tint background + a darker same-hue text**, never a saturated fill, and
is **always paired with a label or shape** — colour is never the only signal.
- **Amber / Break** (`oklch(0.45 0.12 65)` on a ~`oklch(0.95 0.04 70)` tint): recess, lunch,
  transition gaps.
- **Violet / Event** (`oklch(0.46 0.15 300)` on a ~`oklch(0.95 0.04 300)` tint): assemblies,
  sport, special blocks.
- **Green / Good** (`oklch(0.50 0.12 155)`): the "today" dot and the `verified` badge.

### Named Rules
**The Borrowed-Colour Rule.** The accent is not ours; it is the school's. The product layer is
deliberately neutral so that *any* school's colour — set at runtime — looks intentional on it.
Incoming school accents are normalised into a usable band (lightness ~0.45–0.60, chroma
~0.10–0.18) so they always read on the light canvas and can carry white text. No school colour
is allowed to break legibility.

**The One Stroke Rule.** Colour appears as one confident stroke — the countdown ring — and a
few small state tints. If a second large saturated area appears, the hierarchy has been lost.

## 3. Typography

**Type Family:** Rubik (with system-ui fallback) — used for everything.
**Two registers:** *Voice* (the words a person reads) and *Instrument* (numbers and controls),
distinguished by weight, optical scale, and tabular figures — not by a second typeface.

**Character:** A single-family system working in two registers. Rubik's softly rounded corners
give it a calm, approachable cut that suits a clock without ever turning childish — the rounding
warms the numbers rather than decorating them. It is deliberately not one of the saturated
AI-default sans (Inter, Geist, et al.). The *voice* register (status words, the school name, headings) and the
*instrument* register (every number and control) share the typeface but stay distinct through
weight, optical scale, and tabular figures on all numbers. No serif: the calm, considered tone
comes from rhythm and restraint, not from a second family.

Load via Google Fonts (no build step): `Rubik:wght@400;500;600`. No second family is loaded.

### Hierarchy
- **Display** (Rubik, 600, `clamp(2.5rem, 7vw, 3.3rem)`, lh 1, `tnum`): the countdown,
  centred inside the ring. Tabular figures so digits never jitter as they tick. The single
  largest, highest-contrast thing on the page; its size is bounded by the ring it sits in.
- **Headline** (Rubik, 500, `clamp(1.5rem, 3vw, 2.1rem)`, lh 1.1): the status voice —
  "On break", "School's out", "Weekend", "Before school". The human sentence above the number.
- **Title** (Rubik, 500, 1.25rem, lh 1.2): the selected school's name and section headings
  ("Schedule"), and the Now / Up next period names. Long names wrap rather than overflow.
- **Body** (Rubik, 400, 0.9375rem, lh 1.5): prose and secondary text; capped at 65–75ch.
- **Data** (Rubik, 500, 0.875rem, lh 1.3, `tnum`): every clock time and period range.
- **Label** (Rubik, 500, 0.75rem, +0.04em): the few functional micro-labels
  ("Now", "Up next").
  Used sparingly — *not* as an eyebrow above every section.

### Named Rules
**The Words-and-Numbers Rule.** One family, two jobs: words read, numbers count. Voice text sits
at headline/title weight and scale; every number uses tabular figures. If a number loses its
tabular lock, or a status word is shrunk to data scale, it's wrong.

**The No-Eyebrow Rule.** No tiny uppercase tracked kicker above every section. "Now" and "Up
next" are the only standing micro-labels, and they label live data, not decorate a heading.

## 4. Elevation

Flat by default. Depth is communicated with **tonal layering** (canvas → surface → sunken) and
**hairline rules**, not drop shadows, and never with the card gradients or glow the previous
design used. There are no resting shadows on cards or the hero — those surfaces are defined by
a single hairline and a tonal step.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 12px 32px -12px oklch(0.25 0.02 264 / 0.22)`): the *only* shadow
  in the system, used solely on the school-search dropdown — a real popover floating above
  content. Nothing at rest casts a shadow.

### Named Rules
**The Flat-Almanac Rule.** A printed page doesn't float. Surfaces sit flat; the one exception is
a transient overlay that genuinely sits above the page (the search results), which earns a soft,
low shadow to read as "above".

## 5. Components

Every interactive component ships its full state set: default, hover, focus-visible, active,
disabled, and (where it applies) selected/loading. Focus-visible is always a 2px accent ring at
2px offset — keyboard users are first-class.

### Countdown Ring
- **Character:** a refined chronograph dial, not a thick progress donut.
- **Shape:** thin stroke (~8–10px, down from the old 14px), round line-cap, track in Hairline,
  progress arc in the accent. The big Display number sits centred; the status voice sits above.
- **Motion:** the arc and number update on a smooth linear tick (state, not decoration).
- **Break state:** the arc switches to Amber; the status voice reads the break name.

### Now / Up next
- **Character:** a quiet typographic statement, **not** stat tiles and **never** with a coloured
  side-stripe (the old `border-left` accent is banned). Two lines, separated by a hairline:
  a small "Now" / "Up next" label, the period name in Title, the time in Data.

### Day Tabs
- **Shape:** text buttons in a row, `rounded.sm` hit area.
- **Inactive:** Muted text, transparent. **Hover:** Ink text. **Active:** Ink-Strong text with a
  2px accent underline (the accent marks the current selection — no filled pill). **Today:** a
  small Green dot after the label.
- **Focus-visible:** accent ring.

### School Search (combobox)
- Preserve the existing ARIA combobox semantics (role=combobox, listbox, arrow-key nav,
  match-highlighting). Input on Frost Surface, `rounded.sm`, Ink text, Muted placeholder at
  ≥4.5:1.
- **Listbox:** an overlay (the one Elevation shadow), `rounded.md`, options with a school
  accent swatch, name, and a `verified`/`review` badge. Hover/active option = Frost Sunken;
  selected option = a 1px accent inset ring.

### Badges
- **verified:** Green text on Frost Sunken, `pill`, sentence case ("verified", with a check).
- **review:** Amber text on Frost Sunken, `pill` ("review"). Honest about machine-crawled data.

### Schedule Rows
- **Character:** an editorial list, not cards. Rows separated by space and the existing
  dot-name-time grid; a coloured **dot** (class=accent, break=amber, event=violet) carries type
  — paired with the name, so colour is never the only cue.
- **Past:** dimmed to ~0.45 opacity. **Active:** Frost Sunken fill, `rounded.md`, Ink-Strong
  name, and a thin live progress bar in the accent beneath the row. No side-stripe.

### Buttons
- **Ghost** (clear-search and similar): transparent, Muted glyph, Frost Sunken on hover. Quiet.
- **Primary** (if ever needed): accent fill, `on-accent` (white) text per the saturated-fill
  contrast rule, `rounded.sm`.

### Motion
- 150–200ms ease-out on hover/focus/active/tab changes. The ring's per-second tick is linear.
- **No orchestrated page-load sequence** — the app loads straight into the answer.
- `@media (prefers-reduced-motion: reduce)`: ring and bar transitions become instant; no other
  motion to suppress.

## 6. Do's and Don'ts

**Do**
- Lead with the number. The countdown is the largest, highest-contrast thing on the page.
- Let the school own the colour. Normalise each accent into the legible band and use it as one
  focal stroke (the ring, the active marker, links, focus).
- Keep the voice/instrument split by weight and scale — always tabular figures on times.
- Build structure from hairlines and tonal steps. Stay flat.
- Be honest: keep the `verified`/`review` distinction and the "check official times" note visible.
- Stay calm at the deadline — shrinking time is shown by the ring, not by red or motion.

**Don't**
- Don't reach back toward the dark navy + electric-blue dashboard, background glows, or
  gradient cards — that's the look we left.
- Don't use a coloured `border-left`/side-stripe on any row, card, or block. (Banned.)
- Don't add gradient text, glassmorphism, or a hero-metric stat-tile cluster.
- Don't stamp a tiny uppercase tracked eyebrow above every section.
- Don't set body or secondary text below 4.5:1 — the previous design's faint grey-on-tint is
  the exact failure to avoid.
- Don't let a long school name overflow; wrap it. The viewport is part of the design.
- Don't convey period type (class/break/event) by colour alone — keep the paired label/shape.
