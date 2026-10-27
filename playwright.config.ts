import { defineConfig, devices } from '@playwright/test';

// Browser checks run against the production build (`bun run build` first), served by
// `vite preview`, so they see the same files GitHub Pages serves.
export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	reporter: process.env.CI ? [['list'], ['github']] : 'list',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'retain-on-failure'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'bunx vite preview --port 4173 --strictPort',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI
	}
});
