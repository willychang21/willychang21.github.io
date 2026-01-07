export interface Experience {
	company: string;
	title: string;
	location: string;
	period: string;
	highlights: string[];
	url?: string;
}

export interface Education {
	school: string;
	degree: string;
	location: string;
	period: string;
}

export interface Project {
	name: string;
	url?: string;
	tech: string;
	highlights: string[];
}

export interface ResumeData {
	name: string;
	phone: string;
	email: string;
	github: string;
	githubUrl: string;
	experiences: Experience[];
	education: Education[];
	skills: {
		languages: string[];
		frontend: string[];
		backend: string[];
		devops: string[];
	};
	projects: Project[];
}

export const resume: ResumeData = {
	name: 'Willy Chang',
	phone: '206-889-0757',
	email: 'willysde2025@gmail.com',
	github: 'willychang21',
	githubUrl: 'https://github.com/willychang21',

	experiences: [
		{
			company: 'TikTok',
			title: 'Software Engineer',
			location: 'San Jose, CA, USA',
			period: 'Apr. 2025 – Present',
			highlights: [
				'Developing internal platforms and workflows to support global data privacy requests, enhancing compliance and user trust.',
				'Launched new data intake channels to address region-specific regulatory requirements, boosting compliance coverage across multiple jurisdictions.',
				'Released Change region automation that reduced manual operations workload, auto-replying to 65% of requests while ops manually processed only 35% of remaining requests.'
			]
		},
		{
			company: 'Kocree',
			title: 'Software Engineer Intern',
			location: 'Champaign, IL, USA',
			period: 'May 2024 – Aug. 2024',
			url: 'https://muosaic-demo.kocree.net/home',
			highlights: [
				'Developed Muosaic, a music co-creation platform, using Svelte, Nest.js, PostgreSQL, and NooBaa for S3-compatible storage.',
				'Optimized authentication by integrating OAuth 2.0 authentication via Stytch, streamlining the sign-up/sign-in process.',
				'Overhauled data model to enhance privacy and access control for assets, implementing user-based permissions, task-based teams, and dynamic accessibility rules.'
			]
		},
		{
			company: 'University of Illinois Urbana-Champaign',
			title: 'Software Engineer, part-time',
			location: 'Champaign, IL, USA',
			period: 'Mar. 2024 – Dec. 2024',
			url: 'https://attendance-uiuc-beta-v1.netlify.app/',
			highlights: [
				'Building Here @ UIUC under Professor Abdussalam Alawini, serving over 5,000+ students across 90+ instructors.',
				'Decomposed existing Express.js backend into an MVC architecture, streamlining routing with distinct routers, controllers, and services, improving modularity, unit testing, and maintainability.'
			]
		},
		{
			company: 'Showu Tech',
			title: 'Software Engineer',
			location: 'Taipei, Taiwan',
			period: 'Jul. 2022 – Aug. 2022',
			highlights: [
				'Developed a job recruitment application using React, focusing on cross-device compatibility and intuitive design.',
				'Improved search functionality by integrating Leaflet.js with Openrouteservice for interactive search maps.'
			]
		}
	],

	education: [
		{
			school: 'University of Illinois Urbana-Champaign',
			degree: 'Master of Computer Science',
			location: 'Champaign, IL, USA',
			period: 'Aug. 2022 – Dec. 2024'
		},
		{
			school: 'Fu Jen Catholic University',
			degree: 'Bachelor of Science in Computer Science',
			location: 'Taipei, Taiwan',
			period: 'Aug. 2015 – Jun. 2019'
		}
	],

	skills: {
		languages: ['Golang', 'TypeScript', 'JavaScript', 'Python', 'Swift', 'C#'],
		frontend: ['React', 'Remix', 'Modern.js', 'Svelte', 'Zustand', 'Tanstack Query', 'Tailwind', 'Jest'],
		backend: ['Kitex (RPC)', 'Hertz (HTTP)', 'NestJS', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'AWS', 'BytePlus'],
		devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux']
	},

	projects: [
		{
			name: 'Hybrid In-Memory Serverless Orchestrator',
			url: 'https://drive.google.com/file/d/10u8F0rvaDctXtf7ZJZaqDRalzZoqudZJ/view',
			tech: 'AWS Lambda, MemoryDB, DynamoDB',
			highlights: [
				'Developed a serverless orchestrator with a hybrid in-memory data store and critical node selection algorithm, reducing costs by up to 25% while maintaining service level objectives.'
			]
		},
		{
			name: 'Augmented Reality Navigation App',
			url: 'https://github.com/willychang21/MapboxARGame',
			tech: 'Unity, C#, ARCore, Mapbox',
			highlights: [
				'Led a 4 engineers team to develop a location-based AR Navigation App using C# on the Unity Engine platform.',
				'Designed AR games with image recognition using ARCore SDK, integrating Mapbox for 3D routing and mapping.'
			]
		},
		{
			name: 'Realtime Chat App',
			url: 'https://github.com/willychang21/Messenger',
			tech: 'iOS, UIKit, Firebase',
			highlights: [
				'Improved code maintainability and scalability from MVVM architecture, simplifying updates and feature expansions.',
				'Enhanced messaging capabilities by introducing location and multimedia messaging features via MapKit and AVFoundation.',
				'Implemented backend infrastructure using Firebase Real-time Database, Cloud Storage, Cloud Firestore, and Firebase Authentication.'
			]
		}
	]
};
