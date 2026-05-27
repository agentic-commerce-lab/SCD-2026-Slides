'use strict';

SCD.register({
  section: 3,
  title: '03 · Where the value sits',
  render(el) {
    el.innerHTML = `
      <div class="hero kinetic" style="max-width:30ch">
        <span class="line">Senior engineers become</span>
        <span class="line"><span class="accent">more valuable,</span></span>
        <span class="line">not less.<span class="caret"></span></span>
      </div>
      <div class="sub stagger" style="margin-top:3.5rem">
        <div>architecture&nbsp;&nbsp;·&nbsp;&nbsp;trade-offs&nbsp;&nbsp;·&nbsp;&nbsp;<strong>taste</strong>&nbsp;&nbsp;·&nbsp;&nbsp;scope&nbsp;&nbsp;·&nbsp;&nbsp;product thinking&nbsp;&nbsp;·&nbsp;&nbsp;quality</div>
      </div>
      <div class="citation" id="cit">
        "More consequential decisions per hour. Yak shaving mostly goes away."
        <span class="name">Kent Beck<span class="role"> · 2025</span></span>
      </div>
    `;
  },
  init(el) {
    const lines = el.querySelectorAll('.kinetic .line');
    lines.forEach((l, i) => setTimeout(() => l.classList.add('in'), 200 + i * 450));
    SCD.staggerIn(el.querySelectorAll('.stagger > *'), 1800);
    setTimeout(() => el.querySelector('#cit')?.classList.add('in'), 2600);
  }
});
