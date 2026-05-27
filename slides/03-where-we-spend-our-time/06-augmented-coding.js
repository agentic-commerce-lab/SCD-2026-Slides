'use strict';

SCD.register({
  section: 3,
  title: '03 · Vibe vs. Augmented',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>The choice you're making</div>
      <div class="choice-quote stagger">
        <div class="choice-col vibe">
          <div class="choice-label vibe">In vibe coding</div>
          <div class="choice-body">you don't care about the code,<br>just the behavior of the system.</div>
        </div>
        <div class="choice-divider"></div>
        <div class="choice-col aug">
          <div class="choice-label aug">In augmented coding</div>
          <div class="choice-body">you care about the code,<br>its complexity, the tests,<br>&amp; their coverage.</div>
        </div>
      </div>
      <div class="citation" id="cit">
        <span class="name">Kent Beck, 2025</span>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.choice-quote.stagger > *'), 380, 300);
    setTimeout(() => el.querySelector('#cit')?.classList.add('in'), 1800);
  }
});
