import { degrees, roles } from './experience';
import { legs, stations } from './profile';
import type { Project, Station } from './types';
import { featured, projects } from './work';

/** Something on the page that happened at a stop, and where on the page it lives. */
export interface StopRecord {
	kind: 'Role' | 'Degree' | 'Project';
	title: string;
	/** A project's headline figure, when it has one. */
	figure?: string;
	detail: string;
	href: string;
}

export interface Stop {
	station: Station;
	years: string;
	note?: string;
	records: StopRecord[];
}

/**
 * The route, stop by stop, with everything on the page that names each station: roles,
 * degrees and projects. The relationship is each record's own `station` field, so a new
 * role or project joins its stop without touching this file or the map.
 */
const work: Pick<Project, 'id' | 'title' | 'station' | 'outcome'>[] = [featured, ...projects];

export const route: Stop[] = legs.map(({ station: id, years, note }) => ({
	station: stations[id],
	years,
	note,
	records: [
		...roles
			.filter((r) => r.station === id)
			.map((r): StopRecord => ({ kind: 'Role', title: r.company, detail: r.title, href: `#role-${r.id}` })),
		...degrees
			.filter((d) => d.station === id)
			.map((d): StopRecord => ({ kind: 'Degree', title: d.degree, detail: d.school, href: `#degree-${d.id}` })),
		...work
			.filter((p) => p.station === id)
			.map((p): StopRecord => ({
				kind: 'Project',
				title: p.title,
				figure: p.outcome.figure,
				detail: p.outcome.text,
				href: `#project-${p.id}`
			}))
	]
}));

/** The URL fragment that selects a stop on the map. */
export const stopHash = (id: Station['id']) => `#stop-${id}`;

export function stopFromHash(hash: string): Station['id'] | null {
	const id = hash.startsWith('#stop-') ? hash.slice(6) : '';
	return route.some((s) => s.station.id === id) ? (id as Station['id']) : null;
}
