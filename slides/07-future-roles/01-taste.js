'use strict';

SCD.register({
  section: 7,
  title: '07 · The differentiator',
  render(el) {
    el.innerHTML = `
      <div class="hero kinetic" style="max-width:26ch">
        <span class="line"><span class="accent">Taste</span> and <span class="accent">judgment</span></span>
        <br>
        <span class="line">become differentiators.<span class="caret"></span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 600));
  }
});
