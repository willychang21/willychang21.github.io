import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NotFound } from './NotFound';

describe('NotFound', () => {
	it('explains the miss and links home', () => {
		render(<NotFound />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('This stop isn’t on the map.');
		expect(screen.getByRole('link', { name: 'Back to the start' })).toHaveAttribute('href', '/');
	});
});
