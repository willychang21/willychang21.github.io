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
		label: 'AI & agents',
		items: [
			{ name: 'LLM agents' },
			{ name: 'Tool calling' },
			{ name: 'MCP', gloss: 'Model Context Protocol' },
			{ name: 'RAG' }
		]
	},
	{
		label: 'Retrieval',
		items: [
			{ name: 'MongoDB Vector Search', gloss: '8.2' },
			{ name: 'Embedding pipelines' },
			{ name: 'Hybrid search', gloss: 'vector + full-text' },
			{ name: 'Reciprocal rank fusion' },
			{ name: 'Metadata pre-filtering' },
			{ name: 'Reranking' }
		]
	},
	{
		label: 'DevOps',
		items: [{ name: 'Docker' }, { name: 'Kubernetes' }, { name: 'GitHub Actions' }, { name: 'Linux' }]
	}
];
