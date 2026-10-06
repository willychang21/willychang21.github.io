<script lang="ts">
	let { sections }: { sections: { id: string; title: string }[] } = $props();

	let current = $state('');

	$effect(() => {
		if (typeof IntersectionObserver === 'undefined') return;

		// ponytail: a section is "current" while it crosses the band just below the nav.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) current = entry.target.id;
				}
			},
			{ rootMargin: '-15% 0px -80% 0px' }
		);

		for (const { id } of sections) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<nav aria-label="Sections" class="section-nav">
	<ul class="flex gap-x-5 overflow-x-auto">
		{#each sections as { id, title } (id)}
			<li>
				<a href="#{id}" class="section-nav-link" aria-current={current === id ? 'location' : undefined}>
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
		margin-top: 2.5rem;
		background-color: var(--color-bg);
		border-bottom: 1px solid var(--color-border);
	}

	.section-nav-link {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.8125rem;
		white-space: nowrap;
		color: var(--color-text-subtle);
		box-shadow: inset 0 -2px 0 transparent;
		transition:
			color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
	}

	.section-nav-link:hover {
		color: var(--color-text);
	}

	.section-nav-link[aria-current] {
		color: var(--color-text);
		box-shadow: inset 0 -2px 0 var(--color-accent);
	}
</style>
