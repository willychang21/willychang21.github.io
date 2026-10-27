import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { DiagramNode } from '../content/types';
import { featured, projects } from '../content/work';
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
		const { container } = render(<SystemDiagram diagram={diagram} />);
		const drawing = within(container.querySelector('ul')!);
		for (const n of diagram.nodes) expect(drawing.getByText(n.label)).toBeInTheDocument();
		expect(screen.getByRole('figure')).toContainElement(screen.getByText(diagram.caption));
	});
});

describe('SystemDiagram text alternative', () => {
	it('describes every connection in words', () => {
		for (const { diagram } of projects) {
			const { container, unmount } = render(<SystemDiagram diagram={diagram} />);
			const text = container.querySelector('figcaption')!.textContent!;
			const byId = new Map(diagram.nodes.map((n) => [n.id, n.label]));
			for (const e of diagram.edges) expect(text).toContain(`${byId.get(e.from)} to ${byId.get(e.to)}`);
			unmount();
		}
	});

	it('keeps every note in the key for narrow screens', () => {
		const { diagram } = projects.find((p) => p.id === 'orchestrator')!;
		const { container } = render(<SystemDiagram diagram={diagram} />);
		const key = container.querySelector('dl')!;
		for (const n of diagram.nodes.filter((n) => n.note)) expect(key).toHaveTextContent(`${n.label}${n.note}`);
	});
});

describe('SystemDiagram marks', () => {
	it('numbers the named stations and spells the numbers out in the caption', () => {
		const { diagram } = featured;
		const { container } = render(<SystemDiagram diagram={diagram} marks={{ intake: '1', aop: '2' }} />);
		const labels = [...container.querySelectorAll('li')];
		expect(labels.find((li) => li.textContent?.includes('Intake'))!.querySelector('.mark')).toHaveTextContent('1');
		expect(container.querySelectorAll('.mark')).toHaveLength(2);
		expect(container.querySelector('figcaption')).toHaveTextContent('1, Intake; 2, AOP');
	});
});

describe('SystemDiagram key', () => {
	it('says what orange means, per drawing', () => {
		const orchestrator = projects.find((p) => p.id === 'orchestrator')!.diagram;
		const { container, unmount } = render(<SystemDiagram diagram={orchestrator} legend />);
		expect(container.querySelector('figcaption')).toHaveTextContent('Orange marks the critical path.');
		unmount();
		const here = projects.find((p) => p.id === 'here')!.diagram;
		render(<SystemDiagram diagram={here} legend />);
		expect(screen.getByRole('figure')).toHaveTextContent('Orange marks the part I built or changed.');
	});
});
