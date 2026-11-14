import { NameList } from '../components/NameList';
import { RichText } from '../components/RichText';
import { StationLink } from '../components/StationLink';
import { SystemDiagram } from '../components/SystemDiagram';
import { featured } from '../content/work';
import styles from './Featured.module.css';

// Each step of the flow is numbered on the component that does it.
const marks = Object.fromEntries(featured.flow.map((step, i) => [step.node, String(i + 1)]));

function Points({ items }: { items: string[] }) {
	return (
		<ul className={styles.points}>
			{items.map((item) => (
				<li key={item}>
					<RichText>{item}</RichText>
				</li>
			))}
		</ul>
	);
}

/** The lead story: AOP as a result, a flow and the decisions behind it, beside its components drawn in the site's transit language. */
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
								<NameList items={group.items} />
							</dd>
						</div>
					))}
				</dl>
				<p className={styles.summary}>{featured.summary}</p>
				{/* The flagship reads as a short ledger: the result first, then how it works and why. */}
				<dl className={styles.story}>
					<div>
						<dt>Result</dt>
						<dd>
							<p className={styles.result}>
								<strong className={styles.resultFigure}>{featured.outcome.figure}</strong> {featured.outcome.text}
							</p>
							<p className={styles.before}>{featured.before}</p>
						</dd>
					</div>
					<div>
						<dt>Flow</dt>
						<dd>
							<ol className={styles.notes}>
								{featured.flow.map((step, i) => (
									<li key={step.node}>
										<span className={`mark ${styles.mark}`} aria-hidden="true">
											{i + 1}
										</span>
										<RichText>{step.text}</RichText>
									</li>
								))}
							</ol>
						</dd>
					</div>
				</dl>
			</div>
			{/* The drawing follows the flow it numbers. On wide screens it sits beside it, and the decision rows run two-up below. */}
			<div className={styles.figure}>
				<SystemDiagram diagram={featured.diagram} marks={marks} />
			</div>
			<dl className={`${styles.story} ${styles.more}`}>
				{featured.ledger.map((row) => (
					<div key={row.label}>
						<dt>{row.label}</dt>
						<dd>
							<Points items={row.points} />
						</dd>
					</div>
				))}
			</dl>
		</article>
	);
}
