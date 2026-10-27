import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { SiteHeader } from './components/SiteHeader';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Opening } from './sections/Opening';
import { Toolkit } from './sections/Toolkit';
import { Work } from './sections/Work';

export function App() {
	return (
		<LazyMotion features={domAnimation} strict>
			<MotionConfig reducedMotion="user">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<SiteHeader />
				<main id="main" tabIndex={-1}>
					<Opening />
					<Work />
					<Experience />
					<Toolkit />
					<Contact />
				</main>
			</MotionConfig>
		</LazyMotion>
	);
}
