<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import CopyEmail from './CopyEmail.svelte';

	let { resume }: { resume: ResumeData } = $props();
</script>

<!-- One fact per line so the closing never wraps mid-thought; print lives in the header. -->
<dl class="contact-lines">
	<div>
		<dt class="hang">Email</dt>
		<dd><a href="mailto:{resume.email}" class="text-link">{resume.email}</a><CopyEmail email={resume.email} /></dd>
	</div>
	<div>
		<dt class="hang">GitHub</dt>
		<dd><a href={resume.githubUrl} class="text-link">github.com/{resume.github}</a></dd>
	</div>
</dl>

<style>
	.contact-lines {
		display: grid;
		gap: 1rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 1.125rem;
		letter-spacing: -0.01em;
	}

	/* Phones: label above value on every row. Wider: label column + value. */
	.contact-lines > div {
		position: relative;
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

	/* 44px tap row; the link itself adds no padding, so label and value stay paired. */
	dd {
		display: flex;
		align-items: center;
		min-width: 0;
		min-height: 2.75rem;
	}

	.text-link {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		color: var(--color-text);
		overflow-wrap: anywhere;
	}
</style>
