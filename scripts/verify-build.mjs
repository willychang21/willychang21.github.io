// Checks the production build in build/ before it is deployed: every local URL in the HTML
// entries resolves to a file, preloaded fonts are ones the CSS uses, and the files GitHub
// Pages and link previews rely on exist. Run after `bun run build`.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../build/', import.meta.url).pathname;
const site = 'https://willychang21.github.io';
const problems = [];
const file = (path) => join(root, path.replace(/^\//, '').split(/[?#]/)[0]);

const css = readdirSync(join(root, 'assets'))
	.filter((f) => f.endsWith('.css'))
	.map((f) => readFileSync(join(root, 'assets', f), 'utf8'))
	.join('\n');

for (const page of ['index.html', '404.html']) {
	if (!existsSync(join(root, page))) {
		problems.push(`${page} is missing`);
		continue;
	}
	const html = readFileSync(join(root, page), 'utf8');
	// Local URLs in src/href/srcset/content attributes, and absolute URLs on this site.
	const urls = [...html.matchAll(/\s(?:src|href|content|srcset)="([^"]+)"/g)]
		.flatMap(([, value]) => value.split(',').map((part) => part.trim().split(/\s+/)[0]))
		.map((url) => (url.startsWith(site) ? url.slice(site.length) || '/' : url))
		.filter((url) => url.startsWith('/') && !url.startsWith('//'));
	for (const url of urls) {
		if (/\/(node_modules|src)\//.test(url)) problems.push(`${page}: dev-only path ${url}`);
		else if (url !== '/' && !existsSync(file(url))) problems.push(`${page}: ${url} does not exist`);
	}
	for (const [, href] of html.matchAll(/<link[^>]*rel="preload"[^>]*href="([^"]+)"/gs)) {
		const name = href.split('/').pop();
		if (!css.includes(name)) problems.push(`${page}: preloaded ${name} is not used by any stylesheet`);
	}
}

for (const required of ['sitemap.xml', 'robots.txt', 'og.png', 'favicon.svg', '.nojekyll']) {
	if (!existsSync(join(root, required))) problems.push(`${required} is missing`);
}
if (existsSync(join(root, 'sitemap.xml')) && !readFileSync(join(root, 'sitemap.xml'), 'utf8').includes(`<loc>${site}/</loc>`)) {
	problems.push('sitemap.xml does not list the site root');
}

if (problems.length) {
	console.error(`verify-build: ${problems.length} problem(s)\n- ${problems.join('\n- ')}`);
	process.exit(1);
}
console.log('verify-build: all local URLs resolve; preloads are used; Pages files present');
