<script lang="ts">
	let { src, name }: { src?: string; name: string } = $props();
</script>

<!-- Logos are decorative: the organisation is named in the adjacent heading. -->
<div class="hidden flex-shrink-0 sm:block" aria-hidden="true">
	{#if src}
		<div class="logo-plate">
			<img {src} alt="" width="44" height="44" class="h-full w-full object-cover" loading="lazy" decoding="async" />
		</div>
	{:else}
		<div class="logo-plate logo-plate--empty">{name.charAt(0)}</div>
	{/if}
</div>
