import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

/** A section opens on its title set large, with one sentence of context beside it. */
export function SectionHead({ id, title, children }: { id: string; title: string; children?: ReactNode }) {
	return (
		<div className={`grid ${styles.head}`}>
			<h2 id={`${id}-title`} className={styles.title}>
				{title}
			</h2>
			{children && <p className={styles.deck}>{children}</p>}
		</div>
	);
}
