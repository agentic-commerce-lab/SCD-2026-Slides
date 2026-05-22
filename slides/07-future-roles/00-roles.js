'use strict';

SCD.register({
  section: 7,
  title: '07 · Future of teams & roles',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Section 07 · Emerging roles</div>
      <div class="roles-wrap">
        <div class="role"><span class="num">01</span>Builders</div>
        <div class="role"><span class="num">02</span>Product Minds</div>
        <div class="role"><span class="num">03</span>Trust Engineers</div>
        <div class="role"><span class="num">04</span>AI Workflow Engineers</div>
        <div class="role"><span class="num">05</span><span class="accent">Agent Orchestrators</span></div>
      </div>
    `;
  },
  init(el) {
    const roles = el.querySelectorAll('.role');
    roles.forEach((r, i) => setTimeout(() => r.classList.add('in'), 250 + i * 220));
  }
});
