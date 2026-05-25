'use strict';

SCD.register({
  section: 1,
  title: '01 · Intro',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>The question we keep avoiding</div>
      <div class="single">Why<span style="color:var(--accent)">?</span><span class="caret"></span></div>
    `;
  }
});
