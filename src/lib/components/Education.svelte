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

<FadeIn delay={index * 80}>
	<article class="mb-8 last:mb-0">
		<div class="flex gap-4">
			<!-- Logo -->
			<div class="hidden sm:block flex-shrink-0">
				{#if logoMap[edu.school]}
					<div class="h-10 w-10 rounded-lg border border-[var(--color-border)] overflow-hidden flex items-center justify-center bg-white">
						<img
							src={logoMap[edu.school]}
							alt="{edu.school} logo"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{:else}
					<div class="h-10 w-10 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center">
						<span class="text-sm font-medium text-[var(--color-text-subtle)]">
							{edu.school.charAt(0)}
						</span>
					</div>
				{/if}
			</div>

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<div class="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
					<h3 class="font-medium text-[var(--color-text)]">{edu.school}</h3>
					<span class="text-sm text-[var(--color-text-subtle)] tabular-nums">{edu.period}</span>
				</div>
				<p class="mt-0.5 text-sm text-[var(--color-text-muted)]">
					{edu.degree} <span class="text-[var(--color-text-subtle)]">·</span> {edu.location}
				</p>
			</div>
		</div>
	</article>
</FadeIn>
