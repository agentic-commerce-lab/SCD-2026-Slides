'use strict';

/**
 * Interactive: two columns ("Cheap now" / "Expensive now") fill with words.
 * Cheap column fills first (top-to-bottom, each item with a delay), then the
 * expensive column fills. Only the final landing column gets a caret.
 */

function playTokenStream(el) {
  const cheap = ['writing code', 'boilerplate', 'refactoring', 'prototyping', 'framework knowledge', 'scaffolding', 'syntax recall'];
  const expensive = ['problem understanding', 'clarity', 'prioritization', 'architecture', 'trade-offs', 'quality', 'decision making', 'systems thinking'];

  const cheapEl = el.querySelector('#cheap');
  const expEl = el.querySelector('#exp');
  cheapEl.innerHTML = '';
  expEl.innerHTML = '';

  // column-by-column: all of cheap first, then all of expensive
  const queue = [];
  cheap.forEach(word => queue.push({ container: cheapEl, word }));
  expensive.forEach(word => queue.push({ container: expEl, word }));

  const style = document.createElement('style');
  style.textContent = `.stream-text .item { transition: opacity 200ms ease-out; }`;
  el.appendChild(style);

  let idx = 0;
  let cancelled = false;
  const timers = [];

  function nextOne() {
    if (cancelled) return;
    if (idx >= queue.length) {
      // landed on expensive — attach caret there
      const c = document.createElement('span');
      c.className = 'caret';
      expEl.appendChild(c);
      return;
    }
    const { container, word } = queue[idx++];
    const item = document.createElement('span');
    item.className = 'item';
    item.textContent = word;
    container.appendChild(item);
    requestAnimationFrame(() => item.style.opacity = '1');
    const delay = 320 + Math.random() * 280;
    timers.push(setTimeout(nextOne, delay));
  }

  timers.push(setTimeout(nextOne, 400));

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 2,
  title: '02 · The shift',
  render(el) {
    el.innerHTML = `
      <div class="split">
        <div class="split-col">
          <div class="split-label cheap"><span class="dot"></span>Cheap now</div>
          <div class="stream-text" id="cheap"></div>
        </div>
        <div class="split-divider"></div>
        <div class="split-col">
          <div class="split-label expensive"><span class="dot"></span>Expensive now</div>
          <div class="stream-text" id="exp"></div>
        </div>
      </div>
    `;
  },
  init(el) { return playTokenStream(el); },
  replay(el) { return playTokenStream(el); }
});
