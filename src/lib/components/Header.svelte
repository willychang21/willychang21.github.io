<script lang="ts">
	import type { ResumeData } from '$lib/data/resume';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		resume: ResumeData;
	}

	let { resume }: Props = $props();
</script>

<header>
	<FadeIn y={20} duration={500}>
		<div class="flex items-center gap-5">
			<!-- Avatar -->
			<div class="avatar-container">
				<img
					src="/avatar.jpg"
					alt="{resume.name} avatar"
					class="avatar-image"
				/>
			</div>

			<!-- Name -->
			<h1 class="header-name text-3xl font-semibold tracking-tight md:text-4xl">
				{resume.name}
			</h1>
		</div>
	</FadeIn>

	<FadeIn delay={100} y={16}>
		<nav class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-text-muted)]">
			<a
				href="mailto:{resume.email}"
				class="nav-link group flex items-center gap-1.5"
			>
				<svg class="nav-icon h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				<span>{resume.email}</span>
			</a>

			<a
				href={resume.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="nav-link group flex items-center gap-1.5"
			>
				<svg class="nav-icon h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
				</svg>
				<span>{resume.github}</span>
			</a>
		</nav>
	</FadeIn>
</header>

<style>
	.header-name {
		color: var(--color-text);
		transition: color var(--duration-normal) var(--ease-out);
	}

	.header-name:hover {
		color: var(--color-primary);
	}

	.nav-link {
		position: relative;
		color: var(--color-text-muted);
		transition: color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-primary);
		transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.nav-link:hover {
		color: var(--color-text);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-icon {
		color: var(--color-text-subtle);
		transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.nav-link:hover .nav-icon {
		color: var(--color-primary);
		transform: scale(1.1);
	}

	.avatar-container {
		flex-shrink: 0;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 9999px;
		overflow: hidden;
		border: 3px solid var(--color-border);
		box-shadow: var(--shadow-md);
		transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.avatar-container:hover {
		transform: scale(1.05);
		border-color: var(--color-primary);
		box-shadow: 0 8px 24px -4px rgba(2, 101, 191, 0.25);
	}

	@media (prefers-color-scheme: dark) {
		.avatar-container:hover {
			box-shadow: 0 8px 24px -4px rgba(59, 158, 255, 0.3);
		}
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
