<script lang="ts">
	import type { ResumeData } from '$lib/data/resume';

	interface Props {
		resume: ResumeData;
	}

	let { resume }: Props = $props();
</script>

<header class="text-center">
	<h1 class="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
		{resume.name}
	</h1>

	<nav class="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-muted)]">
		<a href="tel:{resume.phone}" class="flex items-center gap-1 hover:text-[var(--color-primary)]">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
			</svg>
			<span>{resume.phone}</span>
		</a>

		<span class="hidden text-[var(--color-border)] sm:inline" aria-hidden="true">|</span>

		<a href="mailto:{resume.email}" class="flex items-center gap-1 hover:text-[var(--color-primary)]">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
			<span>{resume.email}</span>
		</a>

		<span class="hidden text-[var(--color-border)] sm:inline" aria-hidden="true">|</span>

		<a href={resume.githubUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 hover:text-[var(--color-primary)]">
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
			</svg>
			<span>github.com/{resume.github}</span>
		</a>
	</nav>
</header>
