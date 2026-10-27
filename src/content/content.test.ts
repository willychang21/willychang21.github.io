import { describe, expect, it } from 'vitest';
import { degrees, roles } from './experience';
import { legs, profile, stations } from './profile';
import { routeMap } from './route-map.generated';
import { skills } from './skills';
import { featured, projects } from './work';

/**
 * SHA-256 of internal system and queue names that must never reach the public copy. The
 * names are hashed so this public test doesn't itself publish them. Each word, and each
 * pair of adjacent words, of the copy is hashed (case kept) and checked against the list.
 */
const INTERNAL_TERMS = new Set([
	'a3bd2379b99f15916ae01117f909fcd451e40d162e923eaa54782e375aed18e1',
	'd68b81486bdc7cd9b4d1dca92a70aaf3834f378331affaa20921f2b577ae3c12',
	'447294ec34f4c392c0f5fc8257e79ae238fbb59c3045e99dba1384860b83381d',
	'd686368b507171acf5b8e20f74230dca50d74f462d5eb7c58de01a094094b055',
	'd3c388981fa284025235952ac1aa094d7f659e8ffe5561128b40dd217742eb27',
	'3eac3ec34fff422d1216956dbb6a72a4d97c11cfd4767dfbf8afc6bdb11be9d8',
	'55a734d3b5a80a61ec98a389dfd874a3fecb0d8732859d9b581689e2a2ef2437',
	'9170a8b2fb3234baa721bf8b3de5935d8d160f6f987215b83b07a49a403e5e74',
]);

async function internalTermsIn(text: string): Promise<string[]> {
	const words = text.match(/[A-Za-z]+/g) ?? [];
	const candidates = [...words, ...words.slice(1).map((w, i) => `${words[i]} ${w}`)];
	const hits: string[] = [];
	for (const candidate of new Set(candidates)) {
		const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(candidate));
		const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
		if (INTERNAL_TERMS.has(hex)) hits.push(candidate);
	}
	return hits;
}

