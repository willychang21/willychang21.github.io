<script lang="ts">
	import FadeIn from './FadeIn.svelte';

	interface Props {
		skills: {
			languages: string[];
			frontend: string[];
			backend: string[];
			devops: string[];
		};
	}

	let { skills }: Props = $props();
</script>

<div class="space-y-4">
	<FadeIn delay={0}>
		<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
			<span class="text-sm font-medium text-[var(--color-text)] w-24 flex-shrink-0">Languages</span>
			<div class="flex flex-wrap gap-1.5">
				{#each skills.languages as item (item)}
					<span class="skill-tag">
						{item}
					</span>
				{/each}
			</div>
		</div>
	</FadeIn>

	<FadeIn delay={60}>
		<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
			<span class="text-sm font-medium text-[var(--color-text)] w-24 flex-shrink-0">Frontend</span>
			<div class="flex flex-wrap gap-1.5">
				{#each skills.frontend as item (item)}
					<span class="skill-tag">
						{item}
					</span>
				{/each}
			</div>
		</div>
	</FadeIn>

	<FadeIn delay={120}>
		<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
			<span class="text-sm font-medium text-[var(--color-text)] w-24 flex-shrink-0">Backend</span>
			<div class="flex flex-wrap gap-1.5">
				{#each skills.backend as item (item)}
					<span class="skill-tag">
						{item}
					</span>
				{/each}
			</div>
		</div>
	</FadeIn>

	<FadeIn delay={180}>
		<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
			<span class="text-sm font-medium text-[var(--color-text)] w-24 flex-shrink-0">DevOps</span>
			<div class="flex flex-wrap gap-1.5">
				{#each skills.devops as item (item)}
					<span class="skill-tag">
						{item}
					</span>
				{/each}
			</div>
		</div>
	</FadeIn>
</div>

<style>
	.skill-tag {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.625rem;
		font-size: 0.75rem;
		color: var(--color-text-muted);
		background-color: var(--color-bg-elevated);
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
		cursor: default;
	}

	.skill-tag:hover {
		border-color: var(--color-primary);
		color: var(--color-text);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px -2px rgba(2, 101, 191, 0.15);
	}

	@media (prefers-color-scheme: dark) {
		.skill-tag:hover {
			box-shadow: 0 4px 12px -2px rgba(59, 158, 255, 0.2);
		}
	}
</style>
