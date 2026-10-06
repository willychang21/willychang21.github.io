<script lang="ts">
	let { email }: { email: string } = $props();

	let status = $state<'idle' | 'copied' | 'failed'>('idle');
	let timer: ReturnType<typeof setTimeout>;

	const label = { idle: 'Copy', copied: 'Copied', failed: 'Copy failed' };
	const announcement = {
		idle: '',
		copied: 'Email address copied',
		failed: 'Couldn’t copy. Select the email address instead.'
	};

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

<!-- The label changes in place so feedback never reflows the row. -->
<button type="button" class="copy-button" onclick={copy} aria-label="Copy email address">
	<span aria-hidden="true">{label[status]}</span>
</button>
<span class="sr-only" role="status">{announcement[status]}</span>

<style>
	/* 44px hit area around a small outlined chip. */
	.copy-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.75rem;
		min-width: 2.75rem;
		margin-left: 0.5rem;
		cursor: pointer;
	}

	.copy-button span {
		padding: 0.125rem 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		font-family: 'Poppins', system-ui, sans-serif;
		font-size: 0.75rem;
		color: var(--color-text-subtle);
		white-space: nowrap;
		transition:
			color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out);
	}

	.copy-button:hover span {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}

	@media print {
		.copy-button {
			display: none;
		}
	}
</style>
