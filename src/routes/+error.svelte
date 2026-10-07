<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | Willy Chang</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="page mx-auto max-w-2xl px-5 py-16 sm:px-8 md:py-20">
	<a href="/" class="home-lockup">
		<img src="/avatar.jpg" alt="" width="40" height="40" />
		<span>Willy Chang</span>
	</a>

	<p class="mt-16 text-sm text-[var(--color-text-subtle)] tabular-nums">Error {page.status}</p>
	<h1 class="mt-2 text-3xl font-semibold">
		{page.status === 404 ? 'This page doesn’t exist.' : 'Something went wrong loading this page.'}
	</h1>
	<p class="mt-4 text-[var(--color-text-muted)]">
		{page.status === 404
			? 'The link may be out of date. Everything on this site lives on one page.'
			: 'Try reloading. If it keeps happening, the home page still works.'}
	</p>
	<p class="mt-8 flex flex-wrap gap-x-6">
		<a href="/" class="entry-link text-link">Back to the résumé</a>
		{#if page.status !== 404}
			<button type="button" class="entry-link text-link cursor-pointer" onclick={() => location.reload()}>Reload this page</button>
		{/if}
	</p>
</main>

<style>
	.home-lockup {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 2.75rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-weight: 600;
	}

	.home-lockup img {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		object-fit: cover;
	}

</style>