describe('content', () => {
	it('keeps every role and degree from the original résumé', () => {
		expect(roles.map((r) => r.company)).toEqual(['TikTok', 'Kocree', 'University of Illinois Urbana-Champaign']);
		expect(degrees.map((d) => d.degree)).toEqual([
			'Master of Computer Science',
			'Bachelor of Science in Computer Science'
		]);
		expect(roles.flatMap((r) => r.highlights)).toHaveLength(8);
		expect(degrees[0]).toMatchObject({ start: 'Aug 2022', end: 'Dec 2024' });
	});

	it('keeps the published figures', () => {
		const text = JSON.stringify({ roles, projects, featured });
		for (const figure of ['over 90%', '5,000+', '90+', 'up to 25%', '4 engineers']) expect(text).toContain(figure);
	});

	it('publishes no internal operating metrics from TikTok', async () => {
		// Public copy carries only Willy's own rounded result: no precise rates, ticket
		// volumes, per-type breakdowns or internal system names.
		const tiktok = JSON.stringify({ featured, role: roles.find((r) => r.id === 'tiktok') });
		expect(tiktok).not.toMatch(/\d+\.\d+\s*%/);
		expect(await internalTermsIn(tiktok)).toEqual([]);
		expect(tiktok).not.toMatch(/\b\d{1,3}(,\d{3})+\b/);
	});

	it('backs every figure on a project row with the project’s own notes', () => {
		for (const { id, outcome, notes } of projects) {
			expect(outcome.text, id).not.toBe('');
			if (!outcome.figure) continue;
			const numbers = outcome.figure.match(/[\d,]+/g) ?? [];
			for (const n of numbers) expect(notes.join(' '), `${id}: ${n}`).toContain(n);
		}
	});

	it('gives projects unique ids and secure, absolute links', () => {
		const ids = projects.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const link of projects.flatMap((p) => p.links)) expect(link.href).toMatch(/^https:\/\//);
	});

	it('draws every diagram edge between nodes that exist, on the 12 × 8 grid', () => {
		for (const { diagram, id } of projects) {
			const nodes = new Set(diagram.nodes.map((n) => n.id));
			for (const edge of diagram.edges) {
				expect(nodes, `${id}: ${edge.from}`).toContain(edge.from);
				expect(nodes, `${id}: ${edge.to}`).toContain(edge.to);
			}
			for (const node of diagram.nodes) {
				expect(node.x).toBeGreaterThanOrEqual(0);
				expect(node.x).toBeLessThanOrEqual(12);
				expect(node.y).toBeGreaterThanOrEqual(0);
				expect(node.y).toBeLessThanOrEqual(8);
			}
			expect(diagram.edges.some((e) => e.route)).toBe(true);
		}
	});

	it('ties each part of the AOP story to a station in its drawing, once', () => {
		const nodes = featured.diagram.nodes.map((n) => n.id);
		const parts = featured.contribution.map((c) => c.node);
		for (const node of parts) expect(nodes).toContain(node);
		expect(new Set(parts).size).toBe(parts.length);
	});

	it('gives the AOP result the same figure in the ledger and the drawing', () => {
		const resolved = featured.diagram.nodes.find((n) => n.id === 'resolved')!;
		expect(resolved.note).toBe(featured.outcome.figure);
		expect(featured.diagram.caption).toContain(featured.outcome.figure.toLowerCase());
	});

	it('draws the orchestrator as it is described: work and storage apart, the critical path explained', () => {
		const { diagram, notes, summary } = projects.find((p) => p.id === 'orchestrator')!;
		const node = (label: string) => diagram.nodes.find((n) => n.label === label)!;
		const text = [summary, ...notes, diagram.caption].join(' ');

		// A fan-in is a function that waits on its parents, not a place data is kept.
		expect(node('Fan-in').kind).not.toBe('store');
		// Every store the story names is drawn, as a store of its own.
		for (const store of ['MemoryDB', 'DynamoDB']) {
			expect(text).toContain(store);
			expect(node(store)?.kind, store).toBe('store');
		}
		// Stores are reached by checkpoint writes only, never as steps of the run, and the
		// fan-in on the critical path is the one that checkpoints to memory.
		const edges = diagram.edges;
		const intoStores = edges.filter((e) => diagram.nodes.find((n) => n.id === e.to)!.kind === 'store');
		expect(intoStores.every((e) => e.checkpoint && !e.route)).toBe(true);
		expect(edges.some((e) => e.from === node('Fan-in').id && e.to === node('MemoryDB').id && e.checkpoint)).toBe(true);
		expect(edges.some((e) => e.route && e.to === node('Fan-in').id)).toBe(true);
		// The highlighted line means the critical path here, and the key says so.
		expect(diagram.key).toMatch(/critical path/i);
	});

	it('places each route stop on the map', () => {
		const mapped = new Set(routeMap.stations.map((s) => s.id));
		for (const leg of legs) {
			expect(mapped).toContain(leg.station);
			expect(stations[leg.station].code).toHaveLength(3);
		}
	});

	it('draws the route as one leg per move, in the order the stops were lived in', () => {
		expect(legs.map((l) => l.station)).toEqual(['tpe', 'sea', 'cmi', 'sjc']);
		expect(routeMap.stations.map((s) => s.id)).toEqual(legs.map((l) => l.station));
		routeMap.legs.forEach((leg, i) => {
			expect(leg.from).toBe(legs[i]!.station);
			expect(leg.to).toBe(legs[i + 1]!.station);
		});
	});

	it('has a land mask the size its header declares', () => {
		expect(routeMap.mask).toHaveLength(Math.floor(routeMap.height / routeMap.step));
		for (const row of routeMap.mask) expect(row).toHaveLength(Math.ceil(routeMap.cols / 4));
	});

	it('lists skills without duplicates', () => {
		const names = skills.flatMap((g) => g.items.map((i) => i.name));
		expect(new Set(names).size).toBe(names.length);
		expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
	});
});
