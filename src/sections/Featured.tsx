import { RichText } from '../components/RichText';
import { SystemDiagram } from '../components/SystemDiagram';
import { featured } from '../content/work';
import styles from './Featured.module.css';

/** The lead story: AOP as problem, contribution and result, beside its flow drawn in the site's transit language. */
export function Featured() {
	return (
		<article className={`grid ${styles.featured}`} aria-labelledby="featured-title">
			<div className={styles.text}>
				<h3 id="featured-title" className={styles.title}>
					{featured.title}
				</h3>
				<p className={styles.context}>
					{featured.context}, {featured.period}
				</p>
				<p className={styles.stack}>
					<span className="sr-only">Built with </span>
					{featured.stack.map((item, i) => (
						<span key={item.name}>
							{i > 0 && ', '}
							{item.name}
							{item.gloss && <span className={styles.gloss}> ({item.gloss})</span>}
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
							<ul className={styles.notes}>
								{featured.contribution.map((note) => (
									<li key={note}>
										<RichText>{note}</RichText>
									</li>
								))}
							</ul>
						</dd>
					</div>
					<div>
						<dt>Result</dt>
						<dd>{featured.result}</dd>
					</div>
				</dl>
			</div>
			<div className={styles.figure}>
				<SystemDiagram diagram={featured.diagram} />
			</div>
		</article>
	);
}
