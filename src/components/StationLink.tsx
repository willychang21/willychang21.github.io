import { stations } from '../content/profile';
import { stopHash } from '../content/route';
import type { Station } from '../content/types';

/** A station code that opens its stop on the map at the top of the page. */
export function StationLink({ station, className = 'text-link' }: { station: Station['id']; className?: string }) {
	const { code, city } = stations[station];
	return (
		<a href={stopHash(station)} className={className} aria-label={`${code}, ${city}: show on the map`}>
			{code}
		</a>
	);
}
