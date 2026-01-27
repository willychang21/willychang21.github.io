<script lang="ts">
	import type { Snippet } from 'svelte';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		id: string;
		title: string;
		children: Snippet;
		delay?: number;
	}

	let { id, title, children, delay = 0 }: Props = $props();
</script>

<section {id} class="mt-10">
	<FadeIn {delay}>
		<div class="section-header">
			<h2 class="section-title">{title}</h2>
			<div class="section-line"></div>
		</div>
	</FadeIn>
	{@render children()}
</section>

<style>
	.section-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
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
		background: linear-gradient(
			to right,
			var(--color-border),
			transparent
		);
	}
</style>
