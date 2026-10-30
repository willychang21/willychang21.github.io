import { NameList } from '../components/NameList';
import { RichText } from '../components/RichText';
import { StationLink } from '../components/StationLink';
import { SystemDiagram } from '../components/SystemDiagram';
import { featured } from '../content/work';
import styles from './Featured.module.css';

// Each part of Willy's work is numbered where it sits in the flow.
const marks = Object.fromEntries(featured.contribution.map((part, i) => [part.node, String(i + 1)]));

/** The lead story: AOP as problem, contribution and result, beside its flow drawn in the site's transit language. */
export function Featured() {
	return (
		<article id={`project-${featured.id}`} className={`grid ${styles.featured}`} aria-labelledby="featured-title">
			<div className={styles.text}>
				<h3 id="featured-title" className={styles.title}>
					{featured.title}
				</h3>
				<p className={styles.context}>
					{featured.context}, {featured.period} · <StationLink station={featured.station} />
				</p>
				{/* What it's built with, by layer: a small legend, labelled like the ledger below. */}
				<p className="sr-only" id="featured-stack">
					Built with
				</p>
				<dl className={styles.legend} aria-labelledby="featured-stack">
					{featured.stack.map((group) => (
						<div key={group.label}>
							<dt>{group.label}</dt>
							<dd>
								<NameList items={group.items} className={styles.names} />
							</dd>
						</div>
					))}
				</dl>
				<p className={styles.summary}>{featured.summary}</p>
				{/* The flagship reads as a short ledger, not the bullet panel the other projects use. */}
				<dl className={styles.story}>
					<div>
						<dt>Problem</dt>
						<dd>{featured.problem}</dd>
					</div>
					<div>
						<dt>My part</dt>
						<dd>
							<ol className={styles.notes}>
								{featured.contribution.map((part, i) => (
									<li key={part.node}>
										<span className={`mark ${styles.mark}`} aria-hidden="true">
											{i + 1}
										</span>
										<RichText>{part.text}</RichText>
									</li>
								))}
							</ol>
						</dd>
					</div>
					<div>
						<dt>Result</dt>
						<dd className={styles.result}>
							<strong className={styles.resultFigure}>{featured.outcome.figure}</strong> {featured.outcome.text}
						</dd>
					</div>
				</dl>
			</div>
			<div className={styles.figure}>
				<SystemDiagram diagram={featured.diagram} marks={marks} />
			</div>
		</article>
	);
}
