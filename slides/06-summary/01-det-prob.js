'use strict';

SCD.register({
  section: 6,
  title: '06 · Shift 1',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Shift 1 · the systems</div>
      <div class="hero kinetic">
        <span class="line dim">From</span>
        <span class="line">deterministic programming</span>
        <br>
        <span class="line dim">to</span>
        <span class="line"><span class="accent">probabilistic orchestration.</span><span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 500));
  }
});
