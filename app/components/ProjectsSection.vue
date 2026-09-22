<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        heading-id="projects-title"
        :eyebrow="ui.projectsEyebrow"
        :title="ui.projectsTitle"
        :description="ui.projectsDescription"
      />
      <div class="project-grid">
        <ProjectCard
          v-for="(project, index) in content.projects"
          :key="project.title"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
