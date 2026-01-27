<script lang="ts">
	import type { Project } from '$lib/data/resume';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		project: Project;
		index?: number;
	}

	let { project, index = 0 }: Props = $props();
</script>

<FadeIn delay={index * 100}>
	<article class="project-card">
		<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
			<h3 class="project-name font-medium">
				{#if project.url}
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="project-link"
					>
						{project.name}
						<svg class="external-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				{:else}
					{project.name}
				{/if}
			</h3>
			<span class="tech-badge">{project.tech}</span>
		</div>

		<ul class="mt-4 space-y-2.5">
			{#each project.highlights as highlight, i (i)}
				<li class="highlight-item">
					{highlight}
				</li>
			{/each}
		</ul>
	</article>
</FadeIn>

<style>
	.project-card {
		position: relative;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
		margin-left: -1.25rem;
		margin-right: -1.25rem;
		border-radius: 0.75rem;
		transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.project-card:last-child {
		margin-bottom: 0;
	}

	.project-card:hover {
		background-color: var(--color-bg-elevated);
		box-shadow: var(--shadow-md);
	}

	.project-name {
		color: var(--color-text);
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		transition: color 0.2s ease;
	}

	.project-link:hover {
		color: var(--color-primary);
	}

	.external-icon {
		height: 0.875rem;
		width: 0.875rem;
		opacity: 0;
		transform: translateX(-4px);
		transition: all 0.2s ease;
	}

	.project-card:hover .external-icon {
		opacity: 0.5;
		transform: translateX(0);
	}

	.tech-badge {
		font-size: 0.75rem;
		color: var(--color-text-subtle);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		padding: 0.125rem 0.5rem;
		background-color: var(--color-bg);
		border-radius: 9999px;
		border: 1px solid var(--color-border-subtle);
	}

	.highlight-item {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		padding-left: 1.25rem;
		position: relative;
	}

	.highlight-item::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6em;
		height: 0.375rem;
		width: 0.375rem;
		border-radius: 9999px;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-text-subtle) 100%);
	}
</style>
