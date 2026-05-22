'use strict';

SCD.register({
  section: 5,
  title: '05 · A few prompts later…',
  render(el) {
    el.innerHTML = `
      <div class="comic-wrap stagger">
        <div class="comic-frame">
          <img src="assets-how-hard.png" alt="How hard can it be? — a few prompts later" />
        </div>
        <div class="comic-caption">— a documentary, <span class="accent">2026</span> —</div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.stagger > *'), 200);
  }
});
