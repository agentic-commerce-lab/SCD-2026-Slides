'use strict';

/**
 * Interactive: `whoami` cycles through identities, ends on the shrug.
 * The joke: am I a senior engineer, an architect, a QA, a PM, or ¯\\_(ツ)_/¯?
 */

function playWhoami(el) {
  const out = el.querySelector('#whoami-out');
  if (!out) return () => {};
  out.innerHTML = '';

  const identities = [
    'senior_engineer',
    'architect',
    'qa_engineer',
    'product_manager',
    'context_curator',
    'agent_orchestrator',
    '¯\\_(ツ)_/¯',
  ];

  let cancelled = false;
  const timers = [];

  const show = (text, delay, isFinal) => {
    timers.push(setTimeout(() => {
      if (cancelled) return;
      out.innerHTML = '';
      const span = document.createElement('span');
      span.className = isFinal ? 'wm-id final' : 'wm-id';
      span.textContent = text;
      out.appendChild(span);
      if (isFinal) {
        const c = document.createElement('span');
        c.className = 'caret';
        out.appendChild(c);
      }
      // small fade-in
      span.style.opacity = '0';
      span.style.transition = 'opacity 180ms ease-out';
      requestAnimationFrame(() => { span.style.opacity = '1'; });
    }, delay));
  };

  // initial prompt typed already — start cycling — ~2s per identity
  let t = 700; // initial pause after prompt
  identities.forEach((id, i) => {
    const isFinal = i === identities.length - 1;
    show(id, t, isFinal);
    t += isFinal ? 0 : 2000;
  });

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 3,
  title: '03 · whoami',
  render(el) {
    el.innerHTML = `
      <div class="whoami">
        <div class="wm-prompt">
          <span class="wm-path accent">~/keynote</span>
          <span class="wm-sigil">$</span>
          <span class="wm-cmd">whoami</span>
        </div>
        <div class="wm-out" id="whoami-out"></div>
      </div>
    `;
  },
  init(el) { return playWhoami(el); },
  replay(el) { return playWhoami(el); }
});
