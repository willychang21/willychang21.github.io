<script lang="ts">
	import type { Project } from '#lib/data/resume.ts';
	import ExternalIcon from './ExternalIcon.svelte';

	let { project }: { project: Project } = $props();
</script>

<article class="entry">
	<h3 class="font-medium">
		{#if project.url}
			<a href={project.url} target="_blank" rel="noopener noreferrer" class="entry-link">
				{project.name}<ExternalIcon />
			</a>
		{:else}
			{project.name}
		{/if}
	</h3>
	<p class="meta-badge mt-0.5">{project.tech}</p>

	<ul class="mt-3 space-y-2">
		{#each project.highlights as highlight, i (i)}
			<li class="highlight-item">{highlight}</li>
		{/each}
	</ul>
</article>
