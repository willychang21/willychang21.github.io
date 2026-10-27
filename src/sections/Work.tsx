import { SectionHead } from '../components/SectionHead';
import { projects } from '../content/work';
import { Featured } from './Featured';
import { ProjectIndex } from './ProjectIndex';
import styles from './Work.module.css';

export function Work() {
	return (
		<section id="work" className={styles.work} aria-labelledby="work-title">
			<div className="container">
				<SectionHead id="work" title="Work">
					What each project achieved, what I did, and what it was built with.
				</SectionHead>
				<Featured />
				<h3 className={styles.indexTitle}>More projects</h3>
				<ProjectIndex projects={projects} />
			</div>
		</section>
	);
}
