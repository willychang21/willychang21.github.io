import { CopyEmail } from '../components/CopyEmail';
import { profile } from '../content/profile';
import styles from './Opening.module.css';
import { RoutePlate } from './RoutePlate';

export function Opening() {
	return (
		<section id="top" className={styles.opening} aria-labelledby="opening-title">
			<div className="container">
				<div className={styles.stage}>
					{/* The h1 names who Willy is; the statement under it is the page's one figure of
					    speech. On wide screens both sit in the open Pacific under the route. */}
					<div id="opening-words" className={styles.words}>
						<h1 id="opening-title" className={styles.title}>
							{profile.name}, {profile.role} at {profile.employer}
						</h1>
						<p className={styles.statement}>{profile.statement}</p>
					</div>
					<RoutePlate />
				</div>

				<div className={`grid ${styles.dek}`}>
					<p className={styles.lede}>
						{profile.lede}
					</p>

					<ul className={styles.actions} aria-label="Contact and résumé">
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
						{/* The same file and the same words as in Contact: one action, one wording. */}
						<li data-print="hide">
							<a href={profile.resume.href} download={profile.resume.filename} type="application/pdf" className="text-link">
								Download the résumé (PDF)
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
							loading="lazy"
							decoding="async"
						/>
						<figcaption>Based in {profile.base}.</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
}
