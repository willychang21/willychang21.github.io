import { Fragment } from 'react';
import type { RichText as RichTextSource } from '../content/types';
import { ArrowUpRight } from './Icon';

type Part = { kind: 'text' | 'strong'; text: string } | { kind: 'link'; text: string; href: string };

/** Splits **bold** and [label](url) marks out of a line of résumé copy. */
export function parseRichText(source: RichTextSource): Part[] {
	return source
		.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/)
		.filter(Boolean)
		.map((part): Part => {
			const link = /^\[(.+?)\]\((.+?)\)$/.exec(part);
			if (link) return { kind: 'link', text: link[1]!, href: link[2]! };
			if (part.startsWith('**') && part.endsWith('**')) return { kind: 'strong', text: part.slice(2, -2) };
			return { kind: 'text', text: part };
		});
}

export function RichText({ children }: { children: RichTextSource }) {
	return parseRichText(children).map((part, i) => {
		if (part.kind === 'strong') return <strong key={i}>{part.text}</strong>;
		if (part.kind === 'link')
			return (
				<a key={i} href={part.href} className="text-link">
					{part.text}
					<ArrowUpRight />
				</a>
			);
		return <Fragment key={i}>{part.text}</Fragment>;
	});
}
