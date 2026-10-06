<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		delay?: number;
		duration?: number;
		y?: number;
	}

	let { children, delay = 0, duration = 500, y = 12 }: Props = $props();

	let visible = $state(false);
	let element: HTMLDivElement;

	$effect(() => {
		if (typeof IntersectionObserver === 'undefined') {
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0, rootMargin: '0px 0px -40px 0px' }
		);

		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class="fade-in"
	style:opacity={visible ? 1 : 0}
	style:transform={visible ? 'none' : `translateY(${y}px)`}
	style:transition-delay="{delay}ms"
	style:--duration="{duration}ms"
>
	{@render children()}
</div>

<style>
	.fade-in {
		transition:
			opacity var(--duration) var(--ease-out),
			transform var(--duration) var(--ease-out);
	}

	/* Prerendered HTML ships hidden; keep it readable without JS or with reduced motion. */
	@media (scripting: none), (prefers-reduced-motion: reduce) {
		.fade-in {
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
