import { expect, test, type Page } from '@playwright/test';

// Layout and interaction checks that need a real browser: real layout, real <dialog>,
// real fonts and media queries. Unit tests cover data and component logic.

const widths = [320, 390, 768, 1024, 1280, 1440, 1920];

/** Fails the test on console errors and failed same-origin requests. */
function watch(page: Page) {
	const problems: string[] = [];
	page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
	page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
	page.on('response', (r) => {
		if (r.url().startsWith('http://localhost') && r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
	});
	page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`));
	return problems;
}

type Box = { left: number; right: number; top: number; bottom: number };
const intersects = (a: Box, b: Box, gap = 0) =>
	!(a.right + gap <= b.left || a.left - gap >= b.right || a.bottom <= b.top || a.top >= b.bottom);

test.describe('layout', () => {
	for (const scheme of ['light', 'dark'] as const) {
		test(`no horizontal overflow, errors or missing files (${scheme})`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			const problems = watch(page);
			for (const width of widths) {
				await page.setViewportSize({ width, height: 900 });
				await page.goto('/', { waitUntil: 'networkidle' });
				const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
				expect(overflow, `horizontal overflow at ${width}px`).toBe(0);
			}
			expect(problems).toEqual([]);
		});
	}

	test('the opening statement stays clear of the route, its stations and labels', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		for (const width of [1024, 1180, 1280, 1440, 1920]) {
			await page.setViewportSize({ width, height: 900 });
			await page.goto('/');
			await page.evaluate(() => document.fonts.ready);
			const clash = await page.evaluate(() => {
				const range = document.createRange();
				range.selectNodeContents(document.getElementById('statement')!);
				const lines = [...range.getClientRects()];
				const inLine = (x: number, y: number) => lines.some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
				const svg = document.querySelector<SVGSVGElement>('#top svg')!;
				const ctm = svg.getScreenCTM()!;
				for (const path of svg.querySelectorAll<SVGPathElement>('path[class*="route"]')) {
					const length = path.getTotalLength();
					for (let i = 0; i <= 200; i++) {
						const at = path.getPointAtLength((length * i) / 200);
						const p = new DOMPoint(at.x, at.y).matrixTransform(ctm);
						if (inLine(p.x, p.y)) return 'route';
					}
				}
				const boxes = [...svg.querySelectorAll('circle'), ...document.querySelectorAll('[data-station]')].map((e) => e.getBoundingClientRect());
				const hits = boxes.filter((b) => lines.some((r) => !(b.right <= r.left || b.left >= r.right || b.bottom <= r.top || b.top >= r.bottom)));
				return hits.length ? 'station' : null;
			});
			expect(clash, `statement overlaps the ${clash} at ${width}px`).toBeNull();
		}
	});

	test('system diagram labels never collide on phones', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		for (const width of [320, 390]) {
			await page.setViewportSize({ width, height: 844 });
			await page.goto('/');
			await page.evaluate(() => document.fonts.ready);
			const ids = await page.locator('[id^="tab-"]').evaluateAll((els) => els.map((e) => e.id.slice(4)));
			for (const id of ['featured', ...ids]) {
				if (id !== 'featured') await page.click(`#tab-${id}`);
				const figure =
					id === 'featured' ? page.locator('article[aria-labelledby="featured-title"] figure') : page.locator(`#project-${id} figure:has(svg)`);
				const labels = await figure.locator('li').evaluateAll((els) => els.map((e) => ({ text: e.textContent, box: e.getBoundingClientRect().toJSON() })));
				for (let i = 0; i < labels.length; i++)
					for (let j = i + 1; j < labels.length; j++)
						expect(intersects(labels[i]!.box, labels[j]!.box, 4), `${id} at ${width}px: ${labels[i]!.text} × ${labels[j]!.text}`).toBe(false);
				if (id !== 'featured') await page.click(`#tab-${id}`);
			}
		}
	});
});

