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

<section {id} class="mt-20 first:mt-12">
	<FadeIn {delay}>
		<h2 class="mb-8 text-xs font-medium uppercase tracking-widest text-[var(--color-text-subtle)]">
			{title}
		</h2>
	</FadeIn>
	{@render children()}
</section>
