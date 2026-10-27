import type { CSSProperties } from 'react';
import type { Diagram, DiagramNode } from '../content/types';
import styles from './SystemDiagram.module.css';

// Nodes sit on a 12 × 8 grid; the drawing adds a margin so labels at the edges fit.
const UNIT_X = 48;
const UNIT_Y = 40;
const PAD_X = 24;
const PAD_Y = 36;
export const WIDTH = PAD_X * 2 + UNIT_X * 12;
export const HEIGHT = PAD_Y * 2 + UNIT_Y * 8;

const px = (n: DiagramNode) => PAD_X + n.x * UNIT_X;
const py = (n: DiagramNode) => PAD_Y + n.y * UNIT_Y;

/**
 * An octilinear connection, as on a transit map: straight out of the first station, one
 * 45° run, straight into the second.
 */
export function edgePath(a: DiagramNode, b: DiagramNode): string {
	const [x1, y1, x2, y2] = [px(a), py(a), px(b), py(b)];
	const dx = x2 - x1;
	const dy = y2 - y1;
	const diagonal = Math.min(Math.abs(dx), Math.abs(dy));
	const sx = Math.sign(dx);
	const sy = Math.sign(dy);
	if (Math.abs(dx) >= Math.abs(dy)) {
		const run = (Math.abs(dx) - diagonal) / 2;
		return `M${x1} ${y1}h${sx * run}l${sx * diagonal} ${sy * diagonal}H${x2}`;
	}
	const run = (Math.abs(dy) - diagonal) / 2;
	return `M${x1} ${y1}v${sy * run}l${sx * diagonal} ${sy * diagonal}V${y2}`;
}

function Marker({ node }: { node: DiagramNode }) {
	const [x, y] = [px(node), py(node)];
	switch (node.kind) {
		case 'store':
			// Stores read as interchanges: a capsule.
			return <rect x={x - 12} y={y - 7} width={24} height={14} rx={7} className={styles.marker} />;
		case 'external':
			return <rect x={x - 7} y={y - 7} width={14} height={14} className={styles.marker} />;
		case 'actor':
			return <circle cx={x} cy={y} r={7} className={`${styles.marker} ${styles.actor}`} />;
		default:
			return <circle cx={x} cy={y} r={7} className={styles.marker} />;
	}
}

/**
 * `legend` adds the key for the orange line; leave it off where the work is a team's.
 * `marks` numbers stations (by node id) to match a numbered list beside the drawing.
 */
export function SystemDiagram({ diagram, legend = false, marks = {} }: { diagram: Diagram; legend?: boolean; marks?: Record<string, string> }) {
	const byId = new Map(diagram.nodes.map((n) => [n.id, n]));
	// The key spells out notes, and full names wherever the drawing shortens one.
	const noted = diagram.nodes.filter((n) => n.note || n.short);
	const ordered = [...diagram.edges].sort((a, b) => Number(a.route ?? false) - Number(b.route ?? false));

	return (
		<figure className={styles.diagram}>
			<div className={styles.canvas} style={{ '--ratio': `${WIDTH} / ${HEIGHT}` } as CSSProperties}>
				<svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" className={styles.svg}>
					{ordered.map((edge) => {
						const d = edgePath(byId.get(edge.from)!, byId.get(edge.to)!);
						return edge.route ? (
							<g key={`${edge.from}-${edge.to}`}>
								<path d={d} className={styles.casing} />
								<path d={d} className={styles.route} pathLength={1} />
							</g>
						) : (
							<path key={`${edge.from}-${edge.to}`} d={d} className={styles.edge} />
						);
					})}
					{diagram.nodes.map((node) => (
						<Marker key={node.id} node={node} />
					))}
				</svg>
				{/* Labels are HTML so they stay legible when the drawing scales down. */}
				<ul className={styles.labels}>
					{diagram.nodes.map((node) => (
						<li
							key={node.id}
							className={styles.label}
							data-at={node.labelAt ?? 'below'}
							data-edge={node.x <= 1 ? 'start' : node.x >= 11 ? 'end' : undefined}
							style={{ left: `${(px(node) / WIDTH) * 100}%`, top: `${(py(node) / HEIGHT) * 100}%` }}
						>
							<span className={styles.name}>
								{marks[node.id] && (
									<span className={`mark ${styles.mark}`} aria-hidden="true">
										{marks[node.id]}
									</span>
								)}
								<span className={node.short ? styles.full : undefined}>{node.label}</span>
								{node.short && (
									<span className={styles.short} aria-hidden="true">
										{node.short}
									</span>
								)}
							</span>
							{node.note && <span className={styles.note}>{node.note}</span>}
						</li>
					))}
				</ul>
			</div>
			{/* Narrow drawings show names only; the notes move here, at reading size. */}
			{noted.length > 0 && (
				<dl className={styles.notes} aria-hidden="true">
					{noted.map((n) => (
						<div key={n.id}>
							<dt>{n.short ?? n.label}</dt>
							<dd>{n.short ? n.label : n.note}</dd>
						</div>
					))}
				</dl>
			)}
			<figcaption className={styles.caption}>
				{diagram.caption}
				{legend && <span className={styles.key}> {diagram.key ?? 'Orange marks the part I built or changed.'}</span>}
				{Object.keys(marks).length > 0 && (
					<span className={styles.key}>
						{' '}
						Numbers match My part
						<span className="sr-only">
							: {Object.entries(marks)
								.map(([id, mark]) => `${mark}, ${byId.get(id)!.label}`)
								.join('; ')}
						</span>
						.
					</span>
				)}
				{/* The drawing's lines, in words. */}
				<span className="sr-only">
					{' '}
					Connections:{' '}
					{diagram.edges.map((e) => `${byId.get(e.from)!.label} to ${byId.get(e.to)!.label}`).join('; ')}.
				</span>
			</figcaption>
		</figure>
	);
}
