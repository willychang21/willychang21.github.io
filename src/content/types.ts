/**
 * Résumé copy supports two inline marks: **bold** for figures and [label](https://…) for
 * links. See components/RichText.
 */
export type RichText = string;

export interface Station {
	/** Matches a station id in route-map.generated.ts. */
	id: 'tpe' | 'sea' | 'cmi' | 'sjc';
	code: string;
	city: string;
}

export interface Role {
	id: string;
	company: string;
	title: string;
	location: string;
	station: Station['id'];
	start: string;
	end: string;
	logo?: string;
	highlights: RichText[];
}

export interface Degree {
	id: string;
	school: string;
	degree: string;
	location: string;
	station: Station['id'];
	start: string;
	end: string;
	logo?: string;
}

export interface Link {
	label: string;
	href: string;
}

/** A node in a project's system diagram, placed on a 12 × 8 grid. */
export interface DiagramNode {
	id: string;
	label: string;
	/** Second line under the label, e.g. the technology. */
	note?: string;
	/** A shorter name for narrow drawings, where the full one would collide. */
	short?: string;
	x: number;
	y: number;
	kind: 'actor' | 'service' | 'store' | 'external';
	/** Which side of the marker the label sits on. Defaults to below. */
	labelAt?: 'above' | 'below' | 'left' | 'right';
}

export interface DiagramEdge {
	from: string;
	to: string;
	/** Drawn in the signal colour: the path a request takes, or the part the project changed. */
	route?: boolean;
	/** A write to storage rather than a step of the work: drawn dashed, read as "checkpoints to". */
	checkpoint?: boolean;
}

export interface Diagram {
	/** Accessible name; the figure caption. */
	caption: string;
	/** What the orange line means here, when it isn't the part Willy built or changed. */
	key?: string;
	nodes: DiagramNode[];
	edges: DiagramEdge[];
}

/** A capture of the live product, stored as public/work/<name>-800.webp and -1600.webp. */
export interface Screenshot {
	name: string;
	/**
	 * How much weight the capture carries in its project: `lead` opens the panel full
	 * width (the product is the evidence); `aside` sits small beside the facts (the
	 * engineering is the story, and the diagram carries it).
	 */
	emphasis: 'lead' | 'aside';
	alt: string;
	caption: string;
	width: number;
	height: number;
}

export interface Project {
	id: string;
	title: string;
	/**
	 * What the project achieved, shown on its row so a visitor sees results without
	 * opening it. `figure` is set only when the résumé has a real number for it.
	 */
	outcome: { figure?: string; text: string };
	/** Where the work happened and in what capacity, when that is on the record. */
	context?: string;
	period?: string;
	station?: Station['id'];
	summary: string;
	stack: string[];
	notes: RichText[];
	links: Link[];
	diagram: Diagram;
	shot?: Screenshot;
}

export interface SkillGroup {
	label: string;
	items: { name: string; gloss?: string }[];
}
