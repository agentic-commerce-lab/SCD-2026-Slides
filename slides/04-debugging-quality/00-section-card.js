'use strict';

SCD.register({
  section: 4,
  title: '04 · Debugging & Quality',
  render(el) {
    el.innerHTML = `
      <div class="section-card stagger">
        <div class="sec-rule">
          <span class="sec-line"></span>
          <span class="sec-num">04</span>
          <span class="sec-line"></span>
        </div>
        <div class="sec-title"><span class="accent">Debugging</span> &amp; Quality</div>
        <div class="sec-tag">when the agent confidently lies</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.section-card.stagger > *'), 220);
  }
});
