import { useCallback, useSyncExternalStore } from 'react';

/** Subscribes to a CSS media query. Server and test environments without matchMedia read false. */
export function useMediaQuery(query: string): boolean {
	const subscribe = useCallback(
		(onChange: () => void) => {
			if (typeof matchMedia !== 'function') return () => {};
			const list = matchMedia(query);
			list.addEventListener('change', onChange);
			return () => list.removeEventListener('change', onChange);
		},
		[query]
	);
	return useSyncExternalStore(
		subscribe,
		() => typeof matchMedia === 'function' && matchMedia(query).matches,
		() => false
	);
}
