// Site-wide metadata. Also read by vite.config.ts (sitemap), so keep it free of browser APIs.
export const site = {
	url: 'https://willychang21.github.io',
	title: 'Willy Chang, software engineer',
	description:
		'Willy Chang is a software engineer at TikTok who designed and built AOP, the Agent Operation Platform that automates global data-privacy requests. Previously full-stack products for music co-creation and classroom attendance. UIUC MCS.'
} as const;
