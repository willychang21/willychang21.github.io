import { m, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { legs, stations } from '../content/profile';
import { routeMap } from '../content/route-map.generated';
import styles from './RoutePlate.module.css';

const { width, height, step, cols, mask } = routeMap;

/** One zero-length, round-capped segment per land cell: a dot matrix in a single path. */
function landPath(): string {
	let d = '';
	mask.forEach((row, r) => {
		for (let c = 0; c < cols; c++) {
			const nibble = parseInt(row[c >> 2] ?? '0', 16);
			if (nibble & (8 >> (c & 3))) d += `M${(c + 0.5) * step} ${(r + 0.5) * step}h0`;
		}
	});
	return d;
}
const land = landPath();

const position = (id: string) => {
	const s = routeMap.stations.find((station) => station.id === id)!;
	return { x: s.x, y: s.y, left: `${(s.x / width) * 100}%`, top: `${(s.y / height) * 100}%` };
};

// Legs draw one after another, each taking time in proportion to its length; a station
// lands as its leg arrives.
const length = (d: string) => {
	const pts = d.split(/[ML]/).filter(Boolean).map((p) => p.split(' ').map(Number));
	return pts.slice(1).reduce((sum, [x, y], i) => sum + Math.hypot(x! - pts[i]![0]!, y! - pts[i]![1]!), 0);
};
const lengths = routeMap.legs.map((leg) => length(leg.d));
const total = lengths.reduce((a, b) => a + b, 0);
const timing = lengths.reduce<{ delay: number; duration: number }[]>((acc, len) => {
	const prev = acc.at(-1);
	acc.push({ delay: prev ? prev.delay + prev.duration : 0.4, duration: Math.max(0.5, (2.6 * len) / total) });
	return acc;
}, []);
const arrival: Record<string, number> = { [routeMap.legs[0]!.from]: 0.2 };
routeMap.legs.forEach((leg, i) => (arrival[leg.to] = timing[i]!.delay + timing[i]!.duration - 0.1));

/**
 * Plate 1: the route from Taipei to Seattle, Champaign and San Jose, across the Pacific. The SVG is
 * the drawing; station labels are HTML on top of it so they stay crisp and readable at
 * any width.
 */
export function RoutePlate() {
	const still = useReducedMotion() ?? false;
	const reveal = (delay: number) =>
		still ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.5 } };

	return (
		<figure className={styles.plate} aria-labelledby="plate-caption">
			<div className={styles.frame} style={{ '--ratio': `${width} / ${height}` } as CSSProperties}>
				<svg
					viewBox={`0 0 ${width} ${height}`}
					className={styles.map}
					role="img"
					aria-label="Map of the North Pacific with a route drawn from Taipei to Seattle, on to Champaign, Illinois, and then San Jose, California."
				>
					<g className={styles.graticule}>
						{routeMap.meridians.map((mer) => (
							<line key={mer.label} x1={mer.x} x2={mer.x} y1={0} y2={height} />
						))}
						{routeMap.parallels.map((par) => (
							<line key={par.label} x1={0} x2={width} y1={par.y} y2={par.y} />
						))}
					</g>
					<g className={styles.graticuleLabels} aria-hidden="true">
						{routeMap.meridians.map((mer) => (
							<text key={mer.label} x={mer.x + 6} y={16}>
								{mer.label}
							</text>
						))}
						{routeMap.parallels.map((par) => (
							<text key={par.label} x={width - 6} y={par.y - 6} textAnchor="end">
								{par.label}
							</text>
						))}
					</g>

					<path d={land} className={styles.land} strokeWidth={step * 0.42} />

					{routeMap.legs.map((leg, i) => {
						const t = timing[i]!;
						const draw = still
							? {}
							: {
									initial: { pathLength: 0 },
									animate: { pathLength: 1 },
									transition: { delay: t.delay, duration: t.duration, ease: [0.65, 0, 0.35, 1] as const }
								};
						return (
							<g key={leg.from}>
								<path d={leg.d} className={styles.casing} />
								<m.path d={leg.d} className={styles.route} {...draw} />
							</g>
						);
					})}

					{routeMap.stations.map((s) => (
						<m.g key={s.id} {...reveal(arrival[s.id]!)}>
							{s.id === 'sjc' && <circle cx={s.x} cy={s.y} r={10} className={styles.pulse} />}
							<circle cx={s.x} cy={s.y} r={8} className={styles.station} />
							{s.id === 'sjc' && <circle cx={s.x} cy={s.y} r={3.5} className={styles.here} />}
						</m.g>
					))}
				</svg>

				<ol className={styles.labels}>
					{legs.map((leg) => {
						const at = position(leg.station);
						const station = stations[leg.station];
						return (
							<m.li
								key={leg.station}
								className={styles.label}
								data-station={leg.station}
								style={{ left: at.left, top: at.top }}
								{...reveal(arrival[leg.station]! + 0.2)}
							>
								<a href={`#${leg.anchor}`}>
									<span className={styles.code}>{station.code}</span>
									<span className={styles.city}>{station.city}</span>
									<span className={styles.years}>{leg.years}</span>
								</a>
							</m.li>
						);
					})}
				</ol>
			</div>

			<figcaption id="plate-caption" className={styles.caption}>
				<span>Plate 1. Taipei, Seattle, Champaign, San Jose, along great circles.</span>{' '}
				<span>Plate carrée centred on 163°W. Land from Natural Earth.</span>
			</figcaption>

			{/* Phones and tablets: the station labels, as one strip under the map. */}
			<ol className={styles.legend}>
				{legs.map((leg) => {
					const station = stations[leg.station];
					return (
						<li key={leg.station}>
							<a href={`#${leg.anchor}`}>
								<span className={styles.code}>{station.code}</span>
								<span className={styles.city}>{station.city}</span>
								<span className={styles.years}>{leg.years}</span>
							</a>
						</li>
					);
				})}
			</ol>
		</figure>
	);
}
