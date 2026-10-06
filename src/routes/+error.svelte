<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | Willy Chang</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="mx-auto max-w-2xl px-5 py-28 sm:px-8">
	<p class="text-sm text-[var(--color-text-subtle)] tabular-nums">{page.status}</p>
	<h1 class="mt-2 text-3xl font-semibold">
		{page.status === 404 ? 'This page doesn’t exist.' : 'Something went wrong loading this page.'}
	</h1>
	<p class="mt-4 text-[var(--color-text-muted)]">
		{page.status === 404
			? 'The link may be out of date. Everything on this site lives on one page.'
			: 'Try reloading. If it keeps happening, the home page still works.'}
	</p>
	<a href="/" class="entry-link mt-8 min-h-11 font-medium underline decoration-[var(--color-primary)] underline-offset-4">
		Back to the résumé
	</a>
</main>
