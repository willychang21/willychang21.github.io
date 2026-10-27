import { profile } from '../content/profile';
import styles from './NotFound.module.css';

export function NotFound() {
	return (
		<main className={`container ${styles.page}`}>
			<a href="/" className={styles.wordmark}>
				{profile.name}
			</a>
			<p className={styles.code}>404</p>
			<h1 className={styles.title}>This stop isn’t on the map.</h1>
			<p className={styles.text}>The link may be out of date. Everything on this site lives on one page.</p>
			<ul className={styles.links}>
				<li>
					<a href="/" className="text-link">
						Back to the start
					</a>
				</li>
				<li>
					<a href={`mailto:${profile.email}`} className="text-link">
						Email {profile.email}
					</a>
				</li>
			</ul>
		</main>
	);
}
