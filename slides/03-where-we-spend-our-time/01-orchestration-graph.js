'use strict';

/**
 * Interactive: SVG hex graph with YOU at center, orchestrating
 * Goal · Context · Memory · Tools · Constraints · Output.
 * Pulses + particles flowing inward toward the engineer.
 */

function playOrchestrationGraph(el) {
  const nodesG = el.querySelector('#nodes');
  const edgesG = el.querySelector('#edges');
  const particlesG = el.querySelector('#particles');
  if (!nodesG) return () => {};
  nodesG.innerHTML = '';
  edgesG.innerHTML = '';
  particlesG.innerHTML = '';

  const satellites = [
    { id: 'goal',     label: 'Goal',        angle: -90 },
    { id: 'context',  label: 'Context',     angle: -30 },
    { id: 'memory',   label: 'Memory',      angle:  30 },
    { id: 'output',   label: 'Output',      angle:  90 },
    { id: 'constr',   label: 'Constraints', angle: 150 },
    { id: 'tools',    label: 'Tools',       angle: -150 },
  ];
  const R = 150;
  const nodeR = 40;

  const positions = { you: { x: 0, y: 0 } };
  satellites.forEach(s => {
    const rad = s.angle * Math.PI / 180;
    positions[s.id] = { x: Math.cos(rad) * R, y: Math.sin(rad) * R };
  });

  // edges
  satellites.forEach(s => {
    const p = positions[s.id];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'edge');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', p.x);
    line.setAttribute('y2', p.y);
    edgesG.appendChild(line);
  });

  // satellites
  satellites.forEach(s => {
    const p = positions[s.id];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${p.x}, ${p.y})`);
    g.setAttribute('data-id', s.id);

    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('class', 'node-circle');
    c.setAttribute('r', nodeR);
    g.appendChild(c);

    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('class', 'node-label');
    t.textContent = s.label;
    g.appendChild(t);

    nodesG.appendChild(g);
  });

  // center: YOU
  {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('class', 'node-circle center');
    c.setAttribute('r', 52);
    g.appendChild(c);
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('class', 'node-label center');
    t.textContent = 'YOU';
    g.appendChild(t);
    nodesG.appendChild(g);
  }

  let cancelled = false;
  const timers = [];

  // hide everything initially
  nodesG.querySelectorAll('g').forEach(n => {
    n.style.opacity = '0';
    n.style.transition = 'opacity 500ms ease-out';
  });
  edgesG.querySelectorAll('line').forEach(e => {
    e.style.opacity = '0';
    e.style.transition = 'opacity 500ms ease-out';
  });

  // YOU appears first at the center
  const youNode = nodesG.querySelector('g:not([data-id])');
  timers.push(setTimeout(() => {
    if (!cancelled && youNode) youNode.style.opacity = '1';
  }, 200));

  // satellites + their edges reveal one at a time, 500ms apart
  const edges = edgesG.querySelectorAll('line');
  satellites.forEach((s, i) => {
    const delay = 800 + i * 500;
    const node = nodesG.querySelector(`[data-id="${s.id}"]`);
    const edge = edges[i];
    timers.push(setTimeout(() => {
      if (cancelled) return;
      if (edge) edge.style.opacity = '1';
      if (node) node.style.opacity = '1';
    }, delay));
  });

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 3,
  title: '03 · The engineer orchestrates',
  render(el) {
    el.innerHTML = `
      <div class="graph-wrap">
        <svg class="graph-svg" viewBox="-200 -200 400 400">
          <g class="edges" id="edges"></g>
          <g class="particles" id="particles"></g>
          <g class="nodes" id="nodes"></g>
        </svg>
      </div>
      <div class="citation" id="cit">
        "An agent is a for-loop containing an LLM call." <span class="name">David Crawshaw<span class="role"> · Tailscale · 2025</span></span>
      </div>
    `;
  },
  init(el) {
    const cleanup = playOrchestrationGraph(el);
    // citation appears after the last satellite has revealed (~3.8s)
    setTimeout(() => el.querySelector('#cit')?.classList.add('in'), 3800);
    return cleanup;
  },
  replay(el) { return playOrchestrationGraph(el); }
});
