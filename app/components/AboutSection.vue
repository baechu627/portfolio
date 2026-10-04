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
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container split-layout">
      <SectionHeading
        heading-id="about-title"
        :eyebrow="ui.aboutEyebrow"
        :title="ui.aboutTitle"
      />
      <div class="prose about-summary">
        <p class="lead-text">{{ content.about.lead }}</p>
        <p>{{ content.about.paragraphs[0] }}</p>
        <button class="summary-link" type="button" aria-haspopup="dialog" @click="detailsOpen = true">{{ language === 'ja' ? '詳しく見る' : 'Read more' }} <PixelIcon name="modal" /></button>
      </div>
    </div>
  </section>
  <DetailModal v-if="detailsOpen" :open="detailsOpen" :title="ui.aboutTitle" @close="detailsOpen = false">
    <p v-for="paragraph in content.about.paragraphs" :key="paragraph">{{ paragraph }}</p>
  </DetailModal>
</template>
