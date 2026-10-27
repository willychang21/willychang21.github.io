// Renders public/og.png (1200 × 630), the social card, from the built site's opening plate.
// Run against a preview server: `bun run build && bun run preview`, then
// `node scripts/render-og.mjs [url]`. Needs Playwright with Chromium installed.
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');

const url = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1,
	reducedMotion: 'reduce',
	colorScheme: 'light'
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate('document.fonts.ready'); // evaluated in the page
// Just the plate and the statement: no header, caption or contact row.
await page.addStyleTag({
	content: `header, figcaption, #top .grid, main > section:not(#top) { display: none !important; }
	#top { min-height: 630px; display: grid; align-content: center; padding: 0 !important; }`
});
await page.screenshot({ path: new URL('../public/og.png', import.meta.url).pathname });
await browser.close();
