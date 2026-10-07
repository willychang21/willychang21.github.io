<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import CopyEmail from './CopyEmail.svelte';

	let { resume }: { resume: ResumeData } = $props();
</script>

<!-- The page ends on one primary action (email) with the rest as quiet secondary links,
     rather than repeating the header row. -->
<p class="closing-email">
	<a href="mailto:{resume.email}" class="text-link">{resume.email}</a><CopyEmail email={resume.email} />
</p>
<p class="closing-secondary">
	<a href={resume.githubUrl} class="text-link">GitHub</a>
	<span aria-hidden="true">·</span>
	<button type="button" class="text-link" onclick={() => print()}>Print / save as PDF</button>
</p>

<style>
	.closing-email {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: clamp(1.25rem, 4.5vw, 1.625rem);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.closing-secondary {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0 0.75rem;
		margin-top: 0.25rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.9375rem;
		color: var(--color-text-subtle);
	}

	/* 44px tap areas. */
	.text-link {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		color: var(--color-text);
		overflow-wrap: anywhere;
	}

	button.text-link {
		font: inherit;
		cursor: pointer;
	}

	@media print {
		.closing-secondary button {
			display: none;
		}
	}
</style>
