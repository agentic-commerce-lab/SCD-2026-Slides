# SCD 2026 Keynote — *A Reality Check on AI-Driven Software Engineering*

Stefan Hamann · Daniel Nögel — Shopware Commerce Day 2026.

## Running it

Double-clicking `index.html` is enough — the deck is a pure HTML/CSS/JS file and runs in any modern browser. Recommended: **Chrome or Safari, fullscreen (F11 / Cmd+Ctrl+F)**.

If a slide asset (e.g. the closing QR code) doesn't load because your browser is strict about `file://`, run a local server instead:

```bash
cd <repo>
python3 -m http.server 8000
# then open http://localhost:8000
```

## Controls

| Key | Action |
|---|---|
| `→` / `Space` / `Enter` / `PageDown` | Next (also advances multi-step slides) |
| `←` / `Backspace` / `PageUp` | Previous |
| `F` | Toggle fullscreen |
| `S` | Storyboard overview (all slides as tiles); `S` or `Esc` to close |
| `R` | Replay the current slide's animation (only on slides that animate) |
| `1` – `6` | Jump to the start of the corresponding section |
| `?` / `H` | Show on-screen hint |

The URL mirrors the current slide (`#12`) — reload lands you right back on it.

## Structure

- `index.html` — engine, styles, UI overlay
- `slides/<section>/<NN>-<name>.js` — one file per slide, self-registers via `SCD.register({...})`
- `slides/_helpers.js` — shared helpers (stagger, session timer, etc.)
- `tools/snap.js` — Puppeteer-based snapshot tool for pre-flight visual checks (`npm i && node tools/snap.js all`)

## Notes for the talk

- Slide 19 shows a live counter that starts ticking on first load (sessionStorage-backed). Open the deck with slide 1 to get a clean run.
- Slide 11 (`whoami`) and slide 17 (hallucinations chart) are two-step slides — press `→` once more before moving on.
- Closing QR (slide 28) currently points to `https://www.shopware.com/` — configurable in `slides/_helpers.js` via `SCD.CLOSING_URL`.
