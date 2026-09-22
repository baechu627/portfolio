<script setup lang="ts">
import type { Project } from '~/data/portfolio'

defineProps<{
  project: Project
  index: number
}>()
</script>

<template>
  <article class="project-card">
    <div class="project-meta">
      <span>{{ String(index + 1).padStart(2, '0') }}</span>
      <span>{{ project.category }}</span>
    </div>
    <h3>{{ project.title }}</h3>
    <p class="project-description">{{ project.description }}</p>
    <dl class="case-details">
      <div v-for="detail in project.details" :key="detail.label">
        <dt>{{ detail.label }}</dt>
        <dd>{{ detail.text }}</dd>
      </div>
    </dl>
    <ul class="tag-list" aria-label="使用技術">
      <li v-for="technology in project.technologies" :key="technology">{{ technology }}</li>
    </ul>
    <a
      v-if="project.link"
      class="text-link"
      :href="project.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ project.link.label }} <span aria-hidden="true">↗</span>
      <span class="visually-hidden">（新しいタブで開きます）</span>
    </a>
  </article>
</template>
