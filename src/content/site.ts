// Site-wide metadata. Also read by vite.config.ts (sitemap), so keep it free of browser APIs.
export const site = {
	url: 'https://willychang21.github.io',
	title: 'Willy Chang, software engineer',
	description:
		'Willy Chang is a software engineer at TikTok who designed and built AOP, an agent platform that automates privacy requests from around the world. UIUC MCS.'
} as const;
