'use strict';

SCD.register({
  section: 6,
  title: '06 · The scarce resource',
  render(el) {
    el.innerHTML = `
      <div class="hero kinetic" style="max-width:28ch">
        <span class="line dim">The scarce resource</span>
        <span class="line dim">is no longer code production.</span>
        <br>
        <span class="line">It's <span class="accent">clarity.</span></span>
        <span class="line">And <span class="accent">good judgment.</span><span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 550));
  }
});
