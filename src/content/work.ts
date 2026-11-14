import type { Diagram, Project, RichText, SkillGroup, Station } from './types';

/**
 * The lead story: AOP. Public copy only: what the platform does and why it is built
 * that way. No internal names, systems, volumes or operating metrics; the one figure is
 * the owner's own, rounded.
 *
 * One word per thing throughout: request, procedure, runtime, agent, tool service,
 * action, person, release. Each fact is stated once.
 */
export const featured: {
	id: string;
	title: string;
	context: string;
	period: string;
	station: Station['id'];
	summary: string;
	/** What it is built with, by layer: a legend, as on the map. Names few readers know carry a note. */
	stack: SkillGroup[];
	/** The result, led by its figure, as on the project rows. */
	outcome: Required<Project['outcome']>;
	/** How the work was done before AOP: one sentence beside the result. */
	before: string;
	/** How a request moves, one step per component; `node` is that component in the diagram. */
	flow: { node: string; text: RichText }[];
	/** The decisions behind it, a row per topic. Each line says what was done and why. */
	ledger: { label: string; points: RichText[] }[];
	diagram: Diagram;
} = {
	id: 'aop',
	title: 'AOP, the Agent Operation Platform',
	context: 'TikTok, privacy operations',
	period: '2025–now',
	station: 'sjc',
	summary:
		'An LLM agent platform for TikTok’s privacy requests. I designed and built it end to end. Code controls the flow, and the agent answers one question at a time.',
	stack: [
		{ label: 'Services', items: [{ name: 'Go' }, { name: 'Kitex', gloss: 'RPC' }, { name: 'Hertz', gloss: 'HTTP' }, { name: 'MongoDB' }] },
		{ label: 'Interface', items: [{ name: 'Modern.js', gloss: 'React' }] },
		{ label: 'Agents', items: [{ name: 'MCP' }, { name: 'Hybrid search' }, { name: 'VLM', gloss: 'vision model' }] }
	],
	outcome: { figure: 'Over 90%', text: 'of privacy requests resolved automatically' },
	before: 'Before AOP, people handled most of them by hand.',
	flow: [
		{
			node: 'runtime',
			text: 'The runtime follows the procedure step by step. An agent that picks its own next step can skip a check. A new procedure ships as data, with no new code.'
		},
		{
			node: 'agent',
			text: 'At a step that needs judgment, the agent picks one answer from a fixed list. Any other answer goes to a person.'
		},
		{
			node: 'tools',
			text: 'The tool service does every action. The agent has read tools only. For a reply, it finds approved text with hybrid search, and the runtime sends it.'
		}
	],
	ledger: [
		{
			label: 'Reliability',
			points: [
				'A compiler checks each procedure before it ships: every outcome needs a next step, and every path must end.',
				'Each action happens at most once. If a crash interrupts one, AOP marks it unknown and a person checks it.',
				'If a user sends a new message before the first action, AOP restarts on that message. After that, it finishes the run.',
				'The old code could erase a person’s edit. I changed every write to check one field first, so a person’s change wins.'
			]
		},
		{
			label: 'Agent',
			points: [
				'Each agent call starts fresh and reads through read-only MCP tools. The platform sets the request ID, so the agent cannot reach another request.',
				'Against prompt injection, tool results mark the text a user wrote, and the agent treats it as data. It can open only the past requests that its own search returned.',
				'The agent runs a ReAct loop. Code stops the loop at a budget limit, or when it repeats itself or finds nothing new.'
			]
		},
		{
			label: 'Evaluation',
			points: [
				'AOP records each run with its exact model, prompt, tool and procedure versions. Before a release, it replays past requests through the new version on the production code path.',
				'One missed hand-off to a person blocks a release, even when the automation rate goes up.',
				'Separate experiments score search, planning and the full run, so a failure points to one part. AOP compares the LLM judge with labels from people before the judge scores anything.',
				'Each known failure point has a test, some with real faults. An action without a test blocks the release.'
			]
		},
		{
			label: 'Release',
			points: [
				'Every action has a switch: off, shadow or on. A missing setting means off, and a request can still reach a person when all writes are off.',
				'An action that cannot be undone first runs in shadow on live requests. It goes live after a counted run with no wrong action, checked against what the person did.',
				'A separate agent reads each request that needed a person and proposes a fix to the procedure. People approve it.'
			]
		}
	],
	diagram: {
		caption: 'Orange is the automatic path. The agent reads through the tool service, and a request it cannot answer goes to a person.',
		nodes: [
			{ id: 'request', label: 'Request', x: 1, y: 4, kind: 'actor', labelAt: 'above' },
			{ id: 'runtime', label: 'Runtime', note: 'Runs the procedure', x: 4, y: 4, kind: 'service' },
			{ id: 'agent', label: 'Agent', note: 'One question per step', x: 6.5, y: 2, kind: 'service', labelAt: 'above' },
			{ id: 'tools', label: 'Tool service', note: 'Every action, once', x: 9.5, y: 4, kind: 'service' },
			{ id: 'resolved', label: 'Resolved', note: 'Over 90%', x: 11, y: 4, kind: 'store', labelAt: 'above' },
			{ id: 'person', label: 'Person', note: 'Takes over', x: 11, y: 7, kind: 'external' }
		],
		edges: [
			{ from: 'request', to: 'runtime', route: true },
			{ from: 'runtime', to: 'agent' },
			{ from: 'agent', to: 'tools' },
			{ from: 'runtime', to: 'tools', route: true },
			{ from: 'tools', to: 'resolved', route: true },
			{ from: 'runtime', to: 'person' }
		]
	}
};

