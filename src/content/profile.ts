import type { Station } from './types';

export const profile = {
	name: 'Willy Chang',
	employer: 'TikTok',
	base: 'San Jose, California',
	email: 'willysde2025@gmail.com',
	github: { handle: 'willychang21', url: 'https://github.com/willychang21' },
	avatar: { src: '/avatar.jpg', alt: 'Illustrated portrait of Willy in glasses and a black sweater, on a pier with a city skyline behind.' },
	/** The opening statement, read after the name: "Willy Chang builds…". */
	statement: 'builds the systems that carry requests where they need to go.',
	lede: 'Software engineer at TikTok, building AOP, the Agent Operation Platform that automates data-privacy requests from around the world. Before that, full-stack products for music co-creation and classroom attendance.'
} as const;

/** The places on the route, in the order they were lived in. */
export const stations: Record<Station['id'], Station> = {
	tpe: { id: 'tpe', code: 'TPE', city: 'Taipei' },
	sea: { id: 'sea', code: 'SEA', city: 'Seattle' },
	cmi: { id: 'cmi', code: 'CMI', city: 'Champaign' },
	sjc: { id: 'sjc', code: 'SJC', city: 'San Jose' }
};

/**
 * When each stop was home. What happened there is not listed here: it comes from the
 * records that name the station (see content/route.ts). `note` speaks for a stop that
 * has no record on the page.
 */
export const legs: { station: Station['id']; years: string; note?: string }[] = [
	{ station: 'tpe', years: '2015–2022' },
	{ station: 'sea', years: '2022–2023', note: 'First stop in the United States.' },
	{ station: 'cmi', years: '2024' },
	{ station: 'sjc', years: '2025–now' }
];
