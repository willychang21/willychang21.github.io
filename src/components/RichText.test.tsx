import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { parseRichText, RichText } from './RichText';

describe('RichText', () => {
	it('splits bold figures and links out of plain text', () => {
		expect(parseRichText('Built [Here](https://here.illinois.edu/) for **5,000+ students**.')).toEqual([
			{ kind: 'text', text: 'Built ' },
			{ kind: 'link', text: 'Here', href: 'https://here.illinois.edu/' },
			{ kind: 'text', text: ' for ' },
			{ kind: 'strong', text: '5,000+ students' },
			{ kind: 'text', text: '.' }
		]);
	});

	it('leaves unmarked text alone', () => {
		expect(parseRichText('Plain line, no marks.')).toEqual([{ kind: 'text', text: 'Plain line, no marks.' }]);
	});

	it('renders links and strong text', () => {
		render(
			<p>
				<RichText>{'See [Muosaic](https://muosaic-demo.kocree.net/home), **up to 25%**'}</RichText>
			</p>
		);
		expect(screen.getByRole('link', { name: 'Muosaic' })).toHaveAttribute('href', 'https://muosaic-demo.kocree.net/home');
		expect(screen.getByText('up to 25%').tagName).toBe('STRONG');
	});
});
