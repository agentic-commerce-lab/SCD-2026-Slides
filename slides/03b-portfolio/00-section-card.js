'use strict';

/**
 * Section opener for 03b — the portfolio.
 *
 * Sits between section 03 ("Where we spend our time") and section 04
 * ("Debugging quality"). Reuses the existing section-card layout, but
 * tags itself 03b to signal it as an interlude inside section 3 rather
 * than a fresh top-level section.
 */

SCD.register({
  section: 3,
  title: '03b · The portfolio',
  render(el) {
    el.innerHTML = `
      <div class="section-card">
        <div class="sec-frame top"></div>
        <div class="sec-frame bottom"></div>
        <div class="sec-ghost" aria-hidden="true">03<span class="sec-ghost-suffix">b</span></div>
        <div class="sec-content stagger">
          <div class="sec-rule">
            <span class="sec-line"></span>
            <span class="sec-num">03b</span>
            <span class="sec-line"></span>
          </div>
          <div class="sec-title">We <span class="accent">built</span> it.</div>
          <div class="sec-tag">eight projects, four public, four behind the scenes</div>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.sec-content.stagger > *'), 220);
  }
});
