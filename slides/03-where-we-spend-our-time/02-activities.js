'use strict';

SCD.register({
  section: 3,
  title: '03 · Where the work goes',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>What you actually do now</div>
      <div class="activities">
        <div class="activity">
          <div class="num">01</div>
          <div class="body">
            <div class="name"><span class="accent">Architecture</span></div>
            <div class="desc">the shape of the system, not the syntax</div>
          </div>
        </div>
        <div class="activity">
          <div class="num">02</div>
          <div class="body">
            <div class="name"><span class="accent">Quality assurance</span></div>
            <div class="desc">the failure modes you can't see in the diff</div>
          </div>
        </div>
        <div class="activity">
          <div class="num">03</div>
          <div class="body">
            <div class="name"><span class="accent">Operation</span></div>
            <div class="desc">making it run reliably and safely — not just shipping it</div>
          </div>
        </div>
      </div>
    `;
  },
  init(el) {
    const items = el.querySelectorAll('.activity');
    items.forEach((it, i) => setTimeout(() => it.classList.add('in'), 200 + i * 320));
  }
});
