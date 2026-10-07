<script lang="ts">
	import type { Project } from '#lib/data/resume.ts';
	import ExternalIcon from './ExternalIcon.svelte';
	import Highlight from './Highlight.svelte';

	let { project }: { project: Project } = $props();

	const hosts: Record<string, string> = { 'drive.google.com': 'Google Drive file', 'github.com': 'GitHub repo' };
	const destination = $derived.by(() => {
		if (!project.url) return '';
		const host = new URL(project.url).hostname.replace(/^www\./, '');
		return hosts[host] ?? host;
	});
</script>

<article class="entry sm:pl-15">
	<h3>
		{#if project.url}
			<a href={project.url} class="entry-link text-link">
				{project.name}<ExternalIcon />
			</a>
		{:else}
			{project.name}
		{/if}
	</h3>
	<!-- Phones/tablets: "tech · destination" on one line. Wide screens: the tech stack hangs
	     in the gutter like the dates on dated entries; the destination stays under the title. -->
	<p class="project-meta mt-0.5 text-[0.8125rem] text-[var(--color-text-muted)]">
		<span class="meta-badge hang project-tech">{project.tech}</span>{#if destination}<span
				class="text-[var(--color-text-subtle)]"
				><span class="project-sep">{' · '}</span><span class="whitespace-nowrap">{destination}</span></span
			>{/if}
	</p>

	<ul class="mt-3 space-y-2">
		{#each project.highlights as highlight, i (i)}
			<li class="highlight-item"><Highlight text={highlight} /></li>
		{/each}
	</ul>
</article>
