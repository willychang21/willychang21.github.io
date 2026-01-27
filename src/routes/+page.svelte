<script lang="ts">
	import { resume } from '$lib/data/resume';
	import { siteConfig } from '$lib/data/seo';
	import Header from '$lib/components/Header.svelte';
	import Section from '$lib/components/Section.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Education from '$lib/components/Education.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
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
</svelte:head>

<main class="mx-auto max-w-3xl px-8 py-20 md:py-32">
	<Header {resume} />

	<Section id="experience" title="Experience" delay={200}>
		{#each resume.experiences as exp, i (exp.company)}
			<Experience {exp} index={i} />
		{/each}
	</Section>

	<Section id="education" title="Education" delay={100}>
		{#each resume.education as edu, i (edu.school)}
			<Education {edu} index={i} />
		{/each}
	</Section>

	<Section id="skills" title="Skills" delay={100}>
		<Skills skills={resume.skills} />
	</Section>

	<Section id="projects" title="Projects" delay={100}>
		{#each resume.projects as project, i (project.name)}
			<Projects {project} index={i} />
		{/each}
	</Section>
</main>
