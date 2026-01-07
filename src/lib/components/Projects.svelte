<script lang="ts">
	import type { Project } from '$lib/data/resume';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		project: Project;
		index?: number;
	}

	let { project, index = 0 }: Props = $props();
</script>

<FadeIn delay={index * 80}>
	<article class="group relative mb-6 last:mb-0 p-4 -mx-4 rounded-lg transition-colors hover:bg-[var(--color-bg-elevated)]">
		<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
			<h3 class="font-medium text-[var(--color-text)]">
				{#if project.url}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors"
					>
						{project.name}
						<svg class="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-50 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				{:else}
					{project.name}
				{/if}
			</h3>
			<span class="text-xs text-[var(--color-text-subtle)] font-mono">{project.tech}</span>
		</div>

		<ul class="mt-3 space-y-2">
			{#each project.highlights as highlight, i (i)}
				<li class="text-sm text-[var(--color-text-muted)] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-border)]">
					{highlight}
				</li>
			{/each}
		</ul>
	</article>
</FadeIn>
