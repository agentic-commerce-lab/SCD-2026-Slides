'use strict';

/**
 * The four deeper pieces behind the public artifacts.
 *
 * Same cinematic 2x2 layout as the merchant-facing slide, but each
 * tile carries a generated visual instead of a website screenshot
 * (private repos and internal R&D have no public surface) plus an
 * inline three-metric strip pinned to the bottom of the body.
 *
 * Copy is intentionally factual: what the thing actually is, then
 * the concrete numbers that prove it.
 */

const FOUNDATION_TILES = [
  {
    idx: '05',
    cat: 'amber',
    img: 'assets/projects/05-agentic-readiness-extract.jpg',
    name: 'agentic-readiness-extract',
    status: 'Private repo',
    tag: 'shopware/ · backport compiler',
    lede: 'Backports the core agentic stack to Shopware 6.5, 6.6 and 6.7.x.',
    body: 'A declarative compiler. Reads a manifest, slices Shopware core, emits a self-contained plugin. Each module self-disables when the host catches up to that feature.',
    stats: [
      { v: '22', l: 'migrations' },
      { v: '13 + 9', l: 'MCP tools' },
      { v: '~17 k', l: 'LoC / run' },
    ],
  },
  {
    idx: '06',
    cat: 'amber',
    img: 'assets/projects/06-ltx-experience.jpg',
    name: 'ltx-experience',
    status: 'Private repo',
    tag: 'agentic-commerce-lab/ · LTX 2.3 22 B',
    lede: 'Three storefront prototypes built on LTX 2.3 22 B video.',
    body: 'Generative campaign landing page, live room composer, full LTX-native flipbook catalogue. Visuals are generated, products and cart stay deterministic Shopware Store API.',
    stats: [
      { v: '22 B', l: 'LTX params' },
      { v: '3', l: 'prototypes' },
      { v: '100 %', l: 'commerce-truth' },
    ],
  },
  {
    idx: '07',
    cat: 'blue',
    img: 'assets/projects/07-field-ai.jpg',
    name: 'Field AI',
    status: 'Internal R&D',
    tag: 'core/ · post-transformer kernel',
    lede: 'A field-theoretic AI runtime. No transformer involved.',
    body: '31 subsystems, 148 k lines of Python. Cognition emerges from dynamics on a sphere-constrained field state, gated each tick by a measured energy economy.',
    stats: [
      { v: '31', l: 'subsystems' },
      { v: '395', l: 'files' },
      { v: '148 k', l: 'LoC' },
    ],
  },
  {
    idx: '08',
    cat: 'blue',
    img: 'assets/projects/08-sw-agent.jpg',
    name: 'sw-agent',
    status: 'Internal R&D',
    tag: 'sw-agent/ · Dockware-verified',
    lede: 'A Shopware coding agent that runs its own code.',
    body: 'Every generated plugin lands in a real Dockware container before it is declared done. PHP and Twig must parse, plugin:install must run clean, system:check must stay green, the task assertion must fire.',
    stats: [
      { v: '4', l: 'pass gates' },
      { v: '6', l: 'phase pipeline' },
      { v: '57', l: 'skill generators' },
    ],
  },
];

SCD.register({
  section: 3,
  title: '03b · The engine behind it',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>The engine behind the artifacts</div>
      <div class="pf-grid pf-grid--2x2" data-stage-key="Foundations">
        ${FOUNDATION_TILES.map((t, i) => `
          <div class="pf-tile pf-tile--${t.cat}" data-stage-key="Foundations/tile[${i}]">
            <div class="pf-thumb" style="background-image: url('${t.img}')"></div>
            <div class="pf-tile-idx">${t.idx}</div>
            <div class="pf-tile-status"><span class="dot"></span>${t.status}</div>
            <div class="pf-tile-body">
              <div class="pf-tile-tag"><span class="pf-url-dot"></span>${t.tag}</div>
              <div class="pf-tile-name">${t.name}</div>
              <div class="pf-tile-lede">${t.lede}</div>
              <div class="pf-tile-desc">${t.body}</div>
              <div class="pf-tile-stats">
                ${t.stats.map(s => `
                  <div class="pf-tile-stat">
                    <span class="pf-tile-stat-v">${s.v}</span>
                    <span class="pf-tile-stat-l">${s.l}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.pf-tile'), 140, 250);
  },
  replay(el) {
    el.querySelectorAll('.pf-tile').forEach(n => n.classList.remove('in'));
    SCD.staggerIn(el.querySelectorAll('.pf-tile'), 140, 100);
  }
});
