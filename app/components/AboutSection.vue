<script setup lang="ts">
import DetailModal from '~/components/DetailModal.vue'
import PixelIcon from '~/components/PixelIcon.vue'

const { content, ui } = usePortfolioContent()

const { language } = usePortfolioLanguage()
const summaryLines = computed(() => {
  const paragraph = content.value.about.paragraphs[0] ?? ''
  const breakAfter = content.value.about.summaryBreakAfter
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
  <DetailModal v-if="detailsOpen" :open="detailsOpen" :title="content.profile.name" greeting-intro @close="detailsOpen = false">
    <template #profile>
      <div class="about-profile-avatar">
        <img src="/images/about-profile.webp" width="640" height="640" decoding="async" :alt="language === 'ja' ? 'プロフィール用のピクセルアートキャラクター' : 'Pixel-art profile character'">
      </div>
      <p class="about-profile-reading" lang="ja">ぺ　スジン</p>
    </template>
    <p class="about-profile-role">{{ content.profile.role }} · {{ content.profile.location }}</p>
    <p class="modal-intro">{{ content.about.introduction }}</p>
    <dl class="about-personal-details">
      <div v-for="detail in content.about.personalDetails" :key="detail.label">
        <dt>{{ detail.label }}</dt>
        <dd>{{ detail.text }}</dd>
      </div>
    </dl>
    <section v-for="(paragraph, index) in content.about.paragraphs" :key="paragraph" class="modal-content-block">
      <h4 v-if="detailHeadings[index]">{{ detailHeadings[index] }}</h4>
      <p>{{ paragraph }}</p>
    </section>
  </DetailModal>
</template>
