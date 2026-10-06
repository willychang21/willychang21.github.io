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
			<dt class="skill-label">{label}</dt>
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
	.skill-label {
		flex-shrink: 0;
		width: 6rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.875rem;
		font-weight: 500;
	}

	@media (min-width: 40rem) {
		.skill-label {
			padding-top: 0.125rem;
		}
	}

	.skill-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.125rem 1.125rem;
		font-size: 0.9375rem;
		color: var(--color-text-muted);
	}

	.gloss {
		font-size: 0.8125rem;
		color: var(--color-text-subtle);
	}
</style>
