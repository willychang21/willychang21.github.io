<script lang="ts">
	import type { Experience } from '$lib/data/resume';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		exp: Experience;
		index?: number;
	}

	let { exp, index = 0 }: Props = $props();

	const logoMap: Record<string, string> = {
		'TikTok': '/logos/tiktok.png',
		'Kocree': '/logos/kocree.png',
		'University of Illinois Urbana-Champaign': '/logos/uiuc.png',
		'Showu Tech': '/logos/showutech.png'
	};
</script>

<FadeIn delay={index * 100}>
	<article class="experience-card">
		<div class="flex gap-4">
			<!-- Logo -->
			<div class="hidden sm:block flex-shrink-0">
				{#if logoMap[exp.company]}
					<div class="logo-container">
						<img
							src={logoMap[exp.company]}
							alt="{exp.company} logo"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{:else}
					<div class="logo-placeholder">
						<span class="text-sm font-medium text-[var(--color-text-subtle)]">
							{exp.company.charAt(0)}
						</span>
					</div>
				{/if}
			</div>

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
					<h3 class="company-name font-medium">
						{#if exp.url}
							<a
								href={exp.url}
								target="_blank"
								rel="noopener noreferrer"
								class="company-link"
							>
								{exp.company}
								<svg class="external-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						{:else}
							{exp.company}
						{/if}
					</h3>
					<span class="period-badge">{exp.period}</span>
				</div>

				<p class="mt-1 text-sm text-[var(--color-text-muted)]">
					{exp.title} <span class="text-[var(--color-text-subtle)]">·</span> {exp.location}
				</p>

				<ul class="mt-4 space-y-2.5">
					{#each exp.highlights as highlight, i (i)}
						<li class="highlight-item">
							{highlight}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</article>
</FadeIn>

<style>
	.experience-card {
		position: relative;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
		margin-left: -1.25rem;
		margin-right: -1.25rem;
		border-radius: 0.75rem;
		transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.experience-card:last-child {
		margin-bottom: 0;
	}

	.experience-card:hover {
		background-color: var(--color-bg-elevated);
		box-shadow: var(--shadow-md);
	}

	.logo-container {
		height: 2.75rem;
		width: 2.75rem;
		border-radius: 0.75rem;
		border: 1px solid var(--color-border);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		transition: all 0.2s ease;
	}

	.experience-card:hover .logo-container {
		transform: scale(1.05);
		box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
	}

	.logo-placeholder {
		height: 2.75rem;
		width: 2.75rem;
		border-radius: 0.75rem;
		background-color: var(--color-bg-elevated);
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.company-name {
		color: var(--color-text);
	}

	.company-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		transition: color 0.2s ease;
	}

	.company-link:hover {
		color: var(--color-primary);
	}

	.external-icon {
		height: 0.875rem;
		width: 0.875rem;
		opacity: 0;
		transform: translateX(-4px);
		transition: all 0.2s ease;
	}

	.experience-card:hover .external-icon {
		opacity: 0.5;
		transform: translateX(0);
	}

	.period-badge {
		font-size: 0.75rem;
		color: var(--color-text-subtle);
		font-variant-numeric: tabular-nums;
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
