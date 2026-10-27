import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();

function read(): Theme {
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/** The theme class on <html>, first set by the inline script in index.html. */
export function useTheme(): [Theme, (theme: Theme) => void] {
	const theme = useSyncExternalStore(
		(onChange) => {
			listeners.add(onChange);
			return () => listeners.delete(onChange);
		},
		read,
		() => 'light' as const
	);

	const setTheme = useCallback((next: Theme) => {
		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(next);
		try {
			localStorage.setItem('theme', next);
		} catch {
			// Storage can be unavailable (private mode); the choice then lasts for this visit.
		}
		for (const listener of listeners) listener();
	}, []);

	return [theme, setTheme];
}
