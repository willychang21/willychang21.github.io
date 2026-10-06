<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import CopyEmail from './CopyEmail.svelte';

	let { resume }: { resume: ResumeData } = $props();
</script>

<!-- One fact per line so the closing never wraps mid-thought. -->
<dl class="contact-lines">
	<div>
		<dt>Email</dt>
		<dd><a href="mailto:{resume.email}" class="text-link">{resume.email}</a><CopyEmail email={resume.email} /></dd>
	</div>
	<div>
		<dt>GitHub</dt>
		<dd><a href={resume.githubUrl} class="text-link">github.com/{resume.github}</a></dd>
	</div>
	<div class="print-row">
		<dt>Résumé</dt>
		<dd>
			<button type="button" class="text-link print-button" onclick={() => print()}>Save this page as PDF</button>
		</dd>
	</div>
</dl>

<style>
	.contact-lines {
		display: grid;
		gap: 0.25rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 1.125rem;
		letter-spacing: -0.01em;
	}

	/* Phones: label above value on every row. Wider: label column + value. */
	.contact-lines > div {
		display: grid;
	}

	@media (min-width: 40rem) {
		.contact-lines > div {
			grid-template-columns: 5rem 1fr;
			align-items: center;
		}
	}

	dt {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	dd {
		display: flex;
		align-items: center;
		min-width: 0;
	}

	/* 44px tap areas without growing the line. */
	.text-link {
		padding-block: 0.6rem;
		color: var(--color-text);
		overflow-wrap: anywhere;
	}

	.print-button {
		cursor: pointer;
		font: inherit;
	}

	@media print {
		.print-row {
			display: none !important;
		}
	}
</style>
