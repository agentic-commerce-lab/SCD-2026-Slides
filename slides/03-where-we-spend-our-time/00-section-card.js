'use strict';

SCD.register({
  section: 3,
  title: '03 · Where we spend our time',
  render(el) {
    el.innerHTML = `
      <div class="section-card">
        <div class="sec-frame top"></div>
        <div class="sec-frame bottom"></div>
        <div class="sec-ghost" aria-hidden="true">03</div>
        <div class="sec-content stagger">
          <div class="sec-rule">
            <span class="sec-line"></span>
            <span class="sec-num">03</span>
            <span class="sec-line"></span>
          </div>
          <div class="sec-title">Where we <span class="accent">spend</span> our time</div>
          <div class="sec-tag">if code is cheap, what are we actually doing?</div>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.sec-content.stagger > *'), 220);
  }
});
