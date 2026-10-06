<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import ContactLinks from './ContactLinks.svelte';

	let { resume }: { resume: ResumeData } = $props();
</script>

<header>
	<div class="flex items-center gap-5">
		<img src="/avatar.jpg" alt="" width="72" height="72" class="avatar" fetchpriority="high" />
		<div>
			<h1 class="text-3xl font-semibold md:text-4xl">{resume.name}</h1>
			<p class="mt-1 font-[Poppins] text-sm text-[var(--color-text-muted)]">{resume.role}</p>
		</div>
	</div>

	<p class="headline mt-6">{resume.headline}</p>

	<div class="mt-3">
		<ContactLinks {resume} label="Contact" />
	</div>
</header>

<style>
	.avatar {
		flex-shrink: 0;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 9999px;
		object-fit: cover;
		border: 3px solid var(--color-border);
	}

	.headline {
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--color-text-muted);
		max-width: 38rem;
	}
</style>
