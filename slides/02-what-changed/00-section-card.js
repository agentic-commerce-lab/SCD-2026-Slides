'use strict';

SCD.register({
  section: 2,
  title: '02 · What Changed',
  render(el) {
    el.innerHTML = `
      <div class="section-card stagger">
        <div class="sec-rule">
          <span class="sec-line"></span>
          <span class="sec-num">02</span>
          <span class="sec-line"></span>
        </div>
        <div class="sec-title">What <span class="accent">Changed</span></div>
        <div class="sec-tag">what got cheap, what got expensive</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.section-card.stagger > *'), 220);
  }
});
