'use strict';

/**
 * Bento overview of all eight projects.
 *
 * Inspired by Stagecraft's Bento component: a 4-column grid where each
 * cell carries an index, a heading and a one-line description. Cells
 * are color-coded by maturity / surface:
 *   accent (green) — shipping publicly today
 *   amber          — private repos / open-source-adjacent tooling
 *   blue           — internal R&D, not yet a product
 *
 * Cells stagger in left-to-right, top-to-bottom on enter.
 */

const PORTFOLIO_CELLS = [
  {
    idx: '01',
    cat: 'accent',
    tag: 'public · scanner',
    heading: 'agenticcommerce.shop',
    body: 'Reads any storefront the way an AI agent does. 9 readability signals, 20+ diagnostics, live GPT-5.4 visibility test.',
  },
  {
    idx: '02',
    cat: 'accent',
    tag: 'public · conformance',
    heading: 'UCP Simulator',
    body: 'Drives a virtual agent through any UCP-compliant shop. Discovery, AP2, OAuth, signed webhooks, REST + MCP transports.',
  },
  {
    idx: '03',
    cat: 'accent',
    tag: 'public · MCP',
    heading: 'migratemy.shop',
    body: 'Shopware Prism. A 3-year stay-vs-migrate forecast for any legacy shop. Public website, plus an MCP server.',
  },
  {
    idx: '04',
    cat: 'accent',
    tag: 'shopware core',
    heading: 'UCP Integration',
    body: 'The Universal Commerce Protocol, implemented in Shopware core. 10 capabilities, admin module, simulator-certified.',
  },
  {
    idx: '05',
    cat: 'amber',
    tag: 'private repo',
    heading: 'agentic-readiness-extract',
    body: 'Backports the core agentic stack (UCP, MCP, OpenAI feed) to Shopware 6.5, 6.6 and 6.7.x. Self-disabling per module.',
  },
  {
    idx: '06',
    cat: 'amber',
    tag: 'private repo',
    heading: 'ltx-experience',
    body: 'Three storefront prototypes on LTX 2.3 22 B video. Generated visuals on top of deterministic Shopware Store API.',
  },
  {
    idx: '07',
    cat: 'blue',
    tag: 'internal R&D',
    heading: 'Field AI',
    body: 'A field-theoretic AI runtime. 31 subsystems, 148 k LoC of Python. Cognition as dynamics, no transformer involved.',
  },
  {
    idx: '08',
    cat: 'blue',
    tag: 'internal R&D',
    heading: 'sw-agent',
    body: 'A Shopware coding agent that runs its own code. Every plugin it writes installs cleanly in a Dockware container before "done".',
  },
];

SCD.register({
  section: 3,
  title: '03b · 8 projects at a glance',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>What fell out of the loom</div>
      <div class="pf-bento" data-stage-key="PortfolioBento">
        ${PORTFOLIO_CELLS.map((c, i) => `
          <div class="pf-cell pf-cell--${c.cat}" data-stage-key="PortfolioBento/cell[${i}]">
            <div class="pf-cell-head">
              <span class="pf-idx">${c.idx}</span>
              <span class="pf-tag">${c.tag}</span>
            </div>
            <div class="pf-cell-body">
              <div class="pf-heading">${c.heading}</div>
              <div class="pf-desc">${c.body}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.pf-cell'), 90, 200);
  },
  replay(el) {
    el.querySelectorAll('.pf-cell').forEach(n => n.classList.remove('in'));
    SCD.staggerIn(el.querySelectorAll('.pf-cell'), 90, 100);
  }
});
