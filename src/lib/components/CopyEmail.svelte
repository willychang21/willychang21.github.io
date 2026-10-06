<script lang="ts">
	let { email }: { email: string } = $props();

	let status = $state<'idle' | 'copied' | 'failed'>('idle');
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		try {
			await navigator.clipboard.writeText(email);
			status = 'copied';
		} catch {
			// Clipboard blocked (permissions or insecure context): say so; the mailto link still works.
			status = 'failed';
		}
		clearTimeout(timer);
		timer = setTimeout(() => (status = 'idle'), status === 'failed' ? 5000 : 2000);
	}
</script>

<button type="button" class="copy-button" onclick={copy} aria-label="Copy email address">
	<span aria-hidden="true">{status === 'copied' ? 'Copied' : 'Copy'}</span>
</button>
<span class="copy-status" class:sr-only={status !== 'failed'} role="status">
	{status === 'copied' ? 'Email address copied' : status === 'failed' ? 'Couldn’t copy. Select the address instead.' : ''}
</span>

<style>
	.copy-button {
		min-height: 2.75rem;
		min-width: 3.5rem;
		padding-inline: 0.5rem;
		margin-left: 0.25rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.75rem;
		color: var(--color-text-subtle);
		cursor: pointer;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.copy-button:hover {
		color: var(--color-accent);
	}

	.copy-status {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	@media print {
		.copy-button,
		.copy-status {
			display: none;
		}
	}
</style>
