import { describe, expect, it } from 'vitest';
import { degrees, roles } from './experience';
import { legs } from './profile';
import { route, stopFromHash } from './route';
import { featured, projects } from './work';

describe('the route', () => {
	it('has one stop per leg, in the order they were lived in', () => {
		expect(route.map((s) => s.station.id)).toEqual(legs.map((l) => l.station));
	});

	it('files every role, degree and placed project under the stop it names, once', () => {
		const filed = route.flatMap((s) => s.records.map((r) => `${s.station.id} ${r.href}`));
		const expected = [
			...roles.map((r) => `${r.station} #role-${r.id}`),
			...degrees.map((d) => `${d.station} #degree-${d.id}`),
			`${featured.station} #project-${featured.id}`,
			...projects.filter((p) => p.station).map((p) => `${p.station} #project-${p.id}`)
		];
		expect(filed.toSorted()).toEqual(expected.toSorted());
	});

	it('gives every stop something to show', () => {
		for (const stop of route) expect(stop.records.length > 0 || Boolean(stop.note), stop.station.id).toBe(true);
	});

	it('reads a stop from the URL fragment and ignores anything else', () => {
		expect(stopFromHash('#stop-cmi')).toBe('cmi');
		expect(stopFromHash('#stop-xyz')).toBeNull();
		expect(stopFromHash('#stop-')).toBeNull();
		expect(stopFromHash('#project-here')).toBeNull();
		expect(stopFromHash('')).toBeNull();
	});
});
