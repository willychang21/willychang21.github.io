import type { Diagram, Project, RichText } from './types';

/**
 * The lead story: AOP. Public copy only: what the platform does and Willy's part in it.
 * No internal metrics, volumes, breakdowns by request type, or system names; the one
 * figure is Willy's own result, rounded.
 */
export const featured: {
	id: string;
	title: string;
	context: string;
	period: string;
	summary: string;
	/** Open-source frameworks, glossed for readers outside ByteDance. */
	stack: { name: string; gloss?: string }[];
	notes: RichText[];
	diagram: Diagram;
} = {
	id: 'aop',
	title: 'AOP, the Agent Operation Platform',
	context: 'TikTok, privacy operations',
	period: '2025–now',
	summary:
		'An internal platform that automates TikTok’s privacy-operations requests. Most requests are now resolved through automation, and edge cases go to specialists.',
	stack: [
		{ name: 'Go' },
		{ name: 'Kitex', gloss: 'Go RPC' },
		{ name: 'Hertz', gloss: 'Go HTTP' },
		{ name: 'Modern.js', gloss: 'React' }
	],
	notes: [
		'Shipped the change-region workflow, which now resolves **over 90%** of those requests automatically.',
		'Launched new intake channels for region-specific regulatory requirements, widening compliance coverage across jurisdictions.'
	],
	diagram: {
		caption: 'Requests arrive through intake channels; AOP resolves most of them automatically and routes edge cases to specialists.',
		nodes: [
			{ id: 'requests', label: 'Privacy requests', x: 1, y: 4, kind: 'actor', labelAt: 'above' },
			{ id: 'intake', label: 'Intake', note: 'Regional channels', x: 4, y: 4, kind: 'service' },
			{ id: 'aop', label: 'AOP', note: 'Agents and workflows', x: 7, y: 4, kind: 'service', labelAt: 'above' },
			{ id: 'resolved', label: 'Resolved', note: 'Most requests', x: 11, y: 2, kind: 'store' },
			{ id: 'specialists', label: 'Specialists', note: 'Edge cases', x: 11, y: 6, kind: 'external' }
		],
		edges: [
			{ from: 'requests', to: 'intake' },
			{ from: 'intake', to: 'aop', route: true },
			{ from: 'aop', to: 'resolved', route: true },
			{ from: 'aop', to: 'specialists' }
		]
	}
};

