import { CopyEmail } from '../components/CopyEmail';
import { ArrowUpRight } from '../components/Icon';
import { profile } from '../content/profile';
import styles from './Contact.module.css';

export function Contact() {
	const [user, domain] = profile.email.split('@');
	return (
		<section id="contact" className={styles.contact} aria-labelledby="contact-title">
			<div className="container">
				<div className="grid">
					<h2 id="contact-title" className={styles.title}>
						Contact
					</h2>
					<p className={styles.deck}>Email is the quickest way to reach me.</p>
				</div>

				<p className={styles.email}>
					<a href={`mailto:${profile.email}`}>
						{user}
						<wbr />@{domain}
					</a>
					<CopyEmail email={profile.email} />
				</p>

				<ul className={styles.links}>
					<li>
						<a href={profile.github.url} className="text-link">
							GitHub, @{profile.github.handle}
							<ArrowUpRight />
						</a>
					</li>
					<li data-print="hide">
						<button type="button" className="text-link" onClick={() => print()}>
							Save the résumé as PDF
						</button>
					</li>
					<li data-print="hide">
						<a href="#top" className="text-link">
							Back to the top
						</a>
					</li>
				</ul>

				<footer className={styles.colophon} data-print="hide">
					<p>
						Set in Archivo, Newsreader and JetBrains Mono. Map from Natural Earth data. Built with React, Vite and
						Motion;{' '}
						<a href="https://github.com/willychang21/willychang21.github.io" className="text-link">
							source on GitHub
						</a>
						.
					</p>
				</footer>
			</div>
		</section>
	);
}