test.describe('the route', () => {
	const ahead = (page: Page) =>
		page.evaluate(() => ({
			legs: document.querySelectorAll('#top svg g[data-ahead]:has(> path)').length,
			stations: document.querySelectorAll('#top svg g[data-ahead]:has(> circle)').length
		}));

	for (const width of [1440, 390]) {
		test(`each station shows what happened there, and the route beyond it fades (${width}px)`, async ({ page }) => {
			await page.setViewportSize({ width, height: 900 });
			await page.goto('/');
			const stops = page.getByRole('tablist', { name: 'Stops on the route' });
			// Now is chosen first, with the whole route travelled.
			await expect(stops.getByRole('tab', { selected: true })).toHaveText(/SJC/);
			await expect(page.getByRole('tabpanel', { name: /SJC/ }).getByRole('link', { name: /AOP/ })).toBeVisible();
			expect(await ahead(page)).toEqual({ legs: 0, stations: 0 });

			await stops.getByRole('tab', { name: /CMI/ }).click();
			const panel = page.getByRole('tabpanel', { name: /CMI/ });
			await expect(panel).toBeVisible();
			await expect(panel.getByRole('link')).toHaveText([/Kocree/, /University of Illinois/, /Master of Computer Science/, /Here @ UIUC/, /Muosaic/, /Hybrid in-memory/]);
			// Only one panel is on offer at a time, to people and to assistive technology.
			await expect(page.locator('#top').getByRole('tabpanel')).toHaveCount(1);
			expect(await ahead(page)).toEqual({ legs: 1, stations: 1 });

			await stops.getByRole('tab', { name: /TPE/ }).click();
			expect(await ahead(page)).toEqual({ legs: 3, stations: 3 });
			// Choosing a stop is exploring, not navigating: the URL stays as it was.
			await expect(page).toHaveURL(/\/$/);
		});
	}

	test('the stations work from the keyboard and stop at the ends of the route', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');
		await page.getByRole('tab', { name: /SJC/ }).focus();
		await page.keyboard.press('ArrowRight');
		await expect(page.getByRole('tab', { name: /SJC/ })).toBeFocused();
		await page.keyboard.press('ArrowLeft');
		await expect(page.getByRole('tab', { name: /CMI/ })).toBeFocused();
		await expect(page.getByRole('tab', { name: /CMI/ })).toHaveAttribute('aria-selected', 'true');
		await page.keyboard.press('Home');
		await expect(page.getByRole('tab', { name: /TPE/ })).toHaveAttribute('aria-selected', 'true');
		await page.keyboard.press('ArrowLeft');
		await expect(page.getByRole('tab', { name: /TPE/ })).toBeFocused();
		// Tab leaves the stations for the open stop's first link.
		await page.keyboard.press('Tab');
		await expect(page.getByRole('tabpanel', { name: /TPE/ }).getByRole('link').first()).toBeFocused();
	});

	test('choosing a stop never moves the stations under the pointer', async ({ page }) => {
		for (const width of [1280, 390]) {
			await page.setViewportSize({ width, height: 900 });
			await page.goto('/');
			const places = () => page.locator('[data-station]').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON()));
			const before = await places();
			for (const code of ['TPE', 'SEA', 'CMI', 'SJC']) {
				await page.getByRole('tab', { name: new RegExp(code) }).click();
				expect(await places(), `${code} at ${width}px`).toEqual(before);
			}
		}
	});

	test('a station code in the record opens its stop on the map, and Back returns to the record', async ({ page }) => {
		// Instant scrolling: this is about history, and Chrome lets a smooth scroll still in
		// flight override the position Back restores.
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');
		const code = page.locator('#role-kocree').getByRole('link', { name: 'CMI, Champaign: show on the map' });
		await code.scrollIntoViewIfNeeded();
		await code.click();
		await expect(page.getByRole('tab', { name: /CMI/ })).toHaveAttribute('aria-selected', 'true');
		await expect(page.getByRole('tab', { name: /CMI/ })).toBeFocused();
		await expect(page.getByRole('tabpanel', { name: /CMI/ })).toBeInViewport();
		await page.goBack();
		await expect(page.locator('#role-kocree')).toBeInViewport();
	});

	test('a stop links straight to a project, which opens in the index', async ({ page }) => {
		for (const width of [1440, 390]) {
			await page.setViewportSize({ width, height: 900 });
			await page.goto('/');
			await page.getByRole('tab', { name: /CMI/ }).click();
			await page.getByRole('tabpanel', { name: /CMI/ }).getByRole('link', { name: /Muosaic/ }).click();
			await expect(page).toHaveURL(/#project-muosaic$/);
			await expect(page.locator('#tab-muosaic')).toBeInViewport();
			await expect(page.locator('#project-muosaic')).toBeVisible();
		}
	});

	test('a link to a stop opens it on load; a bad one leaves San Jose chosen', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/#stop-tpe');
		await expect(page.getByRole('tab', { name: /TPE/ })).toHaveAttribute('aria-selected', 'true');
		await expect(page.getByRole('tabpanel', { name: /TPE/ })).toContainText('Fu Jen Catholic University');
		await page.goto('about:blank');
		await page.goto('/#stop-nowhere');
		await expect(page.getByRole('tab', { name: /SJC/ })).toHaveAttribute('aria-selected', 'true');
	});
});

