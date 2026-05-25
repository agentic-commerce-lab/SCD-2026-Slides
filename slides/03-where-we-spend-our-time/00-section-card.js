'use strict';

SCD.register({
  section: 3,
  title: '03 · Where we spend our time',
  render(el) {
    el.innerHTML = `
      <div class="section-card stagger">
        <div class="sec-rule">
          <span class="sec-line"></span>
          <span class="sec-num">03</span>
          <span class="sec-line"></span>
        </div>
        <div class="sec-title">Where we <span class="accent">spend</span> our time</div>
        <div class="sec-tag">if code is cheap, what are we actually doing?</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.section-card.stagger > *'), 220);
  }
});
