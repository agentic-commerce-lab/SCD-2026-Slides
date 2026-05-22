'use strict';

SCD.register({
  section: 1,
  title: '01 · Cold Open',
  render(el) {
    el.innerHTML = `
      <div class="hero kinetic">
        <span class="line dim">2026 is <span class="dim">not</span> the year</span>
        <span class="line dim">AI replaced developers.</span>
        <br><br>
        <span class="line">It's the year we realized</span>
        <span class="line"><span class="accent">code was never</span></span>
        <span class="line"><span class="accent">the real bottleneck.</span><span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    const delays = [200, 700, 1800, 2200, 2700];
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), delays[i] || (200 + i * 500)));
  }
});
