'use strict';

SCD.register({
  section: 5,
  title: '05 · Reality check',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Section 05 · The cost we don't talk about</div>
      <div class="hero-xl kinetic">
        <span class="line">AI makes</span>
        <span class="line"><span class="accent">bad ideas</span></span>
        <span class="line">cheaper.<span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 450));
  }
});