export const projects: Project[] = [
	{
		id: 'here',
		title: 'Here @ UIUC',
		outcome: { figure: '5,000+', text: 'students and 90+ instructors use it' },
		context: 'University of Illinois, part-time engineer',
		period: '2024',
		station: 'cmi',
		summary:
			'Classroom attendance for the University of Illinois, built under Professor Abdussalam Alawini. It runs on the university’s own domain.',
		stack: ['Express.js', 'MVC'],
		notes: [
			'Split the Express.js backend into routers, controllers and services.',
			'A unit test can now cover one layer at a time.'
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
			caption: 'Requests from students and instructors go through routers, then controllers, then services.',
			nodes: [
				{ id: 'students', label: 'Students', note: '5,000+', x: 1, y: 2, kind: 'actor', labelAt: 'above' },
				{ id: 'instructors', label: 'Instructors', note: '90+', x: 1, y: 6, kind: 'actor' },
				{ id: 'routers', label: 'Routers', note: 'Express.js', x: 5, y: 4, kind: 'service' },
				{ id: 'controllers', label: 'Controllers', x: 8, y: 4, kind: 'service', labelAt: 'above' },
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
			'Added OAuth 2.0 sign-up and sign-in through Stytch.',
			'Redesigned the data model for access to shared assets, with permissions per user, teams per task and access rules per asset.',
			'Stored the assets in NooBaa, an S3-compatible object store.'
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
		outcome: { figure: 'Up to 25%', text: 'less added cost to meet a latency objective, in simulation' },
		context: 'University of Illinois, research with Kai-Siang Wang',
		station: 'cmi',
		summary:
			'A serverless orchestrator that keeps checkpoints on a workflow’s critical path in memory and the rest on disk. It meets a latency objective at the lowest cost.',
		stack: ['AWS Lambda', 'MemoryDB', 'DynamoDB'],
		notes: [
			'A decentralized orchestrator writes each function’s output to a durable store. A fan-in reads one checkpoint per parent, so store latency adds up on the critical path.',
			'Our algorithm ranks each function by its distance from the start and the end of the workflow. Dynamic programming then picks the fewest critical nodes to move to MemoryDB that still meet the latency objective.',
			'In simulation, it cut the added cost **up to 25%** below a baseline that moves the busiest fan-ins first.'
		],
		links: [{ label: 'Read the paper', href: 'https://drive.google.com/file/d/10u8F0rvaDctXtf7ZJZaqDRalzZoqudZJ/view' }],
		diagram: {
			caption:
				'A simplified workflow. Solid lines are function calls and dashed lines are checkpoint writes. The fan-in on the critical path writes its checkpoint to MemoryDB. The other functions write to DynamoDB; the drawing shows one of them.',
			key: 'Orange marks the critical path.',
			nodes: [
				{ id: 'entry', label: 'Entry', x: 1, y: 3, kind: 'actor', labelAt: 'above' },
				{ id: 'a', label: 'Function A', x: 4, y: 1, kind: 'service', labelAt: 'above' },
				{ id: 'b', label: 'Function B', x: 4, y: 5, kind: 'service', labelAt: 'left' },
				{ id: 'fanin', label: 'Fan-in', x: 7, y: 3, kind: 'service', labelAt: 'above' },
				{ id: 'exit', label: 'Exit', x: 11, y: 3, kind: 'service', labelAt: 'above' },
				{ id: 'memorydb', label: 'MemoryDB', note: 'In memory', x: 8, y: 7, kind: 'store' },
				{ id: 'dynamodb', label: 'DynamoDB', note: 'On disk', x: 3, y: 7, kind: 'store' }
			],
			edges: [
				{ from: 'entry', to: 'a', route: true },
				{ from: 'entry', to: 'b' },
				{ from: 'a', to: 'fanin', route: true },
				{ from: 'b', to: 'fanin' },
				{ from: 'fanin', to: 'exit', route: true },
				{ from: 'fanin', to: 'memorydb', checkpoint: true },
				{ from: 'b', to: 'dynamodb', checkpoint: true }
			]
		}
	},
	{
		id: 'ar-navigation',
		title: 'Augmented-reality navigation',
		outcome: { text: 'Led a team of 4 engineers' },
		station: 'tpe',
		summary: 'A location-based navigation app in augmented reality, with games inside it.',
		stack: ['Unity', 'C#', 'ARCore', 'Mapbox'],
		notes: [
			'Designed the games around image recognition with the ARCore SDK.',
			'Added 3D routing and maps with Mapbox.'
		],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/willychang21/MapboxARGame' }],
		diagram: {
			caption: 'Camera frames go through ARCore image recognition into the Unity game, which routes with Mapbox.',
			nodes: [
				{ id: 'camera', label: 'Camera', x: 1, y: 2, kind: 'actor' },
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
		station: 'tpe',
		summary: 'A chat app for iOS, built with UIKit and Firebase.',
		stack: ['Swift', 'UIKit', 'Firebase', 'MapKit', 'AVFoundation'],
		notes: [
			'The MVVM architecture keeps each layer separate, so new features are simple to add.',
			'MapKit handles location messages, and AVFoundation handles photo and video messages.',
			'Firebase handles sign-in, live messages, data and file storage.'
		],
		links: [{ label: 'Source on GitHub', href: 'https://github.com/willychang21/Messenger' }],
		diagram: {
			caption: 'View, view model and model layers, with the model backed by 4 Firebase services.',
			nodes: [
				{ id: 'view', label: 'View', note: 'UIKit', x: 1, y: 4, kind: 'actor' },
				{ id: 'vm', label: 'ViewModel', x: 4, y: 4, kind: 'service', labelAt: 'above' },
				{ id: 'media', label: 'MapKit', note: 'AVFoundation', x: 4, y: 7, kind: 'external', labelAt: 'right' },
				{ id: 'model', label: 'Model', x: 7, y: 4, kind: 'service' },
				{ id: 'auth', label: 'Authentication', x: 11, y: 1, kind: 'store' },
				{ id: 'rtdb', label: 'Realtime Database', short: 'Realtime DB', x: 11, y: 3, kind: 'store' },
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
