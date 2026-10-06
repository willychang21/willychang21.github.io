<script lang="ts">
	// Renders a résumé bullet, bolding **marked** metrics so skimmers find them.
	let { text }: { text: string } = $props();

	const parts = $derived(text.split(/\*\*(.+?)\*\*/));
</script>

{#each parts as part, i (i)}{#if i % 2}<strong>{part}</strong>{:else}{part}{/if}{/each}
