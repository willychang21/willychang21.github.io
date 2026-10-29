import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
	{
		label: 'Languages',
		items: [{ name: 'Go' }, { name: 'TypeScript' }, { name: 'JavaScript' }, { name: 'Python' }, { name: 'Swift' }, { name: 'C#' }]
	},
	{
		label: 'Frontend',
		items: [
			{ name: 'React' },
			{ name: 'Remix' },
			{ name: 'Modern.js', gloss: 'React framework' },
			{ name: 'Svelte' },
			{ name: 'Zustand', gloss: 'state management' },
			{ name: 'TanStack Query' },
			{ name: 'Tailwind' },
			{ name: 'Jest' }
		]
	},
	{
		label: 'Backend',
		items: [
			{ name: 'Kitex', gloss: 'Go RPC' },
			{ name: 'Hertz', gloss: 'Go HTTP' },
			{ name: 'NestJS' },
			{ name: 'Express.js' },
			{ name: 'MongoDB' },
			{ name: 'PostgreSQL' },
			{ name: 'Redis' },
			{ name: 'Firebase' },
			{ name: 'AWS' },
			{ name: 'BytePlus', gloss: 'cloud' }
		]
	},
	{
		label: 'AI',
		items: [{ name: 'LLM agents' }, { name: 'MCP' }, { name: 'RAG' }, { name: 'Vector search' }]
	},
	{
		label: 'DevOps',
		items: [{ name: 'Docker' }, { name: 'Kubernetes' }, { name: 'GitHub Actions' }, { name: 'Linux' }]
	}
];
