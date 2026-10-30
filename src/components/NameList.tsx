import type { SkillGroup } from '../content/types';
import styles from './NameList.module.css';

/**
 * A run of names divided by thin strokes, each with an optional note set small and
 * raised, like a place name's annotation on a map. The toolkit and AOP's legend share
 * it, so a name and its note look the same wherever they appear; the parent sets the
 * type size.
 */
export function NameList({ items, className }: { items: SkillGroup['items']; className?: string }) {
	return (
		<ul className={className ? `${styles.list} ${className}` : styles.list}>
			{items.map((item) => (
				<li key={item.name}>
					{item.name}
					{item.gloss && <span className={styles.gloss}> ({item.gloss})</span>}
				</li>
			))}
		</ul>
	);
}
