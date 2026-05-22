'use strict';

SCD.register({
  section: 4,
  title: '04 · Old world / new world',
  render(el) {
    el.innerHTML = `
      <div class="compare">
        <div class="compare-col stagger">
          <div class="compare-h old">Old world</div>
          <ul class="compare-list">
            <li>reproducible bugs</li>
            <li>line-by-line debugging</li>
            <li>deterministic outputs</li>
            <li>test = output validation</li>
          </ul>
        </div>
        <div class="compare-divider"></div>
        <div class="compare-col stagger">
          <div class="compare-h new">New world</div>
          <ul class="compare-list new">
            <li>context drift</li>
            <li>hidden hallucinations</li>
            <li>memory poisoning</li>
            <li>test = behavioral evaluation</li>
          </ul>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.compare-col.stagger > *'), 150);
  }
});
