import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { DiagramNode } from '../content/types';
import { projects } from '../content/work';
import { edgePath, SystemDiagram } from './SystemDiagram';

const node = (x: number, y: number): DiagramNode => ({ id: `${x}-${y}`, label: '', x, y, kind: 'service' });

/** Every segment of the path is horizontal, vertical or at 45°. */
function isOctilinear(d: string) {
	const moves = [...d.matchAll(/([hHvVlL])(-?[\d.]+)(?:\s(-?[\d.]+))?/g)];
	return moves.every(([, cmd, a, b]) => cmd!.toLowerCase() !== 'l' || Math.abs(Number(a)) === Math.abs(Number(b)));
}

describe('edgePath', () => {
	it('draws straight lines between aligned stations', () => {
		expect(edgePath(node(1, 4), node(5, 4))).toBe('M72 196h96l0 0H264');
	});

	it('keeps every bend at 45°', () => {
		for (const [a, b] of [
			[node(1, 2), node(5, 4)],
			[node(7, 4), node(11, 1)],
			[node(5, 4), node(5, 7)],
			[node(4, 2), node(7, 5)],
			[node(1, 1), node(3, 8)]
		] as const) {
			expect(isOctilinear(edgePath(a, b)), `${a.id} → ${b.id}`).toBe(true);
		}
	});
});

describe('SystemDiagram', () => {
	it('names every node in text and captions the figure', () => {
		const { diagram } = projects[0]!;
		render(<SystemDiagram diagram={diagram} />);
		for (const n of diagram.nodes) expect(screen.getByText(n.label)).toBeInTheDocument();
		expect(screen.getByRole('figure')).toContainElement(screen.getByText(diagram.caption));
	});
});
