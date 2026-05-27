#!/usr/bin/env node
/**
 * Render the deck headless and snapshot one or more slides.
 *
 * Usage:
 *   node tools/snap.js <slideIdx> [<slideIdx> ...]
 *   node tools/snap.js 9               # snapshot slide 9
 *   node tools/snap.js 9 10 11         # multiple
 *   node tools/snap.js all             # every slide
 *
 * Output: tools/snapshots/slide-NN.png at 1600×900 @2x.
 *
 * Notes:
 *   - Loads index.html via file://
 *   - Navigates by setting location.hash, waits ~5s for animations.
 *   - For multi-step slides, auto-advances to the final step before capture.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const OUT  = path.join(__dirname, 'snapshots');
const URL  = 'file://' + path.join(ROOT, 'index.html');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('usage: node tools/snap.js <slideIdx> [<slideIdx> ...] | all');
  process.exit(2);
}

fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });

  // ignore animation-related errors that may bubble from third-party CDN
  page.on('pageerror', e => console.warn('pageerror:', e.message));

  await page.goto(URL + '#0', { waitUntil: 'domcontentloaded' });
  // wait for all slides to register
  await page.waitForFunction(() => window.SCD && window.SCD.slides && window.SCD.slides.length > 0);
  const total = await page.evaluate(() => window.SCD.slides.length);

  let indices;
  if (args[0] === 'all') {
    indices = Array.from({ length: total }, (_, i) => i);
  } else {
    indices = args.map(a => parseInt(a, 10)).filter(n => Number.isInteger(n) && n >= 0 && n < total);
  }

  for (const idx of indices) {
    // navigate via hash
    await page.evaluate((i) => { location.hash = '#' + i; }, idx);
    // small settle so go() runs
    await new Promise(r => setTimeout(r, 200));

    // if multi-step, advance to final step
    const steps = await page.evaluate((i) => window.SCD.slides[i]?.steps || 1, idx);
    for (let s = 1; s < steps; s++) {
      await page.keyboard.press('ArrowRight');
      await new Promise(r => setTimeout(r, 150));
    }

    // let animations play out (some reveals fire as late as 5.4s)
    await new Promise(r => setTimeout(r, 6500));

    const fileName = `slide-${String(idx).padStart(2, '0')}.png`;
    const outPath = path.join(OUT, fileName);
    await page.screenshot({ path: outPath });
    console.log('  saved', path.relative(ROOT, outPath));
  }

  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
