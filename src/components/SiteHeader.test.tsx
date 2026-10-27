import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LazyMotion, domAnimation } from 'motion/react';
import { describe, expect, it } from 'vitest';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
	it('opens the index sheet on phones and closes it when a section is chosen', async () => {
		const user = userEvent.setup();
		const { container } = render(
			<LazyMotion features={domAnimation}>
				<SiteHeader />
			</LazyMotion>
		);
		const dialog = container.querySelector('dialog')!;
		expect(dialog.open).toBe(false);

		await user.click(screen.getByRole('button', { name: 'Index' }));
		expect(dialog.open).toBe(true);

		await user.click(within(dialog).getByRole('link', { name: 'Experience' }));
		expect(dialog.open).toBe(false);
	});

	it('closes the sheet with its close button', async () => {
		const user = userEvent.setup();
		const { container } = render(
			<LazyMotion features={domAnimation}>
				<SiteHeader />
			</LazyMotion>
		);
		await user.click(screen.getByRole('button', { name: 'Index' }));
		await user.click(screen.getByRole('button', { name: 'Close' }));
		expect(container.querySelector('dialog')!.open).toBe(false);
	});
});
