<script lang="ts">
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

<div class="space-y-3">
	<div class="text-sm">
		<span class="font-medium text-[var(--color-text)]">Languages:</span>
		<span class="text-[var(--color-text-muted)]">{skills.languages.join(', ')}</span>
	</div>
	<div class="text-sm">
		<span class="font-medium text-[var(--color-text)]">Frontend:</span>
		<span class="text-[var(--color-text-muted)]">{skills.frontend.join(', ')}</span>
	</div>
	<div class="text-sm">
		<span class="font-medium text-[var(--color-text)]">Backend:</span>
		<span class="text-[var(--color-text-muted)]">{skills.backend.join(', ')}</span>
	</div>
	<div class="text-sm">
		<span class="font-medium text-[var(--color-text)]">DevOps:</span>
		<span class="text-[var(--color-text-muted)]">{skills.devops.join(', ')}</span>
	</div>
</div>
