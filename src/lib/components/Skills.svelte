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
					<span class="inline-flex items-center px-2.5 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
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
					<span class="inline-flex items-center px-2.5 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
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
					<span class="inline-flex items-center px-2.5 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
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
					<span class="inline-flex items-center px-2.5 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]">
						{item}
					</span>
				{/each}
			</div>
		</div>
	</FadeIn>
</div>
