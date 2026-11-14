import type { Degree, Role } from './types';

export const roles: Role[] = [
	{
		id: 'tiktok',
		company: 'TikTok',
		title: 'Software Engineer',
		location: 'San Jose, CA',
		station: 'sjc',
		start: 'Apr 2025',
		end: 'Present',
		logo: '/logos/tiktok.png',
		highlights: [
			'Designed and built AOP (Agent Operation Platform) end to end: the runtime, the agents, the tool service and the evaluation.',
			'Launched intake channels for regional privacy laws.'
		]
	},
	{
		id: 'kocree',
		company: 'Kocree',
		title: 'Software Engineer Intern',
		location: 'Champaign, IL',
		station: 'cmi',
		start: 'May 2024',
		end: 'Aug 2024',
		logo: '/logos/kocree.png',
		highlights: [
			'Built OAuth 2.0 sign-in and a per-asset access model for [Muosaic](https://muosaic-demo.kocree.net/home), a music co-creation platform.'
		]
	},
	{
		id: 'uiuc',
		company: 'University of Illinois Urbana-Champaign',
		title: 'Software Engineer, part-time',
		location: 'Champaign, IL',
		station: 'cmi',
		start: 'Mar 2024',
		end: 'Dec 2024',
		logo: '/logos/uiuc.png',
		highlights: [
			'Rebuilt the backend of [Here @ UIUC](https://here.illinois.edu/), the university’s attendance system.'
		]
	}
];

export const degrees: Degree[] = [
	{
		id: 'uiuc-mcs',
		school: 'University of Illinois Urbana-Champaign',
		degree: 'Master of Computer Science',
		location: 'Champaign, IL',
		station: 'cmi',
		start: 'Aug 2022',
		end: 'Dec 2024',
		logo: '/logos/uiuc.png'
	},
	{
		id: 'fju-bs',
		school: 'Fu Jen Catholic University',
		degree: 'Bachelor of Science in Computer Science',
		location: 'Taipei, Taiwan',
		station: 'tpe',
		start: 'Aug 2015',
		end: 'Jun 2019',
		logo: '/logos/fju.png'
	}
];
