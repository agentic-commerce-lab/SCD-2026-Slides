'use strict';

SCD.register({
  section: 3,
  title: '03 · The shift',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>The engineer's job, restated</div>
      <div class="shift-line stagger">
        <span class="shift-from">implementing logic</span>
        <span class="shift-arrow">→</span>
        <span class="shift-to">orchestrating outcomes<span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.stagger > *'), 400);
  }
});
