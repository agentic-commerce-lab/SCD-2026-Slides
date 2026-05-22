'use strict';

SCD.register({
  section: 2,
  title: '02 · The compression',
  render(el) {
    el.innerHTML = `
      <div class="hero kinetic" style="max-width:28ch">
        <span class="line">AI compresses</span>
        <span class="line"><span class="accent">implementation cost.</span></span>
        <br>
        <span class="line dim">But amplifies</span>
        <span class="line" style="color:var(--amber)">bad decisions.</span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 450));
  }
});
