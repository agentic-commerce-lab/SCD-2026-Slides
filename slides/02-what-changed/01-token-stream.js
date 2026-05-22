'use strict';

/**
 * Interactive: two columns ("Cheap now" / "Expensive now") fill with words
 * at LLM-style jittered pacing. Only the right column gets a trailing caret.
 */

function playTokenStream(el) {
  const cheap = ['writing code', 'boilerplate', 'refactoring', 'prototyping', 'framework knowledge', 'scaffolding', 'syntax recall'];
  const expensive = ['problem understanding', 'clarity', 'prioritization', 'architecture', 'trade-offs', 'quality', 'decision making', 'systems thinking'];

  const cheapEl = el.querySelector('#cheap');
  const expEl = el.querySelector('#exp');
  cheapEl.innerHTML = '';
  expEl.innerHTML = '';

  const timers = [];
  let cancelled = false;

  function typeInto(container, words, baseDelay, showCaret) {
    let i = 0;
    function next() {
      if (cancelled || i >= words.length) {
        if (!cancelled && showCaret) {
          const c = document.createElement('span');
          c.className = 'caret';
          container.appendChild(c);
        }
        return;
      }
      const word = words[i++];
      const line = document.createElement('span');
      line.className = 'item';
      line.textContent = word;
      container.appendChild(line);
      requestAnimationFrame(() => line.style.opacity = '1');
      const delay = 220 + Math.random() * 380;
      timers.push(setTimeout(next, delay));
    }
    timers.push(setTimeout(next, baseDelay));
  }

  const style = document.createElement('style');
  style.textContent = `.stream-text .item { transition: opacity 200ms ease-out; }`;
  el.appendChild(style);

  typeInto(cheapEl, cheap, 400, false);
  typeInto(expEl, expensive, 800, true);

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
