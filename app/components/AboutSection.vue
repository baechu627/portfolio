<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container split-layout">
      <SectionHeading
        heading-id="about-title"
        :eyebrow="ui.aboutEyebrow"
        :title="ui.aboutTitle"
      />
      <div class="prose">
        <p class="lead-text">
          {{ content.about.lead }}
        </p>
        <p v-for="paragraph in content.about.paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </section>
</template>
