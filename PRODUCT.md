# Product

## Register

product

## Users

Primarily **students** at Sydney public high schools — teens checking on their phone or
glancing mid-class to answer one question: *how long until the bell?* They use it in short,
high-frequency bursts, often distractedly, sometimes under fluorescent classroom light,
sometimes in a hallway between rooms. Teachers and staff are secondary users with the same
core need. The job to be done is small and constant: **know, instantly, how much time is
left in the current period and what comes next.**

## Product Purpose

Bell Time is a live countdown tool. It shows, ticking every second, how much time remains in
the current school period — and adapts to the wildly different bell schedules across 143
Sydney public high schools and across each weekday (split lunches, Wednesday sport, homeroom
days, optional Period 0s, early finishes). Success is when a student opens it, gets their
answer in under a second, and trusts it. It exists because the official answer is buried in a
PDF or a laminated sheet on a wall, and "how long left?" is asked dozens of times a day.

## Brand Personality

**Calm, focused, trustworthy** — like a well-made clock. The voice is quiet and confident,
never loud or alarming. It appears during a school day that already has enough stress; its job
is to *reduce* tension, not add to it. Plain, honest language ("School's out", "Up next"),
no exclamation marks, no gamification. It should feel like a precise instrument that happens
to be pleasant — alive and characterful, but never demanding attention it hasn't earned. The
per-school accent colour makes it feel like *your* school's tool, not a generic widget.

## Anti-references

The user explicitly flagged all four of these to avoid:

- **Generic SaaS dashboard.** No gradient hero-metric blocks, no identical icon-heading-text
  card grids, no corporate-blue-everything. The countdown is the hero, not a "stat tile."
- **Cluttered school portal / government LMS.** No dense menus, tiny type, walls of notices,
  or bureaucratic chrome. One screen, one answer.
- **Childish / cartoonish.** The audience is teens, not toddlers. No comic-sans energy, no
  juvenile mascots, no over-gamification. Respect the user.
- **Sterile / lifeless.** Equally, not so minimal it's forgettable. It must have character —
  the needle to thread is *calm with personality*, not *empty*.

## Design Principles

1. **Glance over read.** The single answer — time left — must register in under a second from
   across a room or a quick phone glance. Type size, contrast, and motion all serve that one
   number first; everything else is support.
2. **Calm under a clock.** It shows up in a stressful environment. No alarms, no urgent reds,
   no shouting. Reassure, don't pressure — even when there are two minutes left.
3. **Honest about confidence.** Four schools are hand-verified; 139 are machine-crawled and
   fallible. Never imply false precision. Surface the `verified` / `review` distinction
   plainly and keep the "check against official times" reminder visible.
4. **Character without noise.** Memorable, alive, distinctly *not* a template — achieved
   through restraint and craft, never through clutter or decoration. Personality is in the
   details, not the volume.
5. **Their school, their tool.** The adaptive per-school accent is core identity, not a gimmick.
   The app should feel personalised the moment a school is chosen.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1 against its background; large text ≥3:1 — verify
this for the muted-blue text on dark navy, which is the likeliest weak spot. Keyboard-operable
throughout (the school picker is already an ARIA combobox with arrow-key navigation and
listbox semantics — keep it that way). Honour `prefers-reduced-motion` for the ring, progress
bars, and any future motion. The status colours (class / break / event) should not be the
*only* signal — they're paired with labels and position today; preserve that. Tabular numerals
on all times so the countdown doesn't jitter.
