'use strict';

SCD.register({
  section: 4,
  title: '04 · Mitigation patterns',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>So how do you not fall in? · the new rituals</div>
      <div class="activities">
        <div class="activity">
          <div class="num">01</div>
          <div class="body">
            <div class="name"><span class="accent">CLAUDE.md</span> per project</div>
            <div class="desc">short, curated, every line earned by a past mistake — Hashimoto, Böckeler</div>
          </div>
        </div>
        <div class="activity">
          <div class="num">02</div>
          <div class="body">
            <div class="name"><span class="accent">Plan → execute → review the diff</span></div>
            <div class="desc">you write the spec; the agent fills it in; you read the patch — Beck, Anthropic</div>
          </div>
        </div>
        <div class="activity">
          <div class="num">03</div>
          <div class="body">
            <div class="name"><span class="accent">Agents in parallel</span> on git worktrees</div>
            <div class="desc">four or five branches at once — Crawshaw, Hashimoto</div>
          </div>
        </div>
        <div class="activity">
          <div class="num">04</div>
          <div class="body">
            <div class="name"><span class="accent">Harness</span> over hand-correction</div>
            <div class="desc">when the agent makes mistake X, build a lint/hook/test for X — Böckeler</div>
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
