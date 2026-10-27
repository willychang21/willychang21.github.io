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
			'Designed and built AOP (Agent Operation Platform) end to end, the internal platform that automates privacy-operations requests; most requests are now resolved through automation, with edge cases routed to specialists.',
			'Shipped automated workflows that now resolve **over 90%** of those requests automatically, sharply reducing manual operations workload.',
			'Launched new data intake channels to address region-specific regulatory requirements, boosting compliance coverage across multiple jurisdictions.'
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
			'Developed [Muosaic](https://muosaic-demo.kocree.net/home), a music co-creation platform, using Svelte, Nest.js, PostgreSQL, and NooBaa for S3-compatible storage.',
			'Optimized authentication by integrating OAuth 2.0 authentication via Stytch, streamlining the sign-up/sign-in process.',
			'Overhauled data model to enhance privacy and access control for assets, implementing user-based permissions, task-based teams, and dynamic accessibility rules.'
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
			'Built [Here @ UIUC](https://here.illinois.edu/) under Professor Abdussalam Alawini, serving **5,000+ students** across **90+ instructors**.',
			'Decomposed existing Express.js backend into an MVC architecture, streamlining routing with distinct routers, controllers, and services, improving modularity, unit testing, and maintainability.'
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
