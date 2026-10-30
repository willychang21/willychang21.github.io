import { NameList } from '../components/NameList';
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
								<NameList items={group.items} className={styles.names} />
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
