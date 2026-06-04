const { chromium } = require('playwright');
const path = require('path');

const presets = [
  'bold-signal', 'electric-studio', 'creative-voltage', 'dark-botanical',
  'notebook-tabs', 'pastel-geometry', 'split-pastel', 'vintage-editorial',
  'neon-cyber', 'terminal-green', 'swiss-modern', 'paper-ink'
];

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const name of presets) {
    const filePath = path.resolve(__dirname, 'presets', name, 'index.html');
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('file://' + filePath, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Take screenshot of the card area (center of viewport)
    const previewPath = path.resolve(__dirname, 'docs', 'previews', name + '.png');
    await page.screenshot({ path: previewPath, clip: { x: 100, y: 30, width: 800, height: 840 } });
    console.log('  Screenshot:', name);
    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
