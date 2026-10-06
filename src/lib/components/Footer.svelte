<script lang="ts">
	import type { ResumeData } from '#lib/data/resume.ts';
	import ContactLinks from './ContactLinks.svelte';

	let { resume }: { resume: ResumeData } = $props();
</script>

<footer id="contact" aria-labelledby="contact-title" class="mt-20 scroll-mt-16 border-t border-[var(--color-border)] pt-10">
	<h2 id="contact-title" class="text-xl font-semibold">Contact</h2>
	<div class="mt-2">
		<ContactLinks {resume} label="Contact (footer)" />
	</div>
</footer>