test.describe('project index, desktop', () => {
	test.use({ viewport: { width: 1440, height: 900 } });

	const markerOffset = (page: Page) =>
		page.evaluate(() => {
			const tab = document.querySelector('[aria-label=Projects] [role=tab][aria-selected=true]')!.getBoundingClientRect();
			const marker = document.querySelector('[aria-label=Projects] > span')!.getBoundingClientRect();
			return { top: Math.round(marker.top - tab.top), height: Math.round(marker.height - tab.height) };
		});

	test('tabs select on click and keys, keep the URL in step, and keep the marker on the row', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('tab', { name: 'Muosaic' }).click();
		await expect(page.getByRole('tab', { name: 'Muosaic' })).toHaveAttribute('aria-selected', 'true');
		await expect(page).toHaveURL(/#project-muosaic$/);
		await page.keyboard.press('ArrowDown');
		await expect(page.getByRole('tab', { name: /Hybrid in-memory/ })).toBeFocused();
		await expect(page).toHaveURL(/#project-orchestrator$/);
		// The marker slides to the row (a short transition), then sits exactly on it.
		await expect.poll(() => markerOffset(page)).toEqual({ top: 0, height: 0 });

		// A narrower window rewraps the rows; the marker must follow.
		await page.setViewportSize({ width: 1100, height: 900 });
		await expect.poll(() => markerOffset(page)).toEqual({ top: 0, height: 0 });
	});

	test('hovering the index does not change the project', async ({ page }) => {
		await page.goto('/');
		const index = page.getByRole('tablist', { name: 'Projects' });
		for (const tab of await index.getByRole('tab').all()) await tab.hover();
		await expect(index.getByRole('tab').first()).toHaveAttribute('aria-selected', 'true');
	});

	test('switching from deep in a long project brings the new one into view', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/#project-muosaic');
		await page.evaluate(() => {
			const r = document.getElementById('project-muosaic')!.getBoundingClientRect();
			scrollTo(0, scrollY + r.bottom - innerHeight + 40);
		});
		await page.getByRole('tab', { name: /Hybrid in-memory/ }).click();
		await expect
			.poll(() => page.evaluate(() => Math.round(document.getElementById('project-orchestrator')!.getBoundingClientRect().top)))
			.toBeGreaterThanOrEqual(56);
	});
});

