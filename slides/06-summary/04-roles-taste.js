'use strict';

SCD.register({
  section: 6,
  title: '06 · whoami, five years from now',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>whoami&nbsp;&nbsp;·&nbsp;&nbsp;five years from now</div>
      <div class="roles-wrap">
        <div class="role"><span class="num">01</span>Builder</div>
        <div class="role"><span class="num">02</span>Product Thinker</div>
        <div class="role"><span class="num">03</span>Trust Engineer</div>
        <div class="role"><span class="num">04</span>Operator</div>
        <div class="role"><span class="num">05</span><span class="accent">Orchestrator</span></div>
      </div>
      <div class="sub stagger" style="margin-top:3rem; max-width:46ch; text-align:center">
        <div>Not a title. <span class="accent">All of them, every day.</span></div>
        <div style="margin-top:0.6rem; color:var(--dim)">What stitches them together: <strong>taste</strong> and <strong>judgment</strong>.</div>
      </div>
    `;
  },
  init(el) {
    const roles = el.querySelectorAll('.role');
    roles.forEach((r, i) => setTimeout(() => r.classList.add('in'), 250 + i * 220));
    SCD.staggerIn(el.querySelectorAll('.stagger > *'), 1800);
  }
});
