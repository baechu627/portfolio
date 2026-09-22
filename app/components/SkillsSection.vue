<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
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
      <div class="skills-grid">
        <article
          v-for="group in content.skillGroups"
          :key="group.title"
          class="skill-card"
          :class="{ 'skill-card-learning': group.kind === 'learning' }"
        >
          <p class="skill-category">{{ group.kind === 'professional' ? ui.professionalExperience : ui.learningExploring }}</p>
          <h3>{{ group.title }}</h3>
          <p>{{ group.description }}</p>
          <ul class="tag-list">
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
