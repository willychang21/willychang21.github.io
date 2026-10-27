import { m, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { sections } from '../content/navigation';
import { profile } from '../content/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import styles from './SiteHeader.module.css';
import { ThemeToggle } from './ThemeToggle';

const ids = sections.map((s) => s.id);

export function SiteHeader() {
	const active = useActiveSection(ids);
	const menu = useRef<HTMLDialogElement>(null);

	// The header's bottom rule doubles as the route travelled so far.
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

	const openMenu = () => menu.current?.showModal();
	const closeMenu = () => menu.current?.close();

	const links = () =>
		sections.map(({ id, label }) => (
			<li key={id}>
				<a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
					{label}
				</a>
			</li>
		));

	return (
		<header className={styles.header}>
			<div className={`container ${styles.bar}`}>
				<a href="#top" className={styles.wordmark}>
					{profile.name}
				</a>

				<nav aria-label="Sections" className={styles.nav}>
					<ul>{links()}</ul>
				</nav>

				<div className={styles.tools}>
					<ThemeToggle />
					<button
						type="button"
						className={styles.menuButton}
						aria-haspopup="dialog"
						onClick={openMenu}
					>
						Index
					</button>
				</div>
			</div>

			<m.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />

			{/* Following any link in the sheet closes it. */}
			<dialog
				ref={menu}
				className={styles.menu}
				aria-label="Sections"
				onClick={(event) => {
					if ((event.target as Element).closest('a')) closeMenu();
				}}
			>
				<div className={styles.menuTop}>
					<span className={styles.wordmark}>{profile.name}</span>
					<button type="button" className={styles.menuButton} onClick={closeMenu}>
						Close
					</button>
				</div>
				<nav aria-label="Sections">
					<ol className={styles.menuList}>{links()}</ol>
				</nav>
				<p className={styles.menuFoot}>
					<a href={`mailto:${profile.email}`} className="text-link">
						{profile.email}
					</a>
				</p>
			</dialog>
		</header>
	);
}
