'use strict';

SCD.register({
  section: 6,
  title: '06 · Stories from the trenches',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Section 06</div>
      <div class="hero kinetic">
        <span class="line">Stories from</span>
        <span class="line"><span class="accent">the trenches.</span></span>
        <br>
        <span class="line dim">→ over to Stefan<span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 550));
  }
});
