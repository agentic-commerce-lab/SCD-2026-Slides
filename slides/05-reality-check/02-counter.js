'use strict';

/**
 * Interactive: two big counters. "Lines generated" tickers fast, "Bugs
 * introduced" tickers slow. After a beat, a footnote fades in:
 * "decisions deferred to future-you: ∞".
 */

function playCounter(el) {
  const linesEl = el.querySelector('#cnt-lines');
  const bugsEl = el.querySelector('#cnt-bugs');
  const footEl = el.querySelector('#cnt-foot');
  let lines = 0, bugs = 0;
  let cancelled = false;
  const fmt = n => n.toLocaleString('en-US');

  linesEl.textContent = '0';
  bugsEl.textContent = '0';
  footEl.classList.remove('visible');

  const linesIv = setInterval(() => {
    if (cancelled) return;
    lines += 30 + Math.floor(Math.random() * 90);
    linesEl.textContent = fmt(lines);
  }, 60);

  const bugsIv = setInterval(() => {
    if (cancelled) return;
    bugs += 1;
    bugsEl.textContent = fmt(bugs);
  }, 600);

  const footT = setTimeout(() => {
    if (!cancelled) footEl.classList.add('visible');
  }, 3500);

  return () => {
    cancelled = true;
    clearInterval(linesIv);
    clearInterval(bugsIv);
    clearTimeout(footT);
  };
}

SCD.register({
  section: 5,
  title: '05 · Receipts',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Live · this session</div>
      <div class="counter-wrap">
        <div class="counter-block">
          <div class="counter-label green"><span class="dot"></span>Lines generated</div>
          <div class="counter-num green" id="cnt-lines">0</div>
        </div>
        <div class="counter-block">
          <div class="counter-label amber"><span class="dot"></span>Bugs introduced</div>
          <div class="counter-num amber" id="cnt-bugs">0</div>
        </div>
      </div>
      <div class="counter-foot" id="cnt-foot">
        decisions deferred to future-you:&nbsp;<span class="inf">∞</span>
      </div>
    `;
  },
  init(el) { return playCounter(el); },
  replay(el) { return playCounter(el); }
});
