'use strict';

/**
 * Interactive: closing QR + thank you. URL comes from SCD.CLOSING_URL.
 * If the qrcode CDN didn't load, the fallback shows the URL as text.
 */

function renderQR(el) {
  const frame = el.querySelector('#qrFrame');
  if (!frame) return;
  if (typeof qrcode !== 'function') return; // CDN failed — fallback stays
  try {
    const qr = qrcode(0, 'M');
    qr.addData(SCD.CLOSING_URL);
    qr.make();
    const svg = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    const themed = svg
      .replace(/fill="black"/g, 'fill="#E6E6E6"')
      .replace(/fill="white"/g, 'fill="#0d0d0d"')
      .replace(/<svg /, '<svg style="width:240px;height:240px;display:block;" ');
    frame.innerHTML = themed;
  } catch (e) {
    console.warn('QR render failed', e);
  }
}

SCD.register({
  section: 6,
  title: '06 · Thank you',
  render(el) {
    el.innerHTML = `
      <div class="closing-wrap stagger">
        <div class="pre-label blue"><span class="dot"></span>Continue the conversation</div>
        <div class="qr-frame" id="qrFrame">
          <div class="qr-fallback">${SCD.CLOSING_URL}</div>
        </div>
        <div class="thanks">Thank you.</div>
        <div class="thanks-underline"></div>
        <div class="thanks-names">
          <strong>Daniel Nögel</strong>&nbsp;&nbsp;·&nbsp;&nbsp;<strong>Stefan Hamann</strong>
        </div>
        <div class="thanks-url"><span class="accent-blue">→</span>&nbsp;&nbsp;${SCD.CLOSING_URL}</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.stagger > *'), 180);
    renderQR(el);
  }
});
