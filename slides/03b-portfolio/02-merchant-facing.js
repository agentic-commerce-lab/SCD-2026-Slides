'use strict';

/**
 * The four publicly available pieces.
 *
 * Cinematic 2x2 tiles. Each tile is a full-bleed hero image with a
 * subtle CRT scanline overlay and a dark block below it that carries
 * the project's tag, name, italic lede and a short factual body.
 *
 * Copy is intentionally on-point: a one-line description of what the
 * thing actually is, followed by the concrete features that matter.
 */

const MERCHANT_TILES = [
  {
    idx: '01',
    img: 'assets/projects/01-agenticcommerce-shop.jpg',
    name: 'agenticcommerce.shop',
    status: 'Live · Scanner',
    tag: 'public · shopware · the alliance',
    lede: 'Reads any storefront the way an AI agent does.',
    body: 'Scores discovery, catalog readability and transaction readiness across 20+ diagnostics. Includes a live GPT-5.4 visibility test on six measured dimensions.',
  },
  {
    idx: '02',
    img: 'assets/projects/02-ucp-simulator.jpg',
    name: 'UCP Simulator',
    status: 'Live · Conformance',
    tag: 'public · /simulator',
    lede: 'Drives a virtual agent through any UCP-compliant shop.',
    body: 'Discovery, AP2 mandates, OAuth identity linking, signed webhooks, REST and MCP transports. Conversation on the left, raw HTTP exchanges on the right.',
  },
  {
    idx: '03',
    img: 'assets/projects/03-migratemy-shop.jpg',
    name: 'Shopware Prism',
    status: 'Live · MCP',
    tag: 'public · migratemy.shop',
    lede: 'A 3-year stay-vs-migrate forecast for any legacy shop.',
    body: 'Drop a domain. The scanner detects the platform, sizes the gap and quantifies the leak. Available as a public website and as an MCP server for any AI client.',
  },
  {
    idx: '04',
    img: 'assets/projects/04-ucp-core.jpg',
    name: 'UCP in Shopware Core',
    status: 'Live · Reference',
    tag: 'shopware core · /documentation',
    lede: 'The Universal Commerce Protocol, implemented in Shopware core.',
    body: '10 capabilities, admin module under Settings, signing-key rotation, OAuth client registration. Every endpoint verified by the public simulator.',
  },
];

SCD.register({
  section: 3,
  title: '03b · What merchants can use today',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Shipping in production</div>
      <div class="pf-grid pf-grid--2x2" data-stage-key="MerchantFacing">
        ${MERCHANT_TILES.map((t, i) => `
          <div class="pf-tile" data-stage-key="MerchantFacing/tile[${i}]">
            <div class="pf-thumb" style="background-image: url('${t.img}')"></div>
            <div class="pf-tile-idx">${t.idx}</div>
            <div class="pf-tile-status"><span class="dot"></span>${t.status}</div>
            <div class="pf-tile-body">
              <div class="pf-tile-tag"><span class="pf-url-dot"></span>${t.tag}</div>
              <div class="pf-tile-name">${t.name}</div>
              <div class="pf-tile-lede">${t.lede}</div>
              <div class="pf-tile-desc">${t.body}</div>
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
