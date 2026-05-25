'use strict';

SCD.register({
  section: 5,
  title: '05 · ...',
  render(el) {
    el.innerHTML = `
      <div class="backdrop-prompt">
        <span class="accent">~/stefan</span> $ <span class="caret"></span>
      </div>
    `;
  }
});
