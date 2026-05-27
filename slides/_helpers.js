"use strict";

/**
 * SCD — shared registry and utilities used by every slide file.
 *
 * Each slide file calls SCD.register({...}) on load. The engine in index.html
 * iterates SCD.slides in registration order.
 */

window.SCD = window.SCD || {};
SCD.slides = SCD.slides || [];

SCD.register = function (slide) {
  SCD.slides.push(slide);
};

// ---- shared config ----
SCD.CLOSING_URL = "https://agentic-commerce-lab.ai/";

// ---- session start: the moment the deck first loaded in this tab ----
// Persisted in sessionStorage so reloads (and deeplinks) keep the same anchor.
// New tab / window = new session.
SCD.sessionStartMs = function () {
  const key = "scd.sessionStart";
  let ts = null;
  try {
    ts = sessionStorage.getItem(key);
  } catch (e) {}
  if (!ts) {
    ts = String(Date.now());
    try {
      sessionStorage.setItem(key, ts);
    } catch (e) {}
  }
  return parseInt(ts, 10);
};

// elapsed seconds since session start
SCD.sessionElapsedSec = function () {
  return Math.max(0, (Date.now() - SCD.sessionStartMs()) / 1000);
};

// "MM:SS" or "H:MM:SS" formatting of session elapsed
SCD.sessionElapsedClock = function () {
  const s = Math.floor(SCD.sessionElapsedSec());
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
};

// ---- shared utilities ----

// Fade-in nodes one after another by adding `.in` class. Used with `.stagger` CSS.
SCD.staggerIn = function (nodes, step = 200, initial = 100) {
  nodes.forEach((n, i) => {
    setTimeout(() => n.classList.add("in"), initial + i * step);
  });
};

// Emit a single SVG particle traveling from (x1,y1) to (x2,y2) over `duration` ms.
// Used by the agent graph.
SCD.emitParticle = function (parent, x1, y1, x2, y2, duration) {
  const NS = "http://www.w3.org/2000/svg";
  const c = document.createElementNS(NS, "circle");
  c.setAttribute("class", "particle");
  c.setAttribute("r", 3.5);
  c.setAttribute("cx", x1);
  c.setAttribute("cy", y1);
  parent.appendChild(c);
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = t * t * (3 - 2 * t);
    const x = x1 + (x2 - x1) * eased;
    const y = y1 + (y2 - y1) * eased;
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("opacity", 1 - t * 0.3);
    if (t < 1) requestAnimationFrame(step);
    else c.remove();
  }
  requestAnimationFrame(step);
};
