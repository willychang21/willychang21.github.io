<script lang="ts">
	import type { Education } from '$lib/data/resume';
	import FadeIn from './FadeIn.svelte';

	interface Props {
		edu: Education;
		index?: number;
	}

	let { edu, index = 0 }: Props = $props();

	const logoMap: Record<string, string> = {
		'University of Illinois Urbana-Champaign': '/logos/uiuc.png',
		'Fu Jen Catholic University': '/logos/fju.png'
	};
</script>

<FadeIn delay={index * 100}>
	<article class="education-card">
		<div class="flex gap-4">
			<!-- Logo -->
			<div class="hidden sm:block flex-shrink-0">
				{#if logoMap[edu.school]}
					<div class="logo-container">
						<img
							src={logoMap[edu.school]}
							alt="{edu.school} logo"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{:else}
					<div class="logo-placeholder">
						<span class="text-sm font-medium text-[var(--color-text-subtle)]">
							{edu.school.charAt(0)}
						</span>
					</div>
				{/if}
			</div>

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
					<h3 class="school-name font-medium">{edu.school}</h3>
					<span class="period-badge">{edu.period}</span>
				</div>
				<p class="mt-1 text-sm text-[var(--color-text-muted)]">
					{edu.degree} <span class="text-[var(--color-text-subtle)]">·</span> {edu.location}
				</p>
			</div>
		</div>
	</article>
</FadeIn>

<style>
	.education-card {
		position: relative;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
		margin-left: -1.25rem;
		margin-right: -1.25rem;
		border-radius: 0.75rem;
		transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.education-card:last-child {
		margin-bottom: 0;
	}

	.education-card:hover {
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

	.education-card:hover .logo-container {
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

	.school-name {
		color: var(--color-text);
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
</style>
