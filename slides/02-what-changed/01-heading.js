'use strict';

SCD.register({
  section: 2,
  title: '02 · What got cheap / expensive',
  render(el) {
    el.innerHTML = `
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
