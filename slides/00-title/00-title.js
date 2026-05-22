'use strict';

SCD.register({
  section: 0,
  title: 'Title',
  render(el) {
    el.innerHTML = `
      <div class="pre-label blue"><span class="dot"></span>SCD · 2026 · Keynote</div>
      <div class="title-stack stagger">
        <div class="hero-xl">
          <div class="line1">A Reality Check</div>
          <div class="line2">on AI-Driven</div>
          <div class="line3">Software Engineering</div>
        </div>
        <div class="underline"></div>
        <div class="sub">
          <strong>Daniel Nögel</strong>&nbsp;&nbsp;·&nbsp;&nbsp;<strong>Stefan Hamann</strong>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.stagger > *'), 200);
  }
});
