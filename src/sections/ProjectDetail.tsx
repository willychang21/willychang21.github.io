import { RichText } from '../components/RichText';
import { StationLink } from '../components/StationLink';
import { SystemDiagram } from '../components/SystemDiagram';
import { ArrowUpRight } from '../components/Icon';
import { stations } from '../content/profile';
import type { Project, Screenshot } from '../content/types';
import styles from './ProjectDetail.module.css';

function Capture({ shot }: { shot: Screenshot }) {
	const lead = shot.emphasis === 'lead';
	return (
		<figure className={styles.shot} data-emphasis={shot.emphasis}>
			<img
				src={`/work/${shot.name}-800.webp`}
				srcSet={`/work/${shot.name}-800.webp 800w, /work/${shot.name}-1600.webp 1600w`}
				sizes={lead ? '(min-width: 64rem) 52vw, 92vw' : '(min-width: 64rem) 18rem, 92vw'}
				width={shot.width}
				height={shot.height}
				alt={shot.alt}
				loading="lazy"
				decoding="async"
			/>
			<figcaption>{shot.caption}</figcaption>
		</figure>
	);
}

/**
 * One project, composed by what it is strongest at: a product capture can lead the panel,
 * sit beside the facts, or be absent, in which case the system diagram carries the visual.
 */
export function ProjectDetail({ project }: { project: Project }) {
	const { shot } = project;
	return (
		<div className={styles.detail}>
			{shot?.emphasis === 'lead' && <Capture shot={shot} />}

			<div className={styles.body}>
				<div className={styles.text}>
					<p className={styles.summary}>{project.summary}</p>
					<ul className={styles.notes}>
						{project.notes.map((note) => (
							<li key={note}>
								<RichText>{note}</RichText>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.aside}>
					<dl className={styles.meta}>
						{project.context && (
							<div>
								<dt>Context</dt>
								<dd>
									{project.context}
									{project.period && `, ${project.period}`}
									{project.station && (
										<>
											{' · '}
											<StationLink station={project.station} />
										</>
									)}
								</dd>
							</div>
						)}
						{!project.context && project.station && (
							<div>
								<dt>Where</dt>
								<dd>
									{stations[project.station].city} · <StationLink station={project.station} />
								</dd>
							</div>
						)}
						<div>
							<dt>Built with</dt>
							<dd>{project.stack.join(', ')}</dd>
						</div>
						{project.links.length > 0 && (
							<div>
								<dt className="sr-only">Links</dt>
								{project.links.map((link) => (
									<dd key={link.href}>
										<a href={link.href} className={`text-link ${styles.link}`}>
											{link.label}
											<ArrowUpRight />
										</a>
									</dd>
								))}
							</div>
						)}
					</dl>
					{shot?.emphasis === 'aside' && <Capture shot={shot} />}
				</div>
			</div>

			<SystemDiagram diagram={project.diagram} legend />
		</div>
	);
}
