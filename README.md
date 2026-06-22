# SCD 2026 Keynote — *A Reality Check on AI-Driven Software Engineering*

Stefan Hamann · Daniel Nögel — Shopware Commerce Day 2026.

A single-file, keyboard-driven HTML deck. No build step, no dependencies, runs offline.

## Running it

Open `index.html` in any modern browser (Chrome or Safari, fullscreen). If the closing QR code doesn't load under `file://`, serve the folder instead:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Controls

| Key | Action |
|---|---|
| `→` / `Space` / `Enter` / `PageDown` | Next (also advances multi-step slides) |
| `←` / `Backspace` / `PageUp` | Previous |
| `F` | Fullscreen |
| `S` | Storyboard overview (`S` / `Esc` to close) |
| `R` | Replay the current slide's animation |
| `1` – `6` | Jump to a section |
| `?` / `H` | On-screen hint |

The URL mirrors the current slide (`#12`); reload returns you to it. Multi-step slides (e.g. `whoami`, the hallucination chart) need an extra `→`.

## Structure

- `index.html` — engine, styles, UI overlay
- `slides/<section>/<NN>-<name>.js` — one self-registering slide per file (`SCD.register({…})`)
- `slides/_helpers.js` — shared helpers; the closing QR target is `SCD.CLOSING_URL`
- `tools/snap.js` — optional Puppeteer snapshot tool (`npm i && node tools/snap.js all`)
