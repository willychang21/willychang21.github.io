<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import CopyEmail from './CopyEmail.svelte';

	let { resume, label }: { resume: ResumeData; label: string } = $props();
</script>

<nav aria-label={label} class="flex flex-wrap items-center gap-x-3 text-sm sm:gap-x-5">
	<span class="inline-flex items-center">
		<a href="mailto:{resume.email}" class="nav-link">
			<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
			<span class="nav-label">{resume.email}</span>
		</a>
		<CopyEmail email={resume.email} />
	</span>

	<a href={resume.githubUrl} class="nav-link">
		<svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
		</svg>
		<span class="nav-label">GitHub</span>
	</a>

	<button type="button" class="nav-link print-link" onclick={() => print()}>
		<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 9V4h10v5M7 17H5a1 1 0 01-1-1v-6a1 1 0 011-1h14a1 1 0 011 1v6a1 1 0 01-1 1h-2M7 14h10v6H7z" />
		</svg>
		<span class="nav-label">Print / PDF…</span>
	</button>
</nav>

<style>
	/* 44px tall hit areas; the underline sits under the label only, not the icon. */
	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Poppins', system-ui, sans-serif;
		min-height: 2.75rem;
		color: var(--color-text-muted);
	}

	.nav-label {
		text-decoration: underline 1px var(--color-primary);
		text-underline-offset: 4px;
		transition: text-decoration-color var(--duration-normal) var(--ease-out);
	}

	/* Phones rarely print; the closing section still offers it. */
	.print-link {
		display: none;
		cursor: pointer;
		font: inherit;
	}

	@media (min-width: 40rem) {
		.print-link {
			display: inline-flex;
		}
	}

	@media print {
		.print-link {
			display: none;
		}
	}

	.nav-link:hover {
		color: var(--color-text);
	}

	.nav-link:hover .nav-label {
		text-decoration-color: var(--color-accent);
	}

	.nav-icon {
		width: 1rem;
		height: 1rem;
		color: var(--color-text-subtle);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.nav-link:hover .nav-icon {
		color: var(--color-accent);
	}
</style>
