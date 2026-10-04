<script setup lang="ts">
import type { Project } from '~/data/portfolio'
import PixelIcon from '~/components/PixelIcon.vue'

const props = defineProps<{
  project: Project
  index: number
}>()

const emit = defineEmits<{
  select: [project: Project]
}>()
</script>

<template>
  <article class="project-card">
    <button
      type="button"
      class="project-card-trigger"
      aria-haspopup="dialog"
      @click="emit('select', props.project)"
    >
      <span class="project-meta">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <span>{{ project.category }}</span>
      </span>
      <span class="project-card-title-row">
        <span class="project-card-title">{{ project.title }}</span>
        <PixelIcon name="modal" class="project-card-arrow" />
      </span>
    </button>
  </article>
</template>
