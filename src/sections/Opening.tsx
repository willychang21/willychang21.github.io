import { CopyEmail } from '../components/CopyEmail';
import { profile } from '../content/profile';
import styles from './Opening.module.css';
import { RoutePlate } from './RoutePlate';

export function Opening() {
	return (
		<section id="top" className={styles.opening} aria-labelledby="statement">
			<div className="container">
				<div className={styles.stage}>
					{/* On wide screens the statement sits in the open Pacific under the route. */}
					<h1 id="statement" className={styles.statement}>
						{profile.name} {profile.statement}
					</h1>
					<RoutePlate />
				</div>

				<div className={`grid ${styles.dek}`}>
					<p className={styles.lede}>
						{profile.lede}
					</p>

					<ul className={styles.actions} aria-label="Contact">
						<li className={styles.email}>
							<a href={`mailto:${profile.email}`} className="text-link">
								{profile.email}
							</a>
							<CopyEmail email={profile.email} />
						</li>
						<li>
							<a href={profile.github.url} className="text-link">
								GitHub
							</a>
						</li>
					</ul>

					<figure className={styles.portrait}>
						<img
							src="/avatar-480.webp"
							srcSet="/avatar-240.webp 240w, /avatar-480.webp 480w"
							sizes="(min-width: 64rem) 11rem, 6rem"
							width={480}
							height={480}
							alt={profile.avatar.alt}
							fetchPriority="low"
						/>
						<figcaption>Based in {profile.base}.</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
}
