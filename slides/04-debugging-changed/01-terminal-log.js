'use strict';

/**
 * Interactive: terminal log that streams success lines, drifts to amber
 * ("confidence: 87%"), then a human realization in red.
 */

function playTerminalLog(el) {
  const body = el.querySelector('#termBody');
  body.innerHTML = '';
  let cancelled = false;
  const timers = [];

  const lines = [
    { lvl: 'INFO', src: 'agent.run',         msg: 'task=deploy_to_staging start' },
    { lvl: 'INFO', src: 'tool.git.status',   msg: 'OK (12ms) — clean tree' },
    { lvl: 'INFO', src: 'tool.docker.build', msg: 'OK (4.2s) — image sha=a3f8d2e' },
    { lvl: 'INFO', src: 'tool.k8s.apply',    msg: 'OK (1.1s) — 3 pods updated' },
    { lvl: 'INFO', src: 'agent.observe',     msg: 'all health checks green' },
    { lvl: 'INFO', src: 'agent.run',         msg: 'task=deploy_to_staging complete ✓' },
    { lvl: 'INFO', src: 'agent.run',         msg: 'task=write_release_notes start' },
    { lvl: 'INFO', src: 'tool.search',       msg: 'OK (240ms) — 12 commits found' },
    { lvl: 'INFO', src: 'agent.synthesize',  msg: 'drafting notes (4096 tok)' },
    { lvl: 'WARN', src: 'agent.observe',     msg: 'no test failures observed — confidence: 87%' },
    { lvl: 'INFO', src: 'agent.run',         msg: 'task=announce_to_team start' },
    { lvl: 'WARN', src: 'tool.slack.post',   msg: 'OK — message sent to #engineering' },
  ];

  const renderLine = (line, delay) => {
    timers.push(setTimeout(() => {
      if (cancelled) return;
      const ts = new Date(Date.now() - (12 - timers.length) * 1700);
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

  // human realization in amber
  timers.push(setTimeout(() => {
    if (cancelled) return;
    const node = document.createElement('span');
    node.className = 'log-line human';
    node.innerHTML = `<br>// wait. did we test this?`;
    body.appendChild(node);
    requestAnimationFrame(() => {
      node.style.transition = 'opacity 600ms ease-out';
      node.style.opacity = '1';
    });
  }, 200 + lines.length * 280 + 1200));

  // final red
  timers.push(setTimeout(() => {
    if (cancelled) return;
    const node = document.createElement('span');
    node.className = 'log-line error';
    node.innerHTML = `<span class="ts">··:··:··</span><span class="lvl">ERROR</span>[<span class="src">human.realization</span>] no integration test exists for this path<span class="caret" style="margin-left:0.3em"></span>`;
    body.appendChild(node);
    requestAnimationFrame(() => {
      node.style.transition = 'opacity 400ms ease-out';
      node.style.opacity = '1';
    });
  }, 200 + lines.length * 280 + 2400));

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 4,
  title: '04 · When the agent lies',
  render(el) {
    el.innerHTML = `
      <div class="terminal">
        <div class="terminal-head">
          <span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>
          <span class="ttitle">daniel@laptop ~/agent — deploy.run()</span>
        </div>
        <div class="terminal-body" id="termBody"></div>
      </div>
    `;
  },
  init(el) { return playTerminalLog(el); },
  replay(el) { return playTerminalLog(el); }
});
