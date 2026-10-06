<script lang="ts">
	import { resume } from '#lib/data/resume.ts';
	import { siteConfig } from '#lib/data/seo.ts';
	import Header from '#lib/components/Header.svelte';
	import Section from '#lib/components/Section.svelte';
	import Experience from '#lib/components/Experience.svelte';
	import Education from '#lib/components/Education.svelte';
	import Skills from '#lib/components/Skills.svelte';
	import Projects from '#lib/components/Projects.svelte';
	import SectionNav from '#lib/components/SectionNav.svelte';
	import Contact from '#lib/components/Contact.svelte';

	const sections = [
		{ id: 'experience', title: 'Experience' },
		{ id: 'education', title: 'Education' },
		{ id: 'projects', title: 'Projects' },
		{ id: 'skills', title: 'Skills' },
		{ id: 'contact', title: 'Contact' }
	];
</script>

<svelte:head>
	<title>{siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords.join(', ')} />
	<meta property="og:title" content={siteConfig.title} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:url" content={siteConfig.url} />
	<meta property="og:image" content={siteConfig.ogImage} />
	<meta name="twitter:title" content={siteConfig.title} />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content={siteConfig.ogImage} />
</svelte:head>

<a href="#experience" class="skip-link">Skip to experience</a>

<main class="mx-auto max-w-2xl px-5 py-14 sm:px-8 md:py-20">
	<Header {resume} />
	<SectionNav {sections} />

	<Section id="experience" title="Experience">
		{#each resume.experiences as exp (exp.company)}
			<Experience {exp} />
		{/each}
	</Section>

	<Section id="education" title="Education">
		{#each resume.education as edu (edu.school)}
			<Education {edu} />
		{/each}
	</Section>

	<Section id="projects" title="Projects">
		{#each resume.projects as project (project.name)}
			<Projects {project} />
		{/each}
	</Section>

	<Section id="skills" title="Skills">
		<Skills skills={resume.skills} />
	</Section>

	<Section id="contact" title="Contact">
		<Contact {resume} />
	</Section>
</main>
