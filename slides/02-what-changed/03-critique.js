'use strict';

SCD.register({
  section: 2,
  title: '02 · What you\'ve probably heard',
  render(el) {
    el.innerHTML = `
      <div class="critique stagger">
        <div class="pre-label"><span class="dot" style="background:var(--amber)"></span>What you've probably heard</div>

        <div class="critique-claims">
          <div class="claim">
            <div class="claim-stat">−19%</div>
            <div class="claim-body">
              <div class="claim-text">Developers are <strong>slower</strong> with AI.</div>
              <div class="claim-cite">METR · July 2025</div>
            </div>
          </div>
          <div class="claim">
            <div class="claim-stat">54%</div>
            <div class="claim-body">
              <div class="claim-text">of leaders plan to <strong>hire fewer juniors</strong>.</div>
              <div class="claim-cite">LeadDev · 2025</div>
            </div>
          </div>
        </div>

        <div class="critique-rebuttal">
          <div class="rebuttal-title">We don't buy either.<span class="caret"></span></div>
          <ul class="rebuttal-list">
            <li>METR studied <strong>16 engineers</strong> on codebases they'd maintained for years — not the modal engineer on real product work.</li>
            <li>Junior hiring was already falling <strong>before GPT-4</strong> — post-ZIRP correction, offshoring, FAANG layoffs. AI didn't cause this; AI was blamed for it.</li>
          </ul>
          <div class="rebuttal-pivot">
            → What actually convinced us: <span class="accent">how practitioners describe the new shape of the work.</span>
          </div>
        </div>
      </div>
    `;
  },
  init(el) {
    SCD.staggerIn(el.querySelectorAll('.critique.stagger > *'), 280);
  }
});
