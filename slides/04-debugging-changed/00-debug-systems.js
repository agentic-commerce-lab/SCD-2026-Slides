'use strict';

SCD.register({
  section: 4,
  title: '04 · Debugging changed',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Section 04</div>
      <div class="hero kinetic">
        <span class="line">You no longer debug <span class="dim">lines.</span></span>
        <br>
        <span class="line"><span class="accent">You debug systems.</span><span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 700));
  }
});
