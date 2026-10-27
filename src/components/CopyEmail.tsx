import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from './Icon';
import styles from './CopyEmail.module.css';

type Status = 'idle' | 'copied' | 'failed';

const isApple = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

/**
 * Copies the address. If the clipboard is blocked it selects the address instead (it is
 * always the previous sibling) and says which keys to press.
 */
export function CopyEmail({ email }: { email: string }) {
	const [status, setStatus] = useState<Status>('idle');
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	const button = useRef<HTMLButtonElement>(null);

	useEffect(() => () => clearTimeout(timer.current), []);

	async function copy() {
		let next: Status = 'copied';
		try {
			await navigator.clipboard.writeText(email);
		} catch {
			const address = button.current?.previousElementSibling;
			if (address) getSelection()?.selectAllChildren(address);
			next = 'failed';
		}
		setStatus(next);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setStatus('idle'), next === 'failed' ? 5000 : 2000);
	}

	const label = { idle: 'Copy', copied: 'Copied', failed: isApple() ? 'Press ⌘C' : 'Press Ctrl+C' }[status];
	const announcement = {
		idle: '',
		copied: 'Email address copied.',
		failed: 'Couldn’t copy automatically. The address is selected; copy it with your keyboard.'
	}[status];

	return (
		<>
			<button
				ref={button}
				type="button"
				className={styles.copy}
				onClick={copy}
				data-status={status}
				data-print="hide"
				aria-label={status === 'idle' ? 'Copy email address' : label}
			>
				{status === 'copied' ? <Check /> : <Copy />}
				<span>{label}</span>
			</button>
			<span className="sr-only" role="status">
				{announcement}
			</span>
		</>
	);
}
