<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';

	let { resume }: { resume: ResumeData } = $props();
</script>

<p class="contact-line">
	Email me at <a href="mailto:{resume.email}" class="text-link">{resume.email}</a>, or find my code on
	<a href={resume.githubUrl} target="_blank" rel="noopener noreferrer" class="text-link"
		>GitHub<span class="sr-only"> (opens in a new tab)</span></a
	>.
</p>

<style>
	.contact-line {
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 1.25rem;
		line-height: 1.6;
		letter-spacing: -0.01em;
		color: var(--color-text-muted);
		text-wrap: balance;
	}

	/* Inline padding grows the tap area to 44px without changing the line. */
	.text-link {
		padding-block: 0.6rem;
		color: var(--color-text);
		overflow-wrap: anywhere;
	}
</style>
