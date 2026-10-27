import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CopyEmail } from './CopyEmail';

const email = 'willysde2025@gmail.com';

function setup(writeText: (text: string) => Promise<void>) {
	const user = userEvent.setup();
	Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
	render(
		<p>
			<a href={`mailto:${email}`}>{email}</a>
			<CopyEmail email={email} />
		</p>
	);
	return user;
}

describe('CopyEmail', () => {
	it('copies the address and says so', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		const user = setup(writeText);
		await user.click(screen.getByRole('button', { name: 'Copy email address' }));
		expect(writeText).toHaveBeenCalledWith(email);
		expect(screen.getByRole('button')).toHaveTextContent('Copied');
		expect(screen.getByRole('status')).toHaveTextContent('Email address copied.');
	});

	it('selects the address when the clipboard is blocked', async () => {
		const user = setup(() => Promise.reject(new Error('denied')));
		await user.click(screen.getByRole('button', { name: 'Copy email address' }));
		expect(getSelection()?.toString()).toBe(email);
		expect(screen.getByRole('button')).toHaveTextContent(/Press (⌘C|Ctrl\+C)/);
		expect(screen.getByRole('status')).toHaveTextContent(/address is selected/);
	});

	it('returns to its resting label', async () => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
		const user = setup(vi.fn().mockResolvedValue(undefined));
		await user.click(screen.getByRole('button'));
		await act(() => vi.advanceTimersByTimeAsync(2100));
		expect(screen.getByRole('button')).toHaveTextContent('Copy');
		vi.useRealTimers();
	});
});
