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
				<p className={styles.stack}>
					<span className="sr-only">Built with </span>
					{/* Lines break between names, never inside one ("Vector / search"). */}
					{featured.stack.map((name, i) => (
						<span key={name}>
							{i > 0 && ', '}
							<span className={styles.nowrap}>{name}</span>
						</span>
					))}
				</p>
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
