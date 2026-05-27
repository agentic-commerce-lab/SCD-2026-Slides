'use strict';

/**
 * Interactive: the Böckeler quote made literal. A scatter chart where the
 * SAME model output gets called "intelligence" above the line and
 * "hallucination" below — and the engineering work happens entirely in the
 * fuzzy error band along the diagonal.
 *
 * Reveal sequence: axes → scattered dots → diagonal → error band →
 * INTELLIGENCE region → HALLUCINATIONS region → "where we live" callout.
 */

function playHallucinationChart(el) {
  const chart = el.querySelector('.hallu-chart');
  if (!chart) return () => {};

  let cancelled = false;
  const timers = [];

  const revealAll = (selector, delay) => {
    timers.push(setTimeout(() => {
      if (cancelled) return;
      el.querySelectorAll(selector).forEach(n => n.classList.add('in'));
    }, delay));
  };

  const staggerEach = (selector, baseDelay, step) => {
    el.querySelectorAll(selector).forEach((n, i) => {
      timers.push(setTimeout(() => {
        if (!cancelled) n.classList.add('in');
      }, baseDelay + i * step));
    });
  };

  // animate the error band as a funnel: narrow at the diagonal's start
  // (low inventiveness = clear boundary), wide at the end (high
  // inventiveness = fuzzy boundary).
  const expandBand = (delay, duration = 1000, finalStart = 3, finalEnd = 55) => {
    timers.push(setTimeout(() => {
      if (cancelled) return;
      const band = el.querySelector('.hc-band');
      if (!band) return;
      band.classList.add('in');
      const start = performance.now();
      const step = (now) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const ws = finalStart * eased;
        const we = finalEnd * eased;
        band.setAttribute('points',
          `60,${420 - ws} 680,${75 - we} 680,${75 + we} 60,${420 + ws}`);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay));
  };

  // 1. axes + axis labels
  revealAll('.hc-axis, .hc-axis-label', 200);

  // 2. scatter dots — stagger them
  staggerEach('.hc-dot', 700, 70);

  // 3. diagonal line draws
  revealAll('.hc-diagonal', 1900);

  // 4. INTELLIGENCE region (fill + label)
  revealAll('.hc-region-fill.intel, .hc-region-label.intel', 2800);

  // 5. HALLUCINATIONS region (fill + label)
  revealAll('.hc-region-fill.hallu, .hc-region-label.hallu', 3300);

  // 6. error band — the fuzzy zone (expands outward from the diagonal)
  expandBand(4100);

  // 7. "where we live" callout
  revealAll('.hc-callout', 4800);

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 4,
  title: '04 · Intelligence vs. Hallucination',
  render(el) {
    el.innerHTML = `
      <div class="hallu-wrap">
        <div class="hallu-quote">
          "Hallucinations are the <span class="accent">core feature</span> of LLMs.
          We just call it <span class="accent">'intelligence'</span> when it's <span class="amber">useful</span> to us."
          <span class="hallu-attrib">(— Birgitta Böckeler, Thoughtworks, 2025)</span>
        </div>

        <svg class="hallu-chart hallu-pending" viewBox="0 0 720 470" preserveAspectRatio="xMidYMid meet">
          <!-- region fills (whole triangles tinted; under everything else) -->
          <polygon class="hc-region-fill intel" points="60,420 680,75 680,30 60,30"/>
          <polygon class="hc-region-fill hallu" points="60,420 680,420 680,75"/>

          <!-- axes -->
          <line class="hc-axis" x1="60" y1="420" x2="680" y2="420"/>
          <line class="hc-axis" x1="60" y1="420" x2="60" y2="30"/>

          <!-- axis labels -->
          <text class="hc-axis-label" x="680" y="445" text-anchor="end">inventive  →</text>
          <text class="hc-axis-label" x="50" y="30" text-anchor="end" transform="rotate(-90 50 30)">useful  ↑</text>

          <!-- error band — starts collapsed on the diagonal; JS expands it -->
          <polygon class="hc-band" points="60,420 680,75 680,75 60,420"/>

          <!-- diagonal -->
          <line class="hc-diagonal" x1="60" y1="420" x2="680" y2="75"/>

          <!-- scatter dots — above diagonal (intelligence). Spread across the upper triangle. -->
          <circle class="hc-dot above" cx="130" cy="70"  r="5"/>
          <circle class="hc-dot above" cx="175" cy="250" r="5"/>
          <circle class="hc-dot above" cx="240" cy="195" r="5"/>
          <circle class="hc-dot above" cx="290" cy="140" r="5"/>
          <circle class="hc-dot above" cx="350" cy="200" r="5"/>
          <circle class="hc-dot above" cx="430" cy="130" r="5"/>
          <circle class="hc-dot above" cx="490" cy="85"  r="5"/>
          <circle class="hc-dot above" cx="560" cy="100" r="5"/>
          <circle class="hc-dot above" cx="620" cy="55"  r="5"/>

          <!-- scatter dots — near diagonal (the error band, where we live) -->
          <circle class="hc-dot mid" cx="170" cy="360" r="5"/>
          <circle class="hc-dot mid" cx="260" cy="305" r="5"/>
          <circle class="hc-dot mid" cx="390" cy="235" r="5"/>
          <circle class="hc-dot mid" cx="530" cy="155" r="5"/>

          <!-- scatter dots — below diagonal (hallucinations). Spread across the lower triangle. -->
          <circle class="hc-dot below" cx="140" cy="405" r="5"/>
          <circle class="hc-dot below" cx="200" cy="395" r="5"/>
          <circle class="hc-dot below" cx="280" cy="385" r="5"/>
          <circle class="hc-dot below" cx="340" cy="410" r="5"/>
          <circle class="hc-dot below" cx="400" cy="320" r="5"/>
          <circle class="hc-dot below" cx="480" cy="320" r="5"/>
          <circle class="hc-dot below" cx="620" cy="395" r="5"/>
          <circle class="hc-dot below" cx="650" cy="340" r="5"/>

          <!-- region labels (text only; the whole triangle is the region) -->
          <text class="hc-region-label intel" x="340" y="95">INTELLIGENCE</text>
          <text class="hc-region-label hallu" x="500" y="355">HALLUCINATIONS</text>

          <!-- "where we live" callout — pill with green dashed border to
               match the funnel; line connects it back to the band -->
          <g class="hc-callout">
            <line class="hc-callout-line" x1="500" y1="318" x2="405" y2="245"/>
            <circle class="hc-callout-pin" cx="405" cy="245" r="4"/>
            <rect class="hc-callout-bg" x="500" y="300" width="185" height="38" rx="19"/>
            <text class="hc-callout-text" x="592" y="324" text-anchor="middle">↗ where we live</text>
          </g>
        </svg>

      </div>
    `;
  },
  // step 0 = quote only; step 1 = reveal chart + run animations
  steps: 2,
  init(el) { /* step 0: only the quote is visible; nothing to animate */ },
  step(el, n) {
    if (n === 1) {
      const chart = el.querySelector('.hallu-chart');
      chart?.classList.remove('hallu-pending');
      return playHallucinationChart(el);
    }
  },
  replay(el) {
    // replaying a quote-only step is a no-op; replay the chart animation
    const chart = el.querySelector('.hallu-chart');
    if (chart) chart.classList.remove('hallu-pending');
    return playHallucinationChart(el);
  }
});
