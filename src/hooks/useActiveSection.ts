import { useEffect, useState } from 'react';

/**
 * The id of the section that holds the reading line (a band 30–40% down the viewport),
 * or null above the first one. Near the bottom of the page the last section wins, so a
 * short closing section can still become current.
 */
export function useActiveSection(ids: readonly string[]): string | null {
	const [active, setActive] = useState<string | null>(null);
	const key = ids.join(' ');

	useEffect(() => {
		const sections = key
			.split(' ')
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

		const visible = new Set<string>();
		const pick = () => {
			const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
			const last = sections.at(-1);
			if (atBottom && last) return setActive(last.id);
			const current = sections.filter((s) => visible.has(s.id)).at(-1);
			setActive(current ? current.id : null);
		};

		// A section counts once its top has crossed the reading line and its bottom hasn't.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target.id);
					else visible.delete(entry.target.id);
				}
				pick();
			},
			{ rootMargin: '-30% 0px -60% 0px' }
		);
		for (const section of sections) observer.observe(section);
		addEventListener('scroll', pick, { passive: true });
		return () => {
			observer.disconnect();
			removeEventListener('scroll', pick);
		};
	}, [key]);

	return active;
}
