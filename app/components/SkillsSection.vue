<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'
import DetailModal from '~/components/DetailModal.vue'
import PixelIcon from '~/components/PixelIcon.vue'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
const detailsOpen = ref(false)
</script>

<template>
  <section id="skills" class="section section-dark" aria-labelledby="skills-title">
    <div class="container">
      <SectionHeading
        heading-id="skills-title"
        :eyebrow="ui.skillsEyebrow"
        :title="ui.skillsTitle"
        :description="ui.skillsDescription"
      />
      <div class="skills-grid skills-overview">
        <article
          v-for="group in content.skillGroups"
          :key="group.title"
          class="skill-card"
          :class="{ 'skill-card-learning': group.kind === 'learning' }"
        >
          <p class="skill-category">{{ group.kind === 'professional' ? ui.professionalExperience : ui.learningExploring }}</p>
          <h3>{{ group.title }}</h3>
          <ul class="skill-lines" :aria-label="ui.technologiesAria">
            <li v-for="skill in group.skills" :key="skill" class="skill-line-item">
              <span>{{ skill }}</span>
            </li>
          </ul>
        </article>
      </div>
      <button class="summary-link" type="button" aria-haspopup="dialog" @click="detailsOpen = true">{{ language === 'ja' ? '経験・学習について' : 'About my experience & learning' }} <PixelIcon name="modal" /></button>
    </div>
  </section>
  <DetailModal v-if="detailsOpen" :open="detailsOpen" :title="ui.skillsTitle" @close="detailsOpen = false">
    <div v-for="group in content.skillGroups" :key="group.title">
      <h4>{{ group.title }}</h4>
      <p>{{ group.kind === 'professional' ? ui.professionalExperience : ui.learningExploring }}</p>
      <p>{{ group.description }}</p>
    </div>
  </DetailModal>
</template>
