'use strict';

/**
 * Interactive: a meme. Left = the chat (user asks for an AI chatbot;
 * the agent confidently ships a "production-ready" one — built with
 * the same LLM the agent itself uses). Right = what the agent actually
 * did: test API key, old model pinned, a system prompt telling the
 * model to make things up, no rate limiting, PII in console.log.
 *
 * The meta-irony is the point: the agent confidently ships AI features
 * that wouldn't survive contact with real users or a CFO.
 *
 * Chat bubbles appear 1000ms apart. Right pane reveals 2s after the
 * last bubble.
 */

function playProductionReady(el) {
  const chat = el.querySelector('#chat');
  const codePane = el.querySelector('#code');
  if (!chat) return () => {};
  chat.innerHTML = '';
  if (codePane) codePane.classList.remove('in');

  let cancelled = false;
  const timers = [];

  const addBubble = (cls, msg, delay) => {
    timers.push(setTimeout(() => {
      if (cancelled) return;
      const bubble = document.createElement('div');
      bubble.className = `bubble ${cls}`;
      bubble.innerHTML = `<div class="msg">${msg}</div>`;
      chat.appendChild(bubble);
      requestAnimationFrame(() => bubble.classList.add('in'));
    }, delay));
  };

  // chat sequence — 1000ms apart
  addBubble('user',      'add an AI chatbot to our shop\'s help page',                                                              400);
  addBubble('agent dim', '<em>thinking…</em>',                                                                                     1400);
  addBubble('agent dim', '<em>working…</em>',                                                                                      2400);
  addBubble('agent',     '<span class="check">✓</span> I added a <strong>production-ready</strong> AI chatbot, fully integrated.', 3400);

  // right pane reveals 2s after the last bubble
  if (codePane) {
    timers.push(setTimeout(() => {
      if (!cancelled) codePane.classList.add('in');
    }, 5400));
  }

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

SCD.register({
  section: 4,
  title: '04 · "Production-ready"',
  render(el) {
    el.innerHTML = `
      <div class="meme-split">
        <div class="meme-col chat-pane">
          <div class="meme-head"><span class="dot"></span>The chat</div>
          <div class="chat-stream" id="chat"></div>
        </div>
        <div class="meme-col code-pane" id="code">
          <div class="meme-head"><span class="dot amber"></span>What the agent did</div>
<pre class="code-block">// src/chatbot/handler.ts
const API_KEY = process.env.ANTHROPIC_API_KEY ?? <span class="str">"sk-ant-test-3f7a..."</span>
const MODEL = <span class="str">"claude-sonnet-4-1"</span>   <span class="com">// pinned during dev</span>
const SYSTEM_PROMPT = <span class="str">"You are a shopping assistant. DEMO MODE — make up answers if unsure."</span>

export async function chat(req) {
  const { message } = await req.json()
  console.log(<span class="str">"[chat] user:"</span>, message)
  <span class="com">// TODO: add rate limiting before shipping</span>
  const reply = await anthropic.messages.create({
    apiKey: API_KEY,
    model: MODEL,
    system: SYSTEM_PROMPT,
    messages: [{ role: <span class="str">"user"</span>, content: message }],
  })
  return Response.json({ reply: reply.content[0].text })
}</pre>
        </div>
      </div>
    `;
  },
  init(el) { return playProductionReady(el); },
  replay(el) { return playProductionReady(el); }
});
