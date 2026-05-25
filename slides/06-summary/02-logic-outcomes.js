'use strict';

SCD.register({
  section: 6,
  title: '06 · Shift 2',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Shift 2 · the work</div>
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
