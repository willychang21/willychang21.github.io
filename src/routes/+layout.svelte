<script lang="ts">
	import '../app.css';
	import { siteConfig } from '$lib/data/seo';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
	<meta name="author" content="Willy Chang" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={siteConfig.url} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteConfig.title} />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg)]">
	{@render children()}
</div>
