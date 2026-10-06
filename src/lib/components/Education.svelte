<script lang="ts">
	import type { Education } from '#lib/data/resume.ts';
	import Logo from './Logo.svelte';

	let { edu }: { edu: Education } = $props();
</script>

<article class="entry flex gap-4">
	<Logo src={edu.logo} name={edu.school} />

	<div class="min-w-0 flex-1">
		<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
			<h3 class="font-medium">{edu.school}</h3>
			<span class="meta-badge">{edu.period}</span>
		</div>
		<p class="mt-1 text-sm text-[var(--color-text-muted)]">
			{edu.degree} <span class="text-[var(--color-text-subtle)]" aria-hidden="true">·</span>
			{edu.location}
		</p>
	</div>
</article>
