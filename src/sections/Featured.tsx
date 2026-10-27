import { RichText } from '../components/RichText';
import { SystemDiagram } from '../components/SystemDiagram';
import { featured } from '../content/work';
import styles from './Featured.module.css';

/** The lead story: AOP, in words and drawn in the same transit language as the other projects. */
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
				<ul className={styles.notes}>
					{featured.notes.map((note) => (
						<li key={note}>
							<RichText>{note}</RichText>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.figure}>
				<SystemDiagram diagram={featured.diagram} />
			</div>
		</article>
	);
}
