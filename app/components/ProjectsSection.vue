<script setup lang="ts">
import { projects } from '~/data/portfolio'
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        heading-id="projects-title"
        eyebrow="03 / Projects"
        title="Case Studies"
        description="課題、担当範囲、成果が分かる形でプロジェクトを紹介します。"
      />
      <div class="project-grid">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.title"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
