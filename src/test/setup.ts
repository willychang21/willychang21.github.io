import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => cleanup());

// jsdom lacks these browser APIs; the app treats them as optional, but Motion and the
// section tracker look for them.
class NoopObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
}
vi.stubGlobal('IntersectionObserver', NoopObserver);
vi.stubGlobal('ResizeObserver', NoopObserver);

/** Tests can flip media queries with setMediaQueries({ '(min-width: 64rem)': true }). */
const matches = new Map<string, boolean>();
export function setMediaQueries(values: Record<string, boolean>) {
	matches.clear();
	for (const [query, value] of Object.entries(values)) matches.set(query, value);
}
afterEach(() => matches.clear());

vi.stubGlobal('matchMedia', (query: string) => ({
	matches: matches.get(query) ?? false,
	media: query,
	onchange: null,
	addEventListener: () => {},
	removeEventListener: () => {},
	addListener: () => {},
	removeListener: () => {},
	dispatchEvent: () => false
}));

// jsdom has <dialog> but not its modal methods. This stub only toggles `open`; the real
// focus trapping and Escape handling are checked in a browser.
if (!HTMLDialogElement.prototype.showModal) {
	HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
		this.open = true;
	};
	HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
		this.open = false;
	};
}

// jsdom has no layout, so no scrolling; tests spy on this to check where the page goes.
if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = function () {};
