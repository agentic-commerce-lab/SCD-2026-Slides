'use strict';

SCD.register({
  section: 5,
  title: '05 · Stories from the trenches',
  render(el) {
    el.innerHTML = `
      <div class="section-card">
        <div class="sec-frame top"></div>
        <div class="sec-frame bottom"></div>
        <div class="sec-ghost" aria-hidden="true">05</div>
        <div class="sec-content stagger">
          <div class="sec-rule">
            <span class="sec-line"></span>
            <span class="sec-num">05</span>
            <span class="sec-line"></span>
          </div>
          <div class="sec-title">Stories from <span class="accent">the trenches</span></div>
          <div class="sec-tag">over to Stefan</div>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.sec-content.stagger > *'), 220);
  }
});
