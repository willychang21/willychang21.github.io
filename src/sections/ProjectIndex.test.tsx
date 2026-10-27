import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { projects } from '../content/work';
import { setMediaQueries } from '../test/setup';
import { ProjectIndex } from './ProjectIndex';

afterEach(() => history.replaceState(null, '', '/'));

describe('ProjectIndex rows', () => {
	it('show each project’s result and stack without opening it', () => {
		render(<ProjectIndex projects={projects} />);
		for (const project of projects) {
			const row = screen.getByRole('button', { name: project.title });
			expect(row).toHaveTextContent(project.outcome.text);
			if (project.outcome.figure) expect(row).toHaveTextContent(project.outcome.figure);
			expect(row).toHaveTextContent(project.stack[0]!);
		}
	});
});

describe('ProjectIndex on narrow screens', () => {
	it('starts closed so the rows read as a list, and toggles like an accordion', async () => {
		const user = userEvent.setup();
		render(<ProjectIndex projects={projects} />);
		const [first, second] = screen.getAllByRole('button');
		for (const row of screen.getAllByRole('button')) expect(row).toHaveAttribute('aria-expanded', 'false');

		await user.click(second!);
		expect(second).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByRole('region', { name: /Muosaic/ })).toBeVisible();

		await user.click(first!);
		expect(first).toHaveAttribute('aria-expanded', 'true');
		expect(second).toHaveAttribute('aria-expanded', 'false');

		await user.click(first!);
		expect(first).toHaveAttribute('aria-expanded', 'false');
	});
});

describe('ProjectIndex on wide screens', () => {
	it('is a tab list with one panel showing', async () => {
		setMediaQueries({ '(min-width: 64rem)': true });
		const user = userEvent.setup();
		render(<ProjectIndex projects={projects} />);

		const tabs = screen.getAllByRole('tab');
		expect(tabs).toHaveLength(projects.length);
		expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
		expect(screen.getAllByRole('tabpanel')).toHaveLength(1);

		await user.click(tabs[2]!);
		expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
		expect(screen.getByRole('tabpanel')).toHaveAccessibleName(projects[2]!.title);
	});

	it('moves between projects with the arrow keys, wrapping at the ends', async () => {
		setMediaQueries({ '(min-width: 64rem)': true });
		const user = userEvent.setup();
		render(<ProjectIndex projects={projects} />);
		const tabs = screen.getAllByRole('tab');

		await user.tab();
		expect(tabs[0]).toHaveFocus();
		await user.keyboard('{ArrowDown}');
		expect(tabs[1]).toHaveFocus();
		expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
		await user.keyboard('{ArrowUp}{ArrowUp}');
		expect(tabs.at(-1)).toHaveFocus();
		await user.keyboard('{Home}');
		expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
	});

	it('does not switch projects on hover', async () => {
		setMediaQueries({ '(min-width: 64rem)': true, '(hover: hover) and (pointer: fine)': true });
		const user = userEvent.setup();
		render(<ProjectIndex projects={projects} />);
		const tabs = screen.getAllByRole('tab');
		await user.hover(tabs[3]!);
		expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
		expect(tabs[3]).toHaveAttribute('aria-selected', 'false');
	});
});

describe('ProjectIndex deep links', () => {
	it('opens the project named in the URL, on wide and narrow screens', () => {
		history.replaceState(null, '', '/#project-muosaic');
		setMediaQueries({ '(min-width: 64rem)': true });
		const scroll = vi.spyOn(Element.prototype, 'scrollIntoView');
		const { unmount } = render(<ProjectIndex projects={projects} />);
		expect(screen.getByRole('tab', { name: 'Muosaic' })).toHaveAttribute('aria-selected', 'true');
		// The page lands on the linked project's row.
		expect(scroll.mock.contexts[0]).toBe(document.getElementById('tab-muosaic'));
		unmount();

		setMediaQueries({});
		render(<ProjectIndex projects={projects} />);
		expect(screen.getByRole('button', { name: 'Muosaic' })).toHaveAttribute('aria-expanded', 'true');
	});

	it('puts the selected project in the URL without adding history entries', async () => {
		setMediaQueries({ '(min-width: 64rem)': true });
		const user = userEvent.setup();
		const before = history.length;
		render(<ProjectIndex projects={projects} />);
		await user.click(screen.getByRole('tab', { name: 'Realtime chat for iOS' }));
		expect(location.hash).toBe('#project-messenger');
		expect(history.length).toBe(before);
	});

	it('ignores hashes that are not projects', () => {
		history.replaceState(null, '', '/#project-nope');
		render(<ProjectIndex projects={projects} />);
		for (const row of screen.getAllByRole('button')) expect(row).toHaveAttribute('aria-expanded', 'false');
	});

	it('clears the hash when the open project is closed', async () => {
		history.replaceState(null, '', '/#project-here');
		const user = userEvent.setup();
		render(<ProjectIndex projects={projects} />);
		await user.click(screen.getByRole('button', { name: 'Here @ UIUC' }));
		expect(location.hash).toBe('');
	});
});
