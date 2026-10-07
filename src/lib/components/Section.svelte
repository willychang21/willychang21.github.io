<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		children: Snippet;
		/** Dated entries: draw the chronology spine in the margin on wide screens. */
		timeline?: boolean;
	}

	let { id, title, children, timeline = false }: Props = $props();
</script>

<section {id} aria-labelledby="{id}-title" tabindex="-1" class="mt-16 scroll-mt-16 outline-none">
	<div class="section-header">
		<h2 id="{id}-title" class="section-title hang">{title}</h2>
		<div class="section-line" aria-hidden="true"></div>
	</div>
	<div class="section-body" class:timeline>
		{@render children()}
	</div>
</section>

<style>
	.section-header {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.75rem;
	}

	.section-title {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text);
		flex-shrink: 0;
	}

	.section-line {
		flex: 1;
		height: 1px;
		background: var(--color-border);
	}

	.section-body {
		position: relative;
	}
</style>
