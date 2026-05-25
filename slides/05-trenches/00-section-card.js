'use strict';

SCD.register({
  section: 5,
  title: '05 · Stories from the trenches',
  render(el) {
    el.innerHTML = `
      <div class="section-card stagger">
        <div class="sec-rule">
          <span class="sec-line"></span>
          <span class="sec-num">05</span>
          <span class="sec-line"></span>
        </div>
        <div class="sec-title">Stories from <span class="accent">the trenches</span></div>
        <div class="sec-tag">over to Stefan</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.section-card.stagger > *'), 220);
  }
});
