<script lang="ts">
	import { resume } from '$lib/data/resume';
	import { siteConfig } from '$lib/data/seo';
	import Header from '$lib/components/Header.svelte';
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

<main class="mx-auto max-w-3xl px-6 py-12 md:py-16">
	<Header {resume} />

	<section id="experience" class="mt-12">
		<h2 class="mb-6 text-xl font-semibold text-[var(--color-text)]">Experience</h2>
		{#each resume.experiences as exp (exp.company)}
			<Experience {exp} />
		{/each}
	</section>

	<section id="education" class="mt-12">
		<h2 class="mb-6 text-xl font-semibold text-[var(--color-text)]">Education</h2>
		{#each resume.education as edu (edu.school)}
			<Education {edu} />
		{/each}
	</section>

	<section id="skills" class="mt-12">
		<h2 class="mb-6 text-xl font-semibold text-[var(--color-text)]">Skills</h2>
		<Skills skills={resume.skills} />
	</section>

	<section id="projects" class="mt-12">
		<h2 class="mb-6 text-xl font-semibold text-[var(--color-text)]">Selected Projects</h2>
		{#each resume.projects as project (project.name)}
			<Projects {project} />
		{/each}
	</section>
</main>
