<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'
import DetailModal from '~/components/DetailModal.vue'
import PixelIcon from '~/components/PixelIcon.vue'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
const summaryLines = computed(() => {
  const paragraph = content.value.about.paragraphs[0] ?? ''
  const breakAfter = '現在はPayPay CardでFrontend Engineerとして、Vue.js / Nuxt.js / TypeScriptを用いた'
  if (language.value !== 'ja' || !paragraph.startsWith(breakAfter)) return [paragraph]
  return [paragraph.slice(0, breakAfter.length), paragraph.slice(breakAfter.length)]
})
const detailsOpen = ref(false)
const detailHeadings = computed(() => language.value === 'ja'
  ? ['現在の仕事', 'UI実装で大切にしていること', 'チームとの連携']
  : ['Current work', 'My approach to UI implementation', 'Team collaboration'])
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
        <p><span v-for="(line, index) in summaryLines" :key="index" :class="{ 'about-summary-continuation': index > 0 }">{{ line }}</span></p>
        <button class="summary-link" type="button" aria-haspopup="dialog" @click="detailsOpen = true">{{ language === 'ja' ? '詳しく見る' : 'Read more' }} <PixelIcon name="modal" /></button>
      </div>
    </div>
  </section>
  <DetailModal v-if="detailsOpen" :open="detailsOpen" :title="ui.aboutTitle" @close="detailsOpen = false">
    <p class="modal-intro">{{ content.about.lead }}</p>
    <section v-for="(paragraph, index) in content.about.paragraphs" :key="paragraph" class="modal-content-block">
      <h4 v-if="detailHeadings[index]">{{ detailHeadings[index] }}</h4>
      <p>{{ paragraph }}</p>
    </section>
  </DetailModal>
</template>
