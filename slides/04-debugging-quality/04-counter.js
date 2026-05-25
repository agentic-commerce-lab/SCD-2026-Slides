'use strict';

/**
 * Interactive: two big counters. Pretends to have been ticking since the
 * talk started — backfills counts based on session elapsed time, then
 * keeps ticking live. After a beat, a footnote fades in:
 * "decisions deferred to future-you: ∞".
 */

// Tick rates also used for backfilling, so the live ticking matches.
const LINES_PER_SEC = 1250;  // matches +75 avg every 60ms
const BUGS_PER_SEC  = 1.667; // matches +1 every 600ms

function playCounter(el) {
  const linesEl = el.querySelector('#cnt-lines');
  const bugsEl  = el.querySelector('#cnt-bugs');
  const footEl  = el.querySelector('#cnt-foot');
  const clockEl = el.querySelector('#cnt-clock');

  // backfill from session start so the counter looks like it's been running
  const elapsed = SCD.sessionElapsedSec();
  let lines = Math.floor(elapsed * LINES_PER_SEC + Math.random() * 500);
  let bugs  = Math.floor(elapsed * BUGS_PER_SEC  + Math.random() * 3);

  let cancelled = false;
  const fmt = n => n.toLocaleString('en-US');

  linesEl.textContent = fmt(lines);
  bugsEl.textContent  = fmt(bugs);
  footEl.classList.remove('visible');

  // update the "running NN:NN" clock every second
  const updateClock = () => {
    if (clockEl) clockEl.textContent = SCD.sessionElapsedClock();
  };
  updateClock();
  const clockIv = setInterval(() => { if (!cancelled) updateClock(); }, 1000);

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
    clearInterval(clockIv);
    clearTimeout(footT);
  };
}

SCD.register({
  section: 4,
  title: '04 · The receipts',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>Live · since the talk started · <span id="cnt-clock" class="accent">00:00</span></div>
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
