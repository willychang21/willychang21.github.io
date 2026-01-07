<script lang="ts">
	import type { Experience } from '$lib/data/resume';

	interface Props {
		exp: Experience;
	}

	let { exp }: Props = $props();
</script>

<article class="mb-6 border-l-2 border-[var(--color-border)] pl-4">
	<div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
		<h3 class="font-semibold text-[var(--color-text)]">
			{#if exp.url}
				<a href={exp.url} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-primary)]">
					{exp.company}
				</a>
			{:else}
				{exp.company}
			{/if}
		</h3>
		<span class="text-sm text-[var(--color-text-muted)]">{exp.period}</span>
	</div>

	<p class="text-sm italic text-[var(--color-text-muted)]">
		{exp.title} · {exp.location}
	</p>

	<ul class="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
		{#each exp.highlights as highlight, i (i)}
			<li class="relative pl-4 before:absolute before:left-0 before:content-['•']">
				{highlight}
			</li>
		{/each}
	</ul>
</article>
