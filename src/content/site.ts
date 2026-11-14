// Site-wide metadata. Also read by vite.config.ts (sitemap), so keep it free of browser APIs.
export const site = {
	url: 'https://willychang21.github.io',
	title: 'Willy Chang, software engineer',
	description:
		'Willy Chang is a software engineer at TikTok who designed and built AOP, an LLM agent platform that resolves privacy requests, and its evaluation. UIUC MCS.'
} as const;
