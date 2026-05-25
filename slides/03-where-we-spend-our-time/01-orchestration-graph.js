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
  const intervals = [];

  // fade-in nodes + edges
  nodesG.querySelectorAll('g').forEach((n, i) => {
    n.style.opacity = '0';
    n.style.transition = 'opacity 500ms ease-out';
    setTimeout(() => { if (!cancelled) n.style.opacity = '1'; }, 200 + i * 120);
  });
  edgesG.querySelectorAll('line').forEach((e, i) => {
    e.style.opacity = '0';
    e.style.transition = 'opacity 700ms ease-out';
    setTimeout(() => { if (!cancelled) e.style.opacity = '1'; }, 600 + i * 80);
  });

  // particles flow inward (satellite → YOU) — the engineer pulls signals in
  let pulseIdx = 0;
  const pulse = () => {
    if (cancelled) return;
    const s = satellites[pulseIdx % satellites.length];
    const nodeG = nodesG.querySelector(`[data-id="${s.id}"]`);
    const circle = nodeG?.querySelector('.node-circle');
    if (circle) {
      circle.classList.add('active');
      setTimeout(() => circle.classList.remove('active'), 700);
    }
    const p = positions[s.id];
    SCD.emitParticle(particlesG, p.x, p.y, 0, 0, 1100);
    pulseIdx++;
  };
  const startT = setTimeout(() => {
    pulse();
    intervals.push(setInterval(pulse, 900));
  }, 1400);
  intervals.push(startT);

  return () => {
    cancelled = true;
    intervals.forEach(clearTimeout);
    intervals.forEach(clearInterval);
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
        <div class="graph-caption">The engineer orchestrates <span style="color:var(--accent)">goals · context · memory · tools · constraints</span></div>
      </div>
    `;
  },
  init(el) { return playOrchestrationGraph(el); },
  replay(el) { return playOrchestrationGraph(el); }
});
