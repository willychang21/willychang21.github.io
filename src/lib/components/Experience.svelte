<script lang="ts">
	import type { Experience } from '#lib/data/resume.ts';
	import Logo from './Logo.svelte';
	import Highlight from './Highlight.svelte';

	let { exp }: { exp: Experience } = $props();
</script>

<article class="entry flex gap-4">
	<Logo src={exp.logo} name={exp.company} />

	<div class="min-w-0 flex-1">
		<div class="entry-head">
			<h3>{exp.company}</h3>
			<span class="meta-badge hang">{exp.period}</span>
			<p class="text-[0.9375rem] text-[var(--color-text-muted)]">
				<span class="font-semibold text-[var(--color-text)]">{exp.title}</span>
				<span class="text-[var(--color-text-subtle)]" aria-hidden="true">·</span>
				{exp.location}
			</p>
		</div>

		<ul class="mt-3 space-y-2">
			{#each exp.highlights as highlight, i (i)}
				<li class="highlight-item"><Highlight text={highlight} /></li>
			{/each}
		</ul>
	</div>
</article>
