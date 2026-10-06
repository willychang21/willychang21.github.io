<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';

	let { skills }: { skills: ResumeData['skills'] } = $props();

	const groups = $derived([
		['Languages', skills.languages],
		['Frontend', skills.frontend],
		['Backend', skills.backend],
		['DevOps', skills.devops]
	] as const);

	// "Kitex (Go RPC)" -> ["Kitex", "Go RPC"]
	const split = (item: string) => item.match(/^(.*?)(?: \((.+)\))?$/)!.slice(1) as [string, string?];
</script>

<dl class="space-y-3">
	{#each groups as [label, items] (label)}
		<div class="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
			<dt class="w-24 flex-shrink-0 font-[Poppins] text-sm font-medium sm:pt-0.5">{label}</dt>
			<dd>
				<ul class="skill-list">
					{#each items as item (item)}
						{@const [name, gloss] = split(item)}
						<li>{name}{#if gloss}{' '}<span class="gloss">({gloss})</span>{/if}</li>
					{/each}
				</ul>
			</dd>
		</div>
	{/each}
</dl>

<style>
	.skill-list {
		display: flex;
		flex-wrap: wrap;
		font-size: 0.9375rem;
		color: var(--color-text-muted);
	}

	.skill-list li:not(:last-child)::after {
		content: '·';
		margin-inline: 0.5em;
		color: var(--color-text-subtle);
	}

	.gloss {
		font-size: 0.8125rem;
		color: var(--color-text-subtle);
	}
</style>
