import { useCallback, useEffect, useState } from 'react';

const PREFIX = '#project-';

function read(ids: readonly string[]): string | null {
	const hash = typeof location === 'undefined' ? '' : location.hash;
	if (!hash.startsWith(PREFIX)) return null;
	const id = decodeURIComponent(hash.slice(PREFIX.length));
	return ids.includes(id) ? id : null;
}

/**
 * The selected project, kept in the URL as #project-<id> so a project can be linked to.
 * Selecting replaces the hash (no history entry per click); clearing removes it. Other
 * hashes, such as the section links, leave the selection alone.
 */
export function useProjectHash(ids: readonly string[]): [string | null, (id: string | null) => void] {
	const key = ids.join(' ');
	const [selected, setSelected] = useState<string | null>(() => read(ids));

	useEffect(() => {
		const list = key.split(' ');
		const onHashChange = () => {
			const id = read(list);
			if (id) setSelected(id);
		};
		addEventListener('hashchange', onHashChange);
		return () => removeEventListener('hashchange', onHashChange);
	}, [key]);

	const select = useCallback((id: string | null) => {
		setSelected(id);
		const url = id ? `${PREFIX}${encodeURIComponent(id)}` : location.pathname + location.search;
		history.replaceState(history.state, '', url);
	}, []);

	return [selected, select];
}

/** The URL fragment that opens a project. */
export const projectHash = (id: string) => `${PREFIX}${id}`;
