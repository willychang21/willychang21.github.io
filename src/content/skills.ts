import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
	{
		label: 'Languages',
		items: ['Go', 'TypeScript', 'JavaScript', 'Python', 'Swift', 'C#']
	},
	{
		label: 'Frontend',
		items: ['React', 'Remix', 'Modern.js', 'Svelte', 'Zustand', 'TanStack Query', 'Tailwind', 'Jest']
	},
	{
		label: 'Backend',
		items: ['Kitex', 'Hertz', 'NestJS', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'AWS', 'BytePlus']
	},
	{
		label: 'AI',
		items: ['LLM agents', 'MCP', 'RAG', 'Vector search', 'LLM evaluation']
	},
	{
		label: 'DevOps',
		items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux']
	}
];
