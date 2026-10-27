import { RichText } from '../components/RichText';
import { SectionHead } from '../components/SectionHead';
import { degrees, roles } from '../content/experience';
import { stations } from '../content/profile';
import type { Station } from '../content/types';
import styles from './Experience.module.css';

function Stop({ station, start, end, logo, name }: { station: Station['id']; start: string; end: string; logo?: string; name: string }) {
	return (
		<div className={styles.stop}>
			<span className={styles.code} title={stations[station].city}>
				{stations[station].code}
			</span>
			<p className={styles.dates}>
				<time>{start}</time> – <time>{end}</time>
			</p>
			<span className={styles.logo} aria-hidden="true">
				{logo ? <img src={logo} alt="" width={36} height={36} loading="lazy" decoding="async" /> : name.charAt(0)}
			</span>
		</div>
	);
}

export function Experience() {
	return (
		<section id="experience" className={styles.experience} aria-labelledby="experience-title">
			<div className="container">
				<SectionHead id="experience" title="Experience">
					Three roles, newest first. Station codes match the map at the top.
				</SectionHead>

				<ol className={styles.ledger}>
					{roles.map((role, i) => (
						<li key={role.id} id={`role-${role.id}`} className={`grid ${styles.entry}`} data-current={i === 0 || undefined}>
							<Stop station={role.station} start={role.start} end={role.end} logo={role.logo} name={role.company} />
							<div className={styles.who}>
								<h3 className={styles.company}>{role.company}</h3>
								<p className={styles.title}>{role.title}</p>
								<p className={styles.place}>{role.location}</p>
							</div>
							<ul className={styles.highlights}>
								{role.highlights.map((h) => (
									<li key={h}>
										<RichText>{h}</RichText>
									</li>
								))}
							</ul>
						</li>
					))}
				</ol>

				<h3 className={styles.subhead}>Education</h3>
				<ol className={`${styles.ledger} ${styles.education}`}>
					{degrees.map((degree) => (
						<li key={degree.id} id={`degree-${degree.id}`} className={`grid ${styles.entry}`}>
							<Stop station={degree.station} start={degree.start} end={degree.end} logo={degree.logo} name={degree.school} />
							<div className={styles.who}>
								<h4 className={styles.company}>{degree.school}</h4>
								<p className={styles.place}>{degree.location}</p>
							</div>
							<p className={styles.degree}>{degree.degree}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
