'use strict';

/**
 * Interactive: terminal log streams a successful-looking deploy. The agent
 * confidently announces "0 tests failed" and ships to Slack. Then a human
 * realizes: 0/0 — there are no tests. The hallucination is the missing
 * question, not a wrong fact.
 */

function playTerminalLog(el) {
  const body = el.querySelector('#termBody');
  body.innerHTML = '';
  let cancelled = false;
  const timers = [];

  const lines = [
    { lvl: 'INFO', src: 'agent.run',       msg: 'task=ship_feature_x start' },
    { lvl: 'INFO', src: 'tool.git.commit', msg: 'OK — 14 files changed, 312 insertions' },
    { lvl: 'INFO', src: 'tool.docker',     msg: 'OK — build succeeded (sha=a3f8d2e)' },
    { lvl: 'INFO', src: 'agent.observe',   msg: 'no errors detected' },
    { lvl: 'INFO', src: 'tool.k8s',        msg: 'OK — deployed to staging' },
    { lvl: 'INFO', src: 'agent.test',      msg: 'OK — 0 / 0 tests failed' },
    { lvl: 'INFO', src: 'agent.run',       msg: 'task=ship_feature_x complete ✓' },
    { lvl: 'INFO', src: 'agent.run',       msg: 'task=announce_release start' },
    { lvl: 'WARN', src: 'tool.slack',      msg: 'OK — posted to #engineering "🚀 feature X is live"' },
  ];

  const renderLine = (line, delay) => {
    timers.push(setTimeout(() => {
      if (cancelled) return;
      const ts = new Date(Date.now() - (lines.length - timers.length) * 1700);
      const tstr = ts.toISOString().slice(11, 19);
      const node = document.createElement('span');
      node.className = `log-line ${line.lvl.toLowerCase()}`;
      node.innerHTML = `<span class="ts">${tstr}</span><span class="lvl">${line.lvl}</span>[<span class="src">${line.src}</span>] ${line.msg}`;
      body.appendChild(node);
      requestAnimationFrame(() => {
        node.style.transition = 'opacity 250ms ease-out';
        node.style.opacity = '1';
      });
    }, delay));
  };

  lines.forEach((l, i) => renderLine(l, 200 + i * 280));

  // long pause… then human realization in amber
  timers.push(setTimeout(() => {
    if (cancelled) return;
    const node = document.createElement('span');
    node.className = 'log-line human';
    node.innerHTML = `<br>// wait — "0 / 0 tests failed" because 0 tests exist.`;
    body.appendChild(node);
    requestAnimationFrame(() => {
      node.style.transition = 'opacity 600ms ease-out';
      node.style.opacity = '1';
    });
  }, 200 + lines.length * 280 + 1400));

  // final red — the hallucination revealed
  timers.push(setTimeout(() => {
    if (cancelled) return;
    const node = document.createElement('span');
    node.className = 'log-line error';
    node.innerHTML = `<span class="ts">··:··:··</span><span class="lvl">ERROR</span>[<span class="src">coverage</span>] no tests for src/feature_x/ — agent never wrote any<span class="caret" style="margin-left:0.3em"></span>`;
    body.appendChild(node);
    requestAnimationFrame(() => {
      node.style.transition = 'opacity 400ms ease-out';
      node.style.opacity = '1';
    });
  }, 200 + lines.length * 280 + 2700));

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 4,
  title: '04 · When the agent confidently lies',
  render(el) {
    el.innerHTML = `
      <div class="terminal">
        <div class="terminal-head">
          <span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>
          <span class="ttitle">daniel@laptop ~/agent — agent.ship_feature_x()</span>
        </div>
        <div class="terminal-body" id="termBody"></div>
      </div>
    `;
  },
  init(el) { return playTerminalLog(el); },
  replay(el) { return playTerminalLog(el); }
});
