<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import CopyEmail from './CopyEmail.svelte';

	let { resume }: { resume: ResumeData } = $props();
</script>

<p class="contact-line">
	Email me at <a href="mailto:{resume.email}" class="text-link">{resume.email}</a><CopyEmail
		email={resume.email}
	/>
	or find my code on
	<a href={resume.githubUrl} target="_blank" rel="noopener noreferrer" class="text-link"
		>GitHub<span class="sr-only"> (opens in a new tab)</span></a
	>.
</p>

<style>
	.contact-line {
		font-size: 1.0625rem;
		color: var(--color-text-muted);
	}

	/* Inline padding grows the tap area to 44px without changing the line. */
	.text-link {
		padding-block: 0.75rem;
		color: var(--color-text);
		text-decoration: underline 1px var(--color-primary);
		text-underline-offset: 4px;
	}

	.text-link:hover {
		color: var(--color-accent);
		text-decoration-color: var(--color-accent);
	}
</style>
