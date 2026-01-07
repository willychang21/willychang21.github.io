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

<FadeIn delay={index * 80}>
	<article class="group relative mb-8 last:mb-0">
		<div class="flex gap-4">
			<!-- Logo -->
			<div class="hidden sm:block flex-shrink-0">
				{#if logoMap[exp.company]}
					<div class="h-10 w-10 rounded-lg border border-[var(--color-border)] overflow-hidden flex items-center justify-center bg-white">
						<img
							src={logoMap[exp.company]}
							alt="{exp.company} logo"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{:else}
					<div class="h-10 w-10 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center">
						<span class="text-sm font-medium text-[var(--color-text-subtle)]">
							{exp.company.charAt(0)}
						</span>
					</div>
				{/if}
			</div>

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
					<h3 class="font-medium text-[var(--color-text)]">
						{#if exp.url}
							<a
								href={exp.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors"
							>
								{exp.company}
								<svg class="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-50 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						{:else}
							{exp.company}
						{/if}
					</h3>
					<span class="text-sm text-[var(--color-text-subtle)] tabular-nums">{exp.period}</span>
				</div>

				<p class="mt-0.5 text-sm text-[var(--color-text-muted)]">
					{exp.title} <span class="text-[var(--color-text-subtle)]">·</span> {exp.location}
				</p>

				<ul class="mt-3 space-y-2">
					{#each exp.highlights as highlight, i (i)}
						<li class="text-sm text-[var(--color-text-muted)] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-border)]">
							{highlight}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</article>
</FadeIn>
