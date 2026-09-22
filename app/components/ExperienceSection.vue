<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
const experienceTrack = ref<HTMLOListElement | null>(null)

function moveExperience(direction: number) {
  experienceTrack.value?.scrollBy({
    left: direction * experienceTrack.value.clientWidth * 0.8,
    behavior: 'smooth',
  })
}
</script>

<template>
  <section id="experience" class="section section-tinted" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        heading-id="experience-title"
        :eyebrow="ui.experienceEyebrow"
        :title="ui.experienceTitle"
        :description="ui.experienceDescription"
      />
      <div class="section-tools">
        <p class="carousel-hint">{{ ui.carouselHint }}</p>
        <div class="carousel-controls">
          <button type="button" class="carousel-button arrow-glyph" :aria-label="ui.previousSlide" @click="moveExperience(-1)">←</button>
          <button type="button" class="carousel-button arrow-glyph" :aria-label="ui.nextSlide" @click="moveExperience(1)">→</button>
        </div>
      </div>
      <ol ref="experienceTrack" class="timeline" :aria-label="ui.experienceAria" tabindex="0">
        <li v-for="experience in content.experiences" :key="`${experience.period}-${experience.role}`" class="timeline-item">
          <p class="timeline-period">{{ experience.period }}</p>
          <div class="timeline-content">
            <h3>{{ experience.role }}</h3>
            <p class="company">{{ experience.company }}</p>
            <p>{{ experience.summary }}</p>
            <ul class="detail-list">
              <li v-for="highlight in experience.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