export const projects: Project[] = [
	{
		id: 'here',
		title: 'Here @ UIUC',
		outcome: { figure: '5,000+', text: 'students use it, across 90+ instructors' },
		context: 'University of Illinois, part-time engineer',
		period: '2024',
		station: 'cmi',
		summary:
			'Classroom attendance for the University of Illinois, built under Professor Abdussalam Alawini. It now runs on the university’s own domain.',
		stack: ['Express.js', 'MVC'],
		notes: [
			'Serves **5,000+ students** across **90+ instructors**.',
			'Decomposed the existing Express.js backend into an MVC architecture, with distinct routers, controllers and services.',
			'The split made the backend more modular and easier to unit test and maintain.'
		],
		links: [{ label: 'Open here.illinois.edu', href: 'https://here.illinois.edu/' }],
		shot: {
			name: 'here',
			emphasis: 'aside',
			alt: 'The Here @ UIUC landing page: the headline Scan Here, the line Effortlessly manage attendances with ease, and a Login to Get Started button.',
			caption: 'here.illinois.edu, captured October 2026.',
			width: 1600,
			height: 1000
		},
		diagram: {
			caption: 'Requests from students and instructors pass through distinct routers, controllers and services.',
			nodes: [
				{ id: 'students', label: 'Students', note: '5,000+', x: 1, y: 2, kind: 'actor', labelAt: 'above' },
				{ id: 'instructors', label: 'Instructors', note: '90+', x: 1, y: 6, kind: 'actor' },
				{ id: 'routers', label: 'Routers', note: 'Express.js', x: 5, y: 4, kind: 'service' },
				{ id: 'controllers', label: 'Controllers', x: 8, y: 4, kind: 'service' },
				{ id: 'services', label: 'Services', x: 11, y: 4, kind: 'service' }
			],
			edges: [
				{ from: 'students', to: 'routers' },
				{ from: 'instructors', to: 'routers' },
				{ from: 'routers', to: 'controllers', route: true },
				{ from: 'controllers', to: 'services', route: true }
			]
		}
	},
	{
		id: 'muosaic',
		title: 'Muosaic',
		outcome: { text: 'OAuth 2.0 sign-in and a new access-control model for shared assets' },
		context: 'Kocree, software engineer intern',
		period: '2024',
		station: 'cmi',
		summary: 'A music co-creation platform where people make songs together.',
		stack: ['Svelte', 'Nest.js', 'PostgreSQL', 'NooBaa', 'Stytch'],
		notes: [
			'Integrated OAuth 2.0 through Stytch, streamlining sign-up and sign-in.',
			'Overhauled the data model for privacy and access control over assets: user-based permissions, task-based teams and dynamic accessibility rules.',
			'Assets live in NooBaa, an S3-compatible object store.'
		],
		links: [{ label: 'Open the live demo', href: 'https://muosaic-demo.kocree.net/home' }],
		shot: {
			name: 'muosaic',
			emphasis: 'lead',
			alt: 'The Muosaic home page: the headline Make your music dreams come true over a night-time lake with a piano boat, and a row of trending Muosaics.',
			caption: 'The Muosaic demo, captured October 2026.',
			width: 1600,
			height: 1000
		},
		diagram: {
			caption: 'A Svelte client talks to a Nest.js API, which signs people in through Stytch and keeps data in PostgreSQL and assets in NooBaa.',
			nodes: [
				{ id: 'app', label: 'Web client', note: 'Svelte', x: 1, y: 4, kind: 'actor' },
				{ id: 'api', label: 'API', note: 'Nest.js', x: 5, y: 4, kind: 'service', labelAt: 'above' },
				{ id: 'stytch', label: 'Stytch', note: 'OAuth 2.0', x: 5, y: 7, kind: 'external', labelAt: 'right' },
				{ id: 'postgres', label: 'PostgreSQL', note: 'Data model', x: 10, y: 2, kind: 'store' },
				{ id: 'noobaa', label: 'NooBaa', note: 'S3-compatible assets', x: 10, y: 6, kind: 'store' }
			],
			edges: [
				{ from: 'app', to: 'api', route: true },
				{ from: 'api', to: 'stytch', route: true },
				{ from: 'api', to: 'postgres', route: true },
				{ from: 'api', to: 'noobaa' }
			]
		}
	},
	{
		id: 'orchestrator',
		title: 'Hybrid in-memory serverless orchestrator',
		outcome: { figure: 'Up to 25%', text: 'lower cost, with service level objectives held' },
		summary: 'A serverless orchestrator that pairs a hybrid in-memory data store with a critical-node selection algorithm.',
		stack: ['AWS Lambda', 'MemoryDB', 'DynamoDB'],
		notes: ['Reduced costs by **up to 25%** while maintaining service level objectives.'],
		links: [{ label: 'Read the project document', href: 'https://drive.google.com/file/d/10u8F0rvaDctXtf7ZJZaqDRalzZoqudZJ/view' }],
		diagram: {
			caption: 'Functions on AWS Lambda, a critical-node selection step, and a hybrid store of MemoryDB (in memory) and DynamoDB.',
			nodes: [
				{ id: 'workflow', label: 'Workflow', x: 1, y: 4, kind: 'actor' },
				{ id: 'lambda', label: 'Functions', note: 'AWS Lambda', x: 4, y: 4, kind: 'service' },
				{ id: 'select', label: 'Critical-node', note: 'selection', x: 7, y: 4, kind: 'service' },
				{ id: 'memorydb', label: 'MemoryDB', note: 'In memory', x: 11, y: 2, kind: 'store' },
				{ id: 'dynamodb', label: 'DynamoDB', x: 11, y: 6, kind: 'store' }
			],
			edges: [
				{ from: 'workflow', to: 'lambda' },
				{ from: 'lambda', to: 'select', route: true },
				{ from: 'select', to: 'memorydb', route: true },
				{ from: 'select', to: 'dynamodb' }
			]
		}
	},
	{
		id: 'ar-navigation',
		title: 'Augmented-reality navigation',
		outcome: { figure: 'Team of 4', text: 'led, building AR games on image recognition' },
		summary: 'A location-based AR navigation app with games built on image recognition.',
		stack: ['Unity', 'C#', 'ARCore', 'Mapbox'],
		notes: [
			'Led a team of **4 engineers**.',
			'Designed AR games around image recognition with the ARCore SDK.',
			'Integrated Mapbox for 3D routing and mapping.'
		],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/willychang21/MapboxARGame' }],
		diagram: {
			caption: 'Camera frames go through ARCore image recognition into the Unity game, which routes with Mapbox.',
			nodes: [
				{ id: 'camera', label: 'Camera', x: 1, y: 2, kind: 'actor', labelAt: 'above' },
				{ id: 'arcore', label: 'ARCore', note: 'Image recognition', x: 4, y: 2, kind: 'external', labelAt: 'above' },
				{ id: 'player', label: 'Player', x: 1, y: 6, kind: 'actor' },
				{ id: 'unity', label: 'Game', note: 'Unity, C#', x: 7, y: 5, kind: 'service' },
				{ id: 'mapbox', label: 'Mapbox', note: '3D routing, maps', x: 11, y: 5, kind: 'external' }
			],
			edges: [
				{ from: 'camera', to: 'arcore', route: true },
				{ from: 'arcore', to: 'unity', route: true },
				{ from: 'player', to: 'unity' },
				{ from: 'unity', to: 'mapbox', route: true }
			]
		}
	},
	{
		id: 'messenger',
		title: 'Realtime chat for iOS',
		outcome: { text: 'Text, location and media messaging on an MVVM architecture' },
		summary: 'A messenger with text, location and multimedia messages, on UIKit and Firebase.',
		stack: ['Swift', 'UIKit', 'Firebase', 'MapKit', 'AVFoundation'],
		notes: [
			'An MVVM architecture keeps updates and new features simple to add.',
			'Location and multimedia messages through MapKit and AVFoundation.',
			'Backend on Firebase Realtime Database, Cloud Storage, Cloud Firestore and Firebase Authentication.'
		],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/willychang21/Messenger' }],
		diagram: {
			caption: 'View, view model and model layers, with the model backed by four Firebase services.',
			nodes: [
				{ id: 'view', label: 'View', note: 'UIKit', x: 1, y: 4, kind: 'actor' },
				{ id: 'vm', label: 'ViewModel', x: 4, y: 4, kind: 'service', labelAt: 'above' },
				{ id: 'media', label: 'MapKit', note: 'AVFoundation', x: 4, y: 7, kind: 'external', labelAt: 'right' },
				{ id: 'model', label: 'Model', x: 7, y: 4, kind: 'service', labelAt: 'above' },
				{ id: 'auth', label: 'Authentication', x: 11, y: 1, kind: 'store' },
				{ id: 'rtdb', label: 'Realtime Database', x: 11, y: 3, kind: 'store' },
				{ id: 'firestore', label: 'Cloud Firestore', x: 11, y: 5, kind: 'store' },
				{ id: 'storage', label: 'Cloud Storage', x: 11, y: 7, kind: 'store' }
			],
			edges: [
				{ from: 'view', to: 'vm', route: true },
				{ from: 'vm', to: 'media' },
				{ from: 'vm', to: 'model', route: true },
				{ from: 'model', to: 'auth' },
				{ from: 'model', to: 'rtdb', route: true },
				{ from: 'model', to: 'firestore' },
				{ from: 'model', to: 'storage' }
			]
		}
	}
];
