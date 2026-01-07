<script lang="ts">
	import type { Education } from '$lib/data/resume';

	interface Props {
		edu: Education;
	}

	let { edu }: Props = $props();
</script>

<article class="mb-4 border-l-2 border-[var(--color-border)] pl-4">
	<div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
		<h3 class="font-semibold text-[var(--color-text)]">{edu.school}</h3>
		<span class="text-sm text-[var(--color-text-muted)]">{edu.period}</span>
	</div>
	<p class="text-sm text-[var(--color-text-muted)]">
		{edu.degree} · {edu.location}
	</p>
</article>
