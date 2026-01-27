<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		delay?: number;
		duration?: number;
		y?: number;
		scale?: number;
	}

	let { children, delay = 0, duration = 400, y = 12, scale = 1 }: Props = $props();

	let visible = $state(false);
	let element: HTMLDivElement;

	$effect(() => {
		if (typeof IntersectionObserver === 'undefined') {
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);

		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	});

	const initialScale = scale < 1 ? scale : 0.98;
</script>

<div
	bind:this={element}
	class="fade-in-wrapper"
	style:opacity={visible ? 1 : 0}
	style:transform={visible ? 'translateY(0) scale(1)' : `translateY(${y}px) scale(${initialScale})`}
	style:transition-delay="{delay}ms"
	style:--duration="{duration}ms"
>
	{@render children()}
</div>

<style>
	.fade-in-wrapper {
		transition:
			opacity var(--duration) cubic-bezier(0.22, 1, 0.36, 1),
			transform var(--duration) cubic-bezier(0.22, 1, 0.36, 1);
		will-change: opacity, transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.fade-in-wrapper {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
