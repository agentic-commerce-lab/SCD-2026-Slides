'use strict';

SCD.register({
  section: 6,
  title: '06 · Summary',
  render(el) {
    el.innerHTML = `
      <div class="section-card stagger">
        <div class="sec-rule">
          <span class="sec-line"></span>
          <span class="sec-num">06</span>
          <span class="sec-line"></span>
        </div>
        <div class="sec-title">So <span class="accent">what</span> is this?</div>
        <div class="sec-tag">three shifts in one sentence each</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.section-card.stagger > *'), 220);
  }
});
