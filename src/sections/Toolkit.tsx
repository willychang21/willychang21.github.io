import { SectionHead } from '../components/SectionHead';
import { skills } from '../content/skills';
import styles from './Toolkit.module.css';

export function Toolkit() {
	return (
		<section id="toolkit" className={styles.toolkit} aria-labelledby="toolkit-title">
			<div className="container">
				<SectionHead id="toolkit" title="Toolkit">
					Languages and tools from the work above.
				</SectionHead>
				<dl className={styles.groups}>
					{skills.map((group) => (
						<div key={group.label} className={`grid ${styles.group}`}>
							<dt className={styles.label}>{group.label}</dt>
							<dd className={styles.items}>
								<ul>
									{group.items.map((item) => (
										<li key={item.name}>
											{item.name}
											{item.gloss && <span className={styles.gloss}> ({item.gloss})</span>}
										</li>
									))}
								</ul>
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
