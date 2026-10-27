import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
	beforeEach(() => {
		document.documentElement.className = 'light';
		localStorage.clear();
	});

	it('switches the theme class and remembers the choice', async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);
		await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
		expect(document.documentElement).toHaveClass('dark');
		expect(document.documentElement).not.toHaveClass('light');
		expect(localStorage.getItem('theme')).toBe('dark');
		expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
	});
});
