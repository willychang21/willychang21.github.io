<script lang="ts">
	import type { Project } from '$lib/data/resume';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<article class="mb-6 border-l-2 border-[var(--color-border)] pl-4">
	<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
		<h3 class="font-semibold text-[var(--color-text)]">
			{#if project.url}
				<a href={project.url} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-primary)]">
					{project.name}
				</a>
			{:else}
				{project.name}
			{/if}
		</h3>
		<span class="text-sm italic text-[var(--color-text-muted)]">{project.tech}</span>
	</div>

	<ul class="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
		{#each project.highlights as highlight, i (i)}
			<li class="relative pl-4 before:absolute before:left-0 before:content-['•']">
				{highlight}
			</li>
		{/each}
	</ul>
</article>
