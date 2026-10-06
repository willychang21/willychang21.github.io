<script lang="ts">
	import ExternalIcon from './ExternalIcon.svelte';

	// Renders a résumé bullet: **metric** becomes bold, [label](url) becomes an external link.
	let { text }: { text: string } = $props();

	const parts = $derived(
		text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/).map((part) => {
			const link = part.match(/^\[(.+?)\]\((.+?)\)$/);
			if (link) return { kind: 'link' as const, label: link[1], url: link[2] };
			if (part.startsWith('**')) return { kind: 'strong' as const, label: part.slice(2, -2) };
			return { kind: 'text' as const, label: part };
		})
	);
</script>

{#each parts as part, i (i)}{#if part.kind === 'link'}<a
			href={part.url}
			target="_blank"
			aria-describedby="new-tab-note"
			rel="noopener noreferrer"
			class="entry-link text-link">{part.label}<ExternalIcon /></a
		>{:else if part.kind === 'strong'}<strong>{part.label}</strong>{:else}{part.label}{/if}{/each}
