import { describe, expect, it } from 'vitest';
import html from '../../index.html?raw';
import { profile, stations } from './profile';
import { site } from './site';

const meta = (attr: string, key: string) => new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, 's').exec(html)?.[1];

describe('index.html metadata', () => {
	it('repeats the site description and canonical URL from src/content/site.ts', () => {
		expect(meta('name', 'description')).toBe(site.description);
		expect(html).toContain(`<link rel="canonical" href="${site.url}/" />`);
		expect(meta('property', 'og:url')).toBe(`${site.url}/`);
	});

	it('points social cards at the published image, with matching titles', () => {
		expect(meta('property', 'og:image')).toBe(`${site.url}/og.png`);
		expect(meta('name', 'twitter:image')).toBe(`${site.url}/og.png`);
		expect(meta('property', 'og:title')).toBe(meta('name', 'twitter:title'));
	});

	it('keeps the JSON-LD Person record consistent with the profile', () => {
		const ld = JSON.parse(/<script type="application\/ld\+json">(.*?)<\/script>/s.exec(html)![1]!);
		expect(ld).toMatchObject({ '@type': 'Person', name: profile.name, url: `${site.url}/` });
		expect(ld.worksFor.name).toBe(profile.employer);
		expect(ld.sameAs).toContain(profile.github.url);
	});

	it('describes the social card as it is drawn: the statement and every stop on the route', () => {
		const alt = meta('property', 'og:image:alt')!;
		expect(alt.startsWith(`${profile.name} ${profile.statement.replace(/\.$/, '')}`)).toBe(true);
		for (const { city } of Object.values(stations)) expect(alt).toContain(city);
	});
});
