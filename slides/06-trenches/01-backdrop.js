'use strict';

SCD.register({
  section: 6,
  title: '06 · ...',
  render(el) {
    el.innerHTML = `
      <div class="backdrop-prompt">
        <span class="accent">~/stefan</span> $ <span class="caret"></span>
      </div>
    `;
  }
});
