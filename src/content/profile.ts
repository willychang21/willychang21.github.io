import type { Station } from './types';

export const profile = {
	name: 'Willy Chang',
	role: 'Software engineer',
	employer: 'TikTok',
	base: 'San Jose, California',
	email: 'willysde2025@gmail.com',
	github: { handle: 'willychang21', url: 'https://github.com/willychang21' },
	avatar: { src: '/avatar.jpg', alt: 'Illustrated portrait of Willy in glasses and a black sweater, on a pier with a city skyline behind.' },
	/** The opening statement. */
	statement: 'I build the systems that carry requests where they need to go.',
	lede: 'Software engineer at TikTok, building AOP, the Agent Operation Platform that automates data-privacy requests from around the world. Before that, full-stack products for music co-creation and classroom attendance.'
} as const;

/** The places on the route, in the order they were lived in. */
export const stations: Record<Station['id'], Station> = {
	tpe: { id: 'tpe', code: 'TPE', city: 'Taipei' },
	sea: { id: 'sea', code: 'SEA', city: 'Seattle' },
	cmi: { id: 'cmi', code: 'CMI', city: 'Champaign' },
	sjc: { id: 'sjc', code: 'SJC', city: 'San Jose' }
};

/** When each stop was home, and the entry on the page it links to. */
export const legs: { station: Station['id']; years: string; anchor: string }[] = [
	{ station: 'tpe', years: '2015–2022', anchor: 'degree-fju-bs' },
	{ station: 'sea', years: '2022–2023', anchor: 'experience' },
	{ station: 'cmi', years: '2024', anchor: 'role-uiuc' },
	{ station: 'sjc', years: '2025–now', anchor: 'role-tiktok' }
];
