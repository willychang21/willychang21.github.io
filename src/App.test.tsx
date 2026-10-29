import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { sections } from './content/navigation';

describe('App', () => {
	it('opens on a statement that names Willy', () => {
		render(<App />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^Willy Chang builds the systems/);
	});

	it('links every navigation item to a section that exists', () => {
		const { container } = render(<App />);
		const nav = screen.getAllByRole('navigation', { name: 'Sections' })[0]!;
		const links = within(nav).getAllByRole('link');
		expect(links.map((l) => l.textContent)).toEqual(sections.map((s) => s.label));
		for (const link of links) {
			const id = link.getAttribute('href')!.slice(1);
			expect(container.querySelector(`section#${id}`), id).not.toBeNull();
			expect(screen.getByRole('region', { name: link.textContent! })).toBeInTheDocument();
		}
	});

	it('resolves every in-page link', () => {
		const { container } = render(<App />);
		for (const link of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
			const id = link.getAttribute('href')!.slice(1);
			expect(document.getElementById(id), `#${id}`).not.toBeNull();
		}
	});

	it('names what AOP is built with', () => {
		render(<App />);
		const aop = screen.getByRole('article', { name: /AOP/ });
		expect(aop).toHaveTextContent('Built with Go, Kitex, Hertz, Modern.js, Vector search, MCP');
	});

	it('offers email, GitHub and the résumé', () => {
		render(<App />);
		expect(screen.getAllByRole('link', { name: 'willysde2025@gmail.com' })[0]).toHaveAttribute(
			'href',
			'mailto:willysde2025@gmail.com'
		);
		expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute('href', 'https://github.com/willychang21');
		expect(screen.getByRole('button', { name: 'Save the résumé as PDF' })).toBeInTheDocument();
	});

	it('gives every image a text alternative', () => {
		const { container } = render(<App />);
		for (const img of container.querySelectorAll('img')) expect(img).toHaveAttribute('alt');
		expect(screen.getByRole('img', { name: /route drawn from Taipei/ })).toBeInTheDocument();
	});

	it('includes the résumé record, without the Showu internship', () => {
		render(<App />);
		const experience = screen.getByRole('region', { name: 'Experience' });
		expect(within(experience).queryByText('Showu Tech')).toBeNull();
		for (const company of ['TikTok', 'Kocree', 'University of Illinois Urbana-Champaign', 'Fu Jen Catholic University'])
			expect(within(experience).getAllByRole('heading', { name: company }).length).toBeGreaterThan(0);
	});
});
