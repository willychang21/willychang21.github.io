import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { useEffect } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Opening } from './sections/Opening';
import { Toolkit } from './sections/Toolkit';
import { Work } from './sections/Work';

/**
 * The page renders after the browser has looked for the URL's fragment, so a link to an
 * entry (#role-tiktok, #project-aop) found nothing to scroll to. Land on it once the page
 * is there. Stops on the map and projects in the index handle their own links.
 */
function useLandOnFragment() {
	useEffect(() => {
		let id: string;
		try {
			id = decodeURIComponent(location.hash.slice(1));
		} catch {
			return;
		}
		if (!id || id.startsWith('stop-') || document.getElementById(`tab-${id.replace(/^project-/, '')}`)) return;
		// Jump, don't glide. A smooth scroll aims at where the target was when it began, and
		// web fonts that arrive on the way re-wrap the text above it, so it would stop short.
		document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
	}, []);
}

export function App() {
	useLandOnFragment();
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
