<script lang="ts">
	import type { Education } from '#lib/data/resume.ts';
	import Logo from './Logo.svelte';

	let { edu }: { edu: Education } = $props();
</script>

<article class="entry flex gap-4">
	<Logo src={edu.logo} name={edu.school} />

	<div class="min-w-0 flex-1">
		<div class="entry-head">
			<h3>{edu.school}</h3>
			<span class="meta-badge hang"
				>{edu.period}<span class="meta-location">{' · '}{edu.location}</span></span
			>
			<p class="text-[0.9375rem] text-[var(--color-text-muted)]">
				{edu.degree}
				<span class="entry-location"
					><span class="text-[var(--color-text-subtle)]" aria-hidden="true">·</span> {edu.location}</span
				>
			</p>
		</div>
	</div>
</article>
