<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
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
      <ol class="timeline" :aria-label="ui.experienceAria">
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
