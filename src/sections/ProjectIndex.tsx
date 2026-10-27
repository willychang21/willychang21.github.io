import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Project } from '../content/types';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useProjectHash } from '../hooks/useProjectHash';
import { ProjectDetail } from './ProjectDetail';
import styles from './ProjectIndex.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

function Heading({ project, index }: { project: Project; index: number }) {
	return (
		<>
			<span className={styles.number} aria-hidden="true">
				{pad(index + 1)}
			</span>
			<span className={styles.title} id={`title-${project.id}`}>
				{project.title}
			</span>
			<span className={styles.outcome} id={`meta-${project.id}`}>
				{project.outcome.figure && <strong>{project.outcome.figure}</strong>} {project.outcome.text}
			</span>
			<span className={styles.stack}>{project.stack.join(', ')}</span>
		</>
	);
}

interface ViewProps {
	projects: Project[];
	selected: string | null;
	onSelect: (id: string | null) => void;
}

/**
 * Wide screens: a vertical tab list beside one open project, so the index stays in view
 * while the project is read. Selection is deliberate (click, tap or keyboard): panels
 * differ in height by hundreds of pixels, so switching on hover moved the page under
 * the reader whenever the pointer crossed the list.
 */
function Tabs({ projects, selected, onSelect }: ViewProps) {
	const active = selected ?? projects[0]!.id;
	const setActive = (id: string) => onSelect(id);
	const tabs = useRef(new Map<string, HTMLButtonElement>());
	const list = useRef<HTMLDivElement>(null);
	const [marker, setMarker] = useState({ y: 0, height: 0 });

	// The route marker slides to the active row.
	useLayoutEffect(() => {
		const tab = tabs.current.get(active);
		if (tab) setMarker({ y: tab.offsetTop, height: tab.offsetHeight });
	}, [active]);

	function onKeyDown(event: KeyboardEvent) {
		const index = projects.findIndex((p) => p.id === active);
		const next = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: projects.length - 1 }[event.key];
		if (next === undefined) return;
		event.preventDefault();
		const project = projects[(next + projects.length) % projects.length]!;
		setActive(project.id);
		tabs.current.get(project.id)?.focus();
	}

	return (
		<div className={styles.tabs}>
			<div className={styles.listWrap}>
				<div ref={list} role="tablist" aria-orientation="vertical" aria-label="Projects" className={styles.list} onKeyDown={onKeyDown}>
					<span
						className={styles.marker}
						style={{ transform: `translateY(${marker.y}px) scaleY(${marker.height})` }}
						aria-hidden="true"
					/>
					{projects.map((project, i) => (
						<button
							key={project.id}
							ref={(el) => {
								if (el) tabs.current.set(project.id, el);
							}}
							type="button"
							role="tab"
							id={`tab-${project.id}`}
							aria-selected={active === project.id}
							aria-controls={`panel-${project.id}`}
							aria-labelledby={`title-${project.id}`}
							aria-describedby={`meta-${project.id}`}
							tabIndex={active === project.id ? 0 : -1}
							className={styles.row}
							onClick={() => setActive(project.id)}
						>
							<Heading project={project} index={i} />
						</button>
					))}
				</div>
			</div>

			<div className={styles.panels}>
				{projects.map((project) => (
					<div
						key={project.id}
						role="tabpanel"
						id={`panel-${project.id}`}
						aria-labelledby={`title-${project.id}`}
						hidden={active !== project.id}
						className={styles.panel}
					>
						<h3 className="sr-only">{project.title}</h3>
						<ProjectDetail project={project} />
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * Narrow screens: an accordion, each project opening under its own heading. It starts
 * closed so the rows read as a list of results; a linked project opens on its own.
 */
function Accordion({ projects, selected: open, onSelect: setOpen }: ViewProps) {
	return (
		<ol className={styles.accordion}>
			{projects.map((project, i) => {
				const expanded = open === project.id;
				return (
					<li key={project.id} className={styles.item}>
						<h3>
							<button
								type="button"
								id={`tab-${project.id}`}
								aria-expanded={expanded}
								aria-controls={`panel-${project.id}`}
								aria-labelledby={`title-${project.id}`}
								aria-describedby={`meta-${project.id}`}
								className={styles.row}
								onClick={() => setOpen(expanded ? null : project.id)}
							>
								<Heading project={project} index={i} />
								<span className={styles.toggle} aria-hidden="true" data-print="hide" />
							</button>
						</h3>
						<div id={`panel-${project.id}`} role="region" aria-labelledby={`title-${project.id}`} hidden={!expanded} className={styles.panel}>
							<ProjectDetail project={project} />
						</div>
					</li>
				);
			})}
		</ol>
	);
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
	const wide = useMediaQuery('(min-width: 64rem)');
	const [selected, select] = useProjectHash(projects.map((p) => p.id));

	// A link straight to a project lands on its row, below the sticky header.
	const linked = useRef(selected);
	useEffect(() => {
		if (linked.current) document.getElementById(`tab-${linked.current}`)?.scrollIntoView({ block: 'start' });
	}, []);

	const View = wide ? Tabs : Accordion;
	return <View projects={projects} selected={selected} onSelect={select} />;
}
