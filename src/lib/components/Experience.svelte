<script lang="ts">
	import type { Experience } from '#lib/data/resume.ts';
	import ExternalIcon from './ExternalIcon.svelte';
	import Logo from './Logo.svelte';

	let { exp }: { exp: Experience } = $props();
</script>

<article class="entry flex gap-4">
	<Logo src={exp.logo} name={exp.company} />

	<div class="min-w-0 flex-1">
		<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
			<h3 class="font-medium">
				{#if exp.url}
					<a href={exp.url} target="_blank" rel="noopener noreferrer" class="entry-link">
						{exp.company}<ExternalIcon />
					</a>
				{:else}
					{exp.company}
				{/if}
			</h3>
			<span class="meta-badge">{exp.period}</span>
		</div>

		<p class="mt-1 text-sm text-[var(--color-text-muted)]">
			{exp.title} <span class="text-[var(--color-text-subtle)]" aria-hidden="true">·</span>
			{exp.location}
		</p>

		<ul class="mt-3 space-y-2">
			{#each exp.highlights as highlight, i (i)}
				<li class="highlight-item">{highlight}</li>
			{/each}
		</ul>
	</div>
</article>
