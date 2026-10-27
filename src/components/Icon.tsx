// The site's few icons, drawn on one 16px grid with the same 1.5px stroke.
import type { SVGProps } from 'react';

function Icon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 16 16"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...props}
		/>
	);
}

/** Marks a link that leaves the site. */
export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
	return (
		<Icon className="icon-external" {...props}>
			<path d="M5 11 11 5M6 5h5v5" />
		</Icon>
	);
}

export function Sun() {
	return (
		<Icon>
			<circle cx="8" cy="8" r="3" />
			<path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
		</Icon>
	);
}

export function Moon() {
	return (
		<Icon>
			<path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
		</Icon>
	);
}

export function Copy() {
	return (
		<Icon>
			<rect x="5.5" y="5.5" width="8" height="8" rx="1" />
			<path d="M10.5 3V2.5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1H3" />
		</Icon>
	);
}

export function Check() {
	return (
		<Icon>
			<path d="m3 8.5 3 3 7-7" />
		</Icon>
	);
}
