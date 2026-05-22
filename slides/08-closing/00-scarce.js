'use strict';

SCD.register({
  section: 8,
  title: '08 · Closing',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Section 08 · Closing</div>
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
