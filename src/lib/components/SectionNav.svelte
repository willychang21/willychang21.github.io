<script lang="ts">
	let { sections }: { sections: { id: string; title: string }[] } = $props();

	let current = $state('');
	// After a nav click, trust the click until the reader scrolls by hand: a short final
	// section can't scroll to the top, so scroll position alone would mark the wrong tab.
	let pinned = false;

	$effect(() => {
		const els = sections.map(({ id }) => document.getElementById(id)).filter((el) => el !== null);

		// Current = last section whose top has crossed the reading line (30% down), else the first
		// section; at page bottom the last section wins, since a short final section never reaches
		// the line. ponytail: 5 rect reads per scroll is fine.
		const update = () => {
			if (pinned) return;
			// Bottom of page only hands over to the last section once its heading is on screen.
			const atBottom =
				innerHeight + scrollY >= document.documentElement.scrollHeight - 2 &&
				(els.at(-1)?.getBoundingClientRect().top ?? Infinity) < innerHeight - 120;
			const readingLine = innerHeight * 0.3;
			const passed = els.filter((el) => el.getBoundingClientRect().top <= readingLine);
			current = (atBottom ? els.at(-1) : (passed.at(-1) ?? els[0]))?.id ?? '';
		};

		const unpin = () => (pinned = false);
		const manual = ['wheel', 'touchstart', 'keydown'] as const;

		update();
		addEventListener('scroll', update, { passive: true });
		for (const type of manual) addEventListener(type, unpin, { passive: true });
		return () => {
			removeEventListener('scroll', update);
			for (const type of manual) removeEventListener(type, unpin);
		};
	});
</script>

<nav aria-label="Sections" class="section-nav">
	<ul class="flex justify-between overflow-x-auto sm:justify-start sm:gap-x-3">
		{#each sections as { id, title } (id)}
			<li>
				<a
					href="#{id}"
					class="section-nav-link"
					aria-current={current === id ? 'location' : undefined}
					onclick={() => ((current = id), (pinned = true))}
				>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.section-nav {
		position: sticky;
		top: 0;
		z-index: 10;
		margin-top: 1.5rem;
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
	}

	@media print {
		.section-nav {
			display: none;
		}
	}

	.section-nav-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.75rem;
		min-width: 2.75rem;
		padding-inline: 0.25rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.8125rem;
		white-space: nowrap;
		color: var(--color-text-muted);
		box-shadow: inset 0 -2px 0 transparent;
		transition:
			color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
	}

	@media (min-width: 40rem) {
		.section-nav-link {
			font-size: 0.875rem;
			padding-inline: 0.5rem;
		}
	}

	.section-nav-link:hover {
		color: var(--color-text);
	}

	.section-nav-link[aria-current] {
		color: var(--color-text);
		box-shadow: inset 0 -2px 0 var(--color-accent);
	}
</style>
