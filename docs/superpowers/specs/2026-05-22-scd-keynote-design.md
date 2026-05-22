# SCD 2026 Keynote — Interactive Presentation Site

**Talk:** *A Reality Check on AI-Driven Software Engineering* — Daniel Nögel & Stefan Hamann, ~30 min.

## Goal

Stunning, custom, single-file interactive presentation. Apple/WWDC-grade visual quality, terminal/developer aesthetic, anti-hype tone. Replaces reveal.js.

## Deliverable

One `index.html` (everything embedded) in the project root. Opens by double-click, runs offline (QR lib via CDN with text fallback), deploys by drag-drop.

## Navigation

Classic keynote — one keypress per beat.

- `→` / `Space` / `PageDown` — next
- `←` / `PageUp` — previous
- `1`–`8` — jump to section
- `f` — fullscreen
- `r` — replay current interactive
- `Esc` — exit fullscreen

## Visual system

- Background `#0A0A0A`, foreground `#E6E6E6`, dim `#666`
- Primary accent: phosphor green `#00FF9C`
- Secondary accent (title + closing only): Shopware blue `#189EFF`
- Typography: JetBrains Mono throughout, system monospace fallback
- Hero type: `clamp(3rem, 8vw, 7rem)`
- Transitions: 400ms fade + 0.98→1 scale
- Persistent UI: bottom-left section counter `01 / 08`, bottom-right 8 progress dots

## Slide map (21 beats / 8 sections)

| # | Section | Type | Note |
|---|---|---|---|
| 0 | Title | static | blue accent |
| 1–2 | Cold Open | static | kinetic typography |
| 3–5 | What Changed | 1 interactive | token-stream split |
| 6–8 | Agentic Engineering | 1 interactive | agent graph SVG |
| 9–11 | Debugging Changed | 1 interactive | hallucinated terminal log |
| 12–14 | Reality Check | 1 interactive | live counter |
| 15–16 | Trenches | static | backdrop for Stefan |
| 17–18 | Future Roles | static | emerging roles list |
| 19–20 | Closing | 1 interactive | QR + thanks, blue returns |

## Interactive moments

1. **Token stream** — two columns ("Cheap now" / "Expensive now") fill with words at 40–90ms jitter, green blinking caret follows last char.
2. **Agent graph** — SVG hex of 6 labeled nodes (Goal, Agent, Tool, Memory, Context, Output) with traveling-particle edges; nodes pulse-glow.
3. **Hallucinated log** — terminal log streams green at ~150ms; one line drifts amber (`deployed... confidence: 87%`), final red line `// this never happened`.
4. **Counter** — two huge numerals: "lines generated" ticking fast, "bugs created" ticking slow; later fades in `decisions deferred to future-you: ∞`.
5. **QR + thanks** — client-side QR to a configurable URL; clean monochrome layout with single blue underline.

## YAGNI

No presenter notes view, no phone interactivity beyond closing QR, no theme switcher, no editor UI, no persistence.

## Acceptance

- All 21 beats navigable via keyboard
- Every interactive moment plays cleanly and replays via `r`
- Works at 1080p and 4K in Chrome/Safari
- Loads in <1s offline (except QR which gracefully falls back to URL text)
