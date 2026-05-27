'use strict';

SCD.register({
  section: 6,
  title: '06 · Summary',
  render(el) {
    el.innerHTML = `
      <div class="section-card">
        <div class="sec-frame top"></div>
        <div class="sec-frame bottom"></div>
        <div class="sec-ghost" aria-hidden="true">06</div>
        <div class="sec-content stagger">
          <div class="sec-rule">
            <span class="sec-line"></span>
            <span class="sec-num">06</span>
            <span class="sec-line"></span>
          </div>
          <div class="sec-title">So <span class="accent">what</span> is this?</div>
          <div class="sec-tag">three shifts in one sentence each</div>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.sec-content.stagger > *'), 220);
  }
});
