/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { site } from './src/content/site.ts';

// GitHub Pages has no server: emit the sitemap as a static file at build time.
function sitemap(): Plugin {
	return {
		name: 'sitemap',
		apply: 'build',
		generateBundle() {
			const lastmod = new Date().toISOString().slice(0, 10);
			this.emitFile({
				type: 'asset',
				fileName: 'sitemap.xml',
				source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
			});
		}
	};
}

export default defineConfig({
	// A user site (willychang21.github.io) is served from the domain root.
	base: '/',
	plugins: [react(), sitemap()],
	build: {
		// The Pages workflow uploads build/.
		outDir: 'build',
		rollupOptions: {
			// GitHub Pages serves 404.html for any unknown path.
			input: { main: resolve(import.meta.dirname, 'index.html'), notFound: resolve(import.meta.dirname, '404.html') }
		}
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		css: { modules: { classNameStrategy: 'non-scoped' } },
		restoreMocks: true
	}
});
