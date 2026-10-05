<script setup lang="ts">
import PixelIcon from '~/components/PixelIcon.vue'
import { containOverflowScroll } from '~/utils/containOverflowScroll'
import type { Project } from '~/data/portfolio'

const { content, ui } = usePortfolioContent()
const { scrollArea, hintVisible, hintStyle } = useScrollHint()

const { language } = usePortfolioLanguage()
const websiteLinkLabel = computed(() => language.value === 'ja' ? 'サイトを見る' : 'View website')
const selectedProject = ref<Project | null>(null)
const modalDialog = ref<HTMLDivElement | null>(null)

function openProject(project: Project) {
  selectedProject.value = project
  nextTick(() => modalDialog.value?.focus({ preventScroll: true }))
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
      <div
        ref="scrollArea"
        class="project-grid projects-overview"
        role="region"
        :aria-label="ui.projectsTitle"
        tabindex="0"
        @wheel="containOverflowScroll"
        @touchstart="containOverflowScroll"
        @touchend="containOverflowScroll"
        @keydown="containOverflowScroll"
      >
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
  <ScrollHintArrow :visible="hintVisible" :position="hintStyle" />

  <Teleport to="body">
    <Transition name="project-modal">
      <div
        v-if="selectedProject"
        class="project-modal portfolio-theme"
        role="presentation"
        @click.self="closeProject"
        @keydown.esc="closeProject"
      >
        <div
          ref="modalDialog"
          class="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          tabindex="-1"
        >
          <button
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
          <p v-if="selectedProject.description" class="project-description">{{ selectedProject.description }}</p>
          <dl class="case-details">
            <div v-for="detail in selectedProject.details" :key="detail.label">
              <dt>{{ detail.label }}</dt>
              <dd>
                <a v-if="detail.url" class="text-link" :href="detail.url" target="_blank" rel="noopener noreferrer">
                  {{ websiteLinkLabel }} <PixelIcon name="arrow-up-right" />
                  <span class="visually-hidden">{{ ui.newTab }}</span>
                </a>
                <template v-else>{{ detail.text }}</template>
              </dd>
            </div>
          </dl>
          <section v-if="selectedProject.technologies.length" class="modal-content-block">
            <h4>{{ language === 'ja' ? '使用技術・ツール' : 'Technologies & tools' }}</h4>
            <ul class="tag-list" :aria-label="ui.technologiesAria">
              <li v-for="technology in selectedProject.technologies" :key="technology">{{ technology }}</li>
            </ul>
          </section>
          <a
            v-if="selectedProject.link"
            class="text-link"
            :href="selectedProject.link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ websiteLinkLabel }} <PixelIcon name="arrow-up-right" />
            <span class="visually-hidden">{{ ui.newTab }}</span>
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
