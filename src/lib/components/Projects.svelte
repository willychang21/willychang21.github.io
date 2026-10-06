<script lang="ts">
	import type { Project } from '#lib/data/resume.ts';
	import ExternalIcon from './ExternalIcon.svelte';
	import Highlight from './Highlight.svelte';

	let { project }: { project: Project } = $props();
</script>

<article class="entry sm:pl-15">
	<h3>
		{#if project.url}
			<a href={project.url} target="_blank" rel="noopener noreferrer" class="entry-link text-link">
				{project.name}<ExternalIcon />
			</a>
		{:else}
			{project.name}
		{/if}
	</h3>
	<p class="mt-0.5 text-[0.8125rem] text-[var(--color-text-muted)]">
		{project.tech}{#if project.url}<span class="text-[var(--color-text-subtle)]"
				>{' · '}{new URL(project.url).hostname.replace(/^www\./, '')}</span
			>{/if}
	</p>

	<ul class="mt-3 space-y-2">
		{#each project.highlights as highlight, i (i)}
			<li class="highlight-item"><Highlight text={highlight} /></li>
		{/each}
	</ul>
</article>
