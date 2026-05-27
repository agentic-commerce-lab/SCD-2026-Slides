'use strict';

/**
 * Interactive: Venn diagram of Architecture / Quality Assurance / Operation,
 * with YOU in the central overlap. Three circles fade in one at a time
 * (~500ms apart). Then YOU appears at the intersection — the punchline:
 * "you are at the overlap of all three."
 */

function playVenn(el) {
  const cancelled = { v: false };
  const timers = [];

  const circles  = el.querySelectorAll('.venn-circle');
  const sections = el.querySelectorAll('.venn-section');
  const center   = el.querySelector('.venn-center');

  // reset
  circles.forEach(c => c.classList.remove('in'));
  sections.forEach(s => s.classList.remove('in'));
  if (center) center.classList.remove('in');

  // reveal each circle + its label/desc together, 500ms apart
  const ids = ['arch', 'qa', 'op'];
  ids.forEach((id, i) => {
    timers.push(setTimeout(() => {
      if (cancelled.v) return;
      el.querySelector(`.venn-circle.${id}`)?.classList.add('in');
      el.querySelector(`.venn-section.${id}`)?.classList.add('in');
    }, 200 + i * 500));
  });

  // YOU appears after all three are in
  timers.push(setTimeout(() => {
    if (!cancelled.v && center) center.classList.add('in');
  }, 200 + 3 * 500 + 200));

  return () => {
    cancelled.v = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 3,
  title: '03 · Where the work goes',
  render(el) {
    el.innerHTML = `
      <div class="pre-label"><span class="dot"></span>What you actually do now</div>
      <svg class="venn" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet">
        <!-- circles spread slightly to give each unique area enough room for its label -->
        <circle class="venn-circle arch" cx="400" cy="210" r="140"/>
        <circle class="venn-circle qa"   cx="310" cy="360" r="140"/>
        <circle class="venn-circle op"   cx="490" cy="360" r="140"/>

        <!-- ARCHITECTURE — centered in the upper unique area, well above the overlaps -->
        <g class="venn-section arch">
          <text class="venn-label" x="400" y="135" text-anchor="middle">ARCHITECTURE</text>
        </g>

        <!-- QUALITY — centered in the lower-left unique lobe (~midpoint of unique x-range) -->
        <g class="venn-section qa">
          <text class="venn-label" x="270" y="420" text-anchor="middle">QUALITY</text>
        </g>

        <!-- OPERATION — centered in the lower-right unique lobe -->
        <g class="venn-section op">
          <text class="venn-label" x="530" y="420" text-anchor="middle">OPERATION</text>
        </g>

        <!-- YOU at the central overlap of all three -->
        <g class="venn-center">
          <circle class="venn-you-bg" cx="400" cy="310" r="36"/>
          <text class="venn-you" x="400" y="310" text-anchor="middle" dominant-baseline="middle">YOU</text>
        </g>
      </svg>
    `;
  },
  init(el) { return playVenn(el); },
  replay(el) { return playVenn(el); }
});
