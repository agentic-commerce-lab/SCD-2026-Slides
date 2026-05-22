'use strict';

SCD.register({
  section: 2,
  title: '02 · What actually changed',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Section 02</div>
      <div class="hero kinetic">
        <span class="line">What got <span class="accent">cheap.</span></span>
        <br>
        <span class="line">What got <span style="color:var(--amber)">expensive.</span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 900));
  }
});
