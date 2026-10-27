import { m, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { route, stopFromHash, stopHash } from '../content/route';
import { routeMap } from '../content/route-map.generated';
import type { Station } from '../content/types';
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
 * Plate 1: the route from Taipei to Seattle, Champaign and San Jose, across the Pacific,
 * and the way into everything that happened along it. The stations are tabs: choosing
 * one shows the roles, degrees and projects recorded there, and the route beyond it
 * fades, so the map reads as the journey up to that point. San Jose, now, is chosen
 * at first, with the whole route travelled.
 *
 * The SVG is the drawing; the stations are HTML on top of it so they stay crisp and
 * readable at any width. On phones and tablets they leave the map and form one strip
 * under it.
 */
export function RoutePlate() {
	const still = useReducedMotion() ?? false;
	const reveal = (delay: number) =>
		still ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.5 } };

	const [selected, setSelected] = useState<Station['id']>(() => stopFromHash(location.hash) ?? route.at(-1)!.station.id);
	const at = route.findIndex((stop) => stop.station.id === selected);
	const figure = useRef<HTMLElement>(null);
	const tabs = useRef(new Map<string, HTMLButtonElement>());

	// #stop-<id>, from a station code elsewhere on the page or from another site, chooses
	// that stop and brings the whole plate into view, not just the station's label.
	useEffect(() => {
		const follow = (focus: boolean) => {
			const id = stopFromHash(location.hash);
			if (!id) return;
			setSelected(id);
			requestAnimationFrame(() => {
				figure.current?.scrollIntoView({ block: 'start' });
				if (focus) tabs.current.get(id)?.focus({ preventScroll: true });
			});
		};
		follow(false);
		const onHashChange = () => follow(true);
		addEventListener('hashchange', onHashChange);
		return () => removeEventListener('hashchange', onHashChange);
	}, []);

	const choose = (id: Station['id']) => {
		setSelected(id);
		// Keep a stop link in the address bar truthful; otherwise leave the URL alone, so
		// exploring the map doesn't overwrite a project link.
		if (stopFromHash(location.hash)) history.replaceState(history.state, '', stopHash(id));
	};

	// A route has two ends, so the keys stop there rather than wrapping.
	function onKeyDown(event: KeyboardEvent) {
		const last = route.length - 1;
		const next = { ArrowRight: at + 1, ArrowDown: at + 1, ArrowLeft: at - 1, ArrowUp: at - 1, Home: 0, End: last }[event.key];
		if (next === undefined) return;
		event.preventDefault();
		const id = route[Math.min(Math.max(next, 0), last)]!.station.id;
		choose(id);
		tabs.current.get(id)?.focus();
	}

	return (
		<figure ref={figure} className={styles.plate} aria-labelledby="plate-caption" style={{ '--ratio': `${width} / ${height}` } as CSSProperties}>
			<div className={styles.frame}>
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
						// Leg i leaves stop i: past the chosen stop, it hasn't been travelled yet.
						return (
							<g key={leg.from} data-ahead={i >= at || undefined}>
								<path d={leg.d} className={styles.casing} />
								<m.path d={leg.d} className={styles.route} {...draw} />
							</g>
						);
					})}

					{routeMap.stations.map((s, i) => (
						<m.g key={s.id} data-ahead={i > at || undefined} data-selected={s.id === selected || undefined} {...reveal(arrival[s.id]!)}>
							{s.id === 'sjc' && <circle cx={s.x} cy={s.y} r={10} className={styles.pulse} />}
							<circle cx={s.x} cy={s.y} r={8} className={styles.station} />
							{s.id === 'sjc' && <circle cx={s.x} cy={s.y} r={3.5} className={styles.here} />}
						</m.g>
					))}
				</svg>
			</div>

			<div role="tablist" aria-label="Stops on the route" className={styles.labels} onKeyDown={onKeyDown}>
				{route.map(({ station, years }, i) => {
					const spot = position(station.id);
					const active = station.id === selected;
					return (
						<m.button
							key={station.id}
							ref={(el: HTMLButtonElement | null) => {
								if (el) tabs.current.set(station.id, el);
							}}
							type="button"
							role="tab"
							id={`stop-${station.id}`}
							aria-selected={active}
							aria-controls={`stop-panel-${station.id}`}
							tabIndex={active ? 0 : -1}
							className={styles.label}
							data-station={station.id}
							data-ahead={i > at || undefined}
							style={{ left: spot.left, top: spot.top }}
							onClick={() => choose(station.id)}
							{...reveal(arrival[station.id]! + 0.2)}
						>
							<span className={styles.code}>{station.code}</span>
							<span className={styles.city}>{station.city}</span>
							<span className={styles.years}>{years}</span>
						</m.button>
					);
				})}
			</div>

			<div className={styles.stops}>
				{route.map((stop, i) => {
					const active = stop.station.id === selected;
					return (
						<div
							key={stop.station.id}
							role="tabpanel"
							id={`stop-panel-${stop.station.id}`}
							aria-labelledby={`stop-${stop.station.id}`}
							className={styles.stop}
							hidden={!active}
						>
							<p className={styles.where}>
								<span className={styles.count}>
									Stop {i + 1} of {route.length}
								</span>
								<span className={styles.place}>
									{stop.station.city}, {stop.years}
								</span>
							</p>
							{stop.records.length > 0 ? (
								<ul className={styles.records}>
									{stop.records.map((record) => (
										<li key={record.href}>
											<a href={record.href} className={styles.record}>
												<span className={styles.kind}>{record.kind}</span>
												<span className={styles.recordTitle}>{record.title}</span>
												<span className={styles.detail}>
													{record.figure && <strong>{record.figure}</strong>} {record.detail}
												</span>
											</a>
										</li>
									))}
								</ul>
							) : (
								<p className={styles.note}>{stop.note}</p>
							)}
						</div>
					);
				})}
			</div>

			<figcaption id="plate-caption" className={styles.caption}>
				<span>Plate 1. Taipei, Seattle, Champaign, San Jose, along great circles.</span>{' '}
				<span>Plate carrée centred on 163°W. Land from Natural Earth.</span>
			</figcaption>
		</figure>
	);
}
