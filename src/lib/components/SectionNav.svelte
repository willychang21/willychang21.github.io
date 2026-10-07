<script lang="ts">
	// `icon`: on phones the tab shows a mail icon instead of its label, so five tabs fit.
	let { sections }: { sections: { id: string; title: string; icon?: boolean }[] } = $props();

	let current = $state('');
	// After a nav click, trust the click until the reader scrolls by hand: a short final
	// section can't scroll to the top, so scroll position alone would mark the wrong tab.
	let pinned = false;

	$effect(() => {
		// Track every page section; only listed ones can be marked current.
		const els = [...document.querySelectorAll<HTMLElement>('main section[id]')];
		const listed = new Set(sections.map(({ id }) => id));

		// Current = last section whose top has crossed the reading line, else the first section.
		// The line sits 30% down, then slides to the viewport bottom over the final screen of
		// scroll, so short closing sections (Skills, Contact) each get their turn before the page
		// bottoms out. ponytail: 5 rect reads per scroll is fine.
		const update = () => {
			if (pinned) return;
			const left = document.documentElement.scrollHeight - innerHeight - scrollY;
			const readingLine = innerHeight * (0.3 + 0.7 * Math.max(0, 1 - left / innerHeight));
			const passed = els.filter((el) => el.getBoundingClientRect().top <= readingLine);
			const id = (passed.at(-1) ?? els[0])?.id ?? '';
			current = listed.has(id) ? id : '';
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
		{#each sections as { id, title, icon } (id)}
			<li>
				<a
					href="#{id}"
					class="section-nav-link"
					aria-current={current === id ? 'location' : undefined}
					onclick={() => ((current = id), (pinned = true))}
				>
					{#if icon}
						<svg class="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<span class="tab-text">{title}</span>
					{:else}
						{title}
					{/if}
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

	.tab-icon {
		width: 1.125rem;
		height: 1.125rem;
	}

	/* Phones: icon only, label kept for screen readers. Wider: label only. */
	@media (max-width: 39.99rem) {
		.tab-text {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
	}

	@media (min-width: 40rem) {
		.tab-icon {
			display: none;
		}
	}

	@media print {
		.section-nav {
			display: none;
		}
	}

	/* Wide screens: the bar's background covers the hanging gutter too, so margin labels
	   scroll under it instead of showing beside it. --gutter comes from .page (app.css). */
	@media (min-width: 64rem) {
		.section-nav::before {
			content: '';
			position: absolute;
			inset: 0 0 -1px calc(-1 * (var(--gutter) + 2rem));
			z-index: -1;
			background-color: var(--color-bg);
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