test.describe('deep links', () => {
	test('open the named project on desktop and on phones', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/#project-messenger');
		await expect(page.getByRole('tab', { name: 'Realtime chat for iOS' })).toHaveAttribute('aria-selected', 'true');
		await expect(page.getByRole('tab', { name: 'Realtime chat for iOS' })).toBeInViewport();

		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/#project-ar-navigation');
		await expect(page.getByRole('button', { name: 'Augmented-reality navigation' })).toHaveAttribute('aria-expanded', 'true');
	});

	test('a malformed or unknown fragment leaves the page working', async ({ page }) => {
		const problems = watch(page);
		await page.setViewportSize({ width: 390, height: 844 });
		for (const hash of ['#project-%E0%A4%A', '#project-nope', '#project-']) {
			await page.goto(`/${hash}`);
			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			for (const row of await page.locator('[aria-expanded]').filter({ has: page.locator('[id^="title-"]') }).all())
				await expect(row).toHaveAttribute('aria-expanded', 'false');
		}
		expect(problems).toEqual([]);
	});

	test('closing the open project on a phone clears the link', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/#project-here');
		await page.getByRole('button', { name: 'Here @ UIUC' }).click();
		await expect(page).toHaveURL(/\/$/);
	});
});

test.describe('mobile navigation', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	// A modal <dialog> makes the rest of the page inert rather than cycling focus: after the
	// last link, Tab moves to the browser's own UI (activeElement is <body>), never to page
	// content behind the sheet. That is what this checks.
	test('the index sheet keeps focus off the page behind it, closes on Escape and gives focus back', async ({ page }) => {
		await page.goto('/');
		const index = page.getByRole('button', { name: 'Index' });
		await index.click();
		const sheet = page.getByRole('dialog', { name: 'Sections' });
		await expect(sheet).toBeVisible();
		// showModal() focuses the sheet's first control, its Close button.
		await expect(sheet.getByRole('button', { name: 'Close' })).toBeFocused();
		for (let i = 0; i < 10; i++) {
			await page.keyboard.press('Tab');
			const where = await sheet.evaluate((d) => (d.contains(document.activeElement) ? 'sheet' : document.activeElement === document.body ? 'browser' : document.activeElement!.outerHTML.slice(0, 60)));
			expect(['sheet', 'browser'], `focus escaped to ${where}`).toContain(where);
		}
		await page.keyboard.press('Escape');
		await expect(sheet).toBeHidden();
		await expect(index).toBeFocused();
	});

	test('a section link closes the sheet and goes to the section', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Index' }).click();
		await page.getByRole('dialog').getByRole('link', { name: 'Toolkit' }).click();
		await expect(page.getByRole('dialog')).toBeHidden();
		await expect(page).toHaveURL(/#toolkit$/);
		await expect(page.locator('#toolkit-title')).toBeInViewport();
		// The theme toggle beside it still works afterwards.
		await page.getByRole('button', { name: /Switch to (dark|light) theme/ }).click();
	});
});

test.describe('preferences', () => {
	test('the theme choice survives a reload', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/');
		await page.getByRole('button', { name: 'Switch to dark theme' }).click();
		await page.reload();
		await expect(page.locator('html')).toHaveClass(/dark/);
		await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();
	});

	test('reduced motion shows the route drawn and runs no animations', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');
		const state = await page.evaluate(() => ({
			dashed: [...document.querySelectorAll('#top path[class*="route"]')].filter((p) => p.getAttribute('stroke-dasharray')).length,
			running: document.getAnimations().filter((a) => a.playState === 'running' && Number(a.effect?.getTiming().duration) > 10).length
		}));
		expect(state).toEqual({ dashed: 0, running: 0 });
	});
});

test('the 404 page renders and links home', async ({ page }) => {
	const problems = watch(page);
	await page.goto('/404.html');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('This stop isn’t on the map.');
	await expect(page.getByRole('link', { name: 'Back to the start' })).toHaveAttribute('href', '/');
	expect(problems).toEqual([]);
});
