<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';

	let { skills }: { skills: ResumeData['skills'] } = $props();

	const groups = $derived([
		['Languages', skills.languages],
		['Frontend', skills.frontend],
		['Backend', skills.backend],
		['DevOps', skills.devops]
	] as const);
</script>

<dl class="space-y-4">
	{#each groups as [label, items] (label)}
		<div class="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
			<dt class="w-24 flex-shrink-0 pt-0.5 text-sm font-medium">{label}</dt>
			<dd>
				<ul class="flex flex-wrap gap-1.5">
					{#each items as item (item)}
						<li class="skill-tag">{item}</li>
					{/each}
				</ul>
			</dd>
		</div>
	{/each}
</dl>

<style>
	.skill-tag {
		padding: 0.1875rem 0.6875rem;
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		border-radius: 9999px;
	}
</style>
