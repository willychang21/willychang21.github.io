<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		children: Snippet;
	}

	let { id, title, children }: Props = $props();
</script>

<section {id} aria-labelledby="{id}-title" class="mt-16 scroll-mt-16">
	<div class="section-header">
		<h2 id="{id}-title" class="section-title">{title}</h2>
		<div class="section-line" aria-hidden="true"></div>
	</div>
	{@render children()}
</section>

<style>
	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.75rem;
	}

	.section-title {
		font-size: 0.8125rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-subtle);
		flex-shrink: 0;
	}

	.section-line {
		flex: 1;
		height: 1px;
		background: var(--color-border);
	}
</style>
