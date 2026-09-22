<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { portfolioContent, portfolioUi, type Project } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
const selectedProject = ref<Project | null>(null)
const modalCloseButton = ref<HTMLButtonElement | null>(null)

function openProject(project: Project) {
  selectedProject.value = project
  nextTick(() => modalCloseButton.value?.focus())
}

function closeProject() {
  selectedProject.value = null
}
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
          @select="openProject"
        />
      </div>
    </div>
  </section>

  <Teleport to="body">
    <Transition name="project-modal">
      <div
        v-if="selectedProject"
        class="project-modal"
        role="presentation"
        @click.self="closeProject"
        @keydown.esc="closeProject"
      >
        <div
          class="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          tabindex="-1"
        >
          <button
            ref="modalCloseButton"
            type="button"
            class="modal-close"
            :aria-label="ui.closeModal"
            @click="closeProject"
          >
            ×
          </button>
          <div class="project-meta">
            <span>{{ selectedProject.category }}</span>
          </div>
          <h3 id="project-dialog-title">{{ selectedProject.title }}</h3>
          <p class="project-description">{{ selectedProject.description }}</p>
          <dl class="case-details">
            <div v-for="detail in selectedProject.details" :key="detail.label">
              <dt>{{ detail.label }}</dt>
              <dd>{{ detail.text }}</dd>
            </div>
          </dl>
          <ul class="tag-list" :aria-label="ui.technologiesAria">
            <li v-for="technology in selectedProject.technologies" :key="technology">{{ technology }}</li>
          </ul>
          <a
            v-if="selectedProject.link"
            class="text-link"
            :href="selectedProject.link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ selectedProject.link.label }} <span class="arrow-glyph" aria-hidden="true">↗</span>
            <span class="visually-hidden">{{ ui.newTab }}</span>
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
