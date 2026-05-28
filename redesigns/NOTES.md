# SAT Traffic Lights — redesign decision log

## Active production
**v2-aligned** is shipped at `web/index.html` + `web/app.css` (Geist + Geist Mono, dark canvas, single calibrated lavender accent, restrained card chrome). Visually consistent with the production homepage at `homepage/index.html`.

## On standby
**v1-editorial** — cream canvas, Instrument Serif display, JetBrains Mono labels, double-bezel cards, terracotta accent, fluid-island nav. Held in reserve as a warmer, paperback-workbook alternative. Promote by porting its tokens and structures into `web/app.css` and updating the font link in `web/index.html`.

**v3-booklet** — paper canvas, Source Serif display, ruled margins, printer's-red accent, sharp 0&nbsp;px corners, dashed teacher-stamp signal buttons. Held in reserve as the deliberately-different, anti-SaaS direction.

## Archived
**v0-original** — the pre-redesign state (Inter on near-black with cyan accent). Kept for reference; carries the body-margin scrollbar bug that was fixed during the redesign.

## Notes
- All four variants stack score → quiz → results in a single static page. They are visual mockups, not full state machines. The live state machine lives at `../web/` and uses the same `stl-*` class system, so promoting any variant is a matter of porting CSS tokens + structures into `web/app.css` (and updating the font link in `web/index.html`).
- The scrollbar issue Joshua flagged on the score screen was traced to `body.stl-app { min-height: 100vh }` combined with the user-agent's default `body { margin: 8px }` reset never being applied — `<html>` ended up 16&nbsp;px taller than the viewport on every render. The new `web/app.css` resets `html, body { margin: 0; padding: 0; }` and adds `scrollbar-gutter: stable`.

## Decision timestamp
2026-04-26 — Joshua picked v2-aligned as primary; v1-editorial and v3-booklet retained as standby alternatives.
