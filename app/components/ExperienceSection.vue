<script setup lang="ts">
import type { Experience } from '~/data/portfolio'
import DetailModal from '~/components/DetailModal.vue'
import PixelIcon from '~/components/PixelIcon.vue'
import { containOverflowScroll } from '~/utils/containOverflowScroll'

const { content, ui } = usePortfolioContent()

const { language } = usePortfolioLanguage()
const selectedExperience = ref<Experience | null>(null)

</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        heading-id="experience-title"
        :eyebrow="ui.experienceEyebrow"
        :title="ui.experienceTitle"
        :description="ui.experienceDescription"
      />
      <ol
        class="timeline experience-overview"
        :aria-label="ui.experienceAria"
        tabindex="0"
        @wheel="containOverflowScroll"
        @touchstart="containOverflowScroll"
        @touchend="containOverflowScroll"
        @keydown="containOverflowScroll"
      >
        <li v-for="experience in content.experiences" :key="`${experience.period}-${experience.role}`" class="timeline-item">
          <button class="experience-trigger" type="button" aria-haspopup="dialog" @click="selectedExperience = experience">
            <span class="timeline-period">{{ experience.period }}</span>
            <span class="experience-role">{{ experience.role }}</span>
            <span class="company">{{ experience.company }}</span>
            <span class="experience-detail-label">{{ language === 'ja' ? '担当業務を見る' : 'View responsibilities' }} <PixelIcon name="modal" /></span>
          </button>
        </li>
      </ol>
    </div>
  </section>
  <DetailModal v-if="selectedExperience" :open="!!selectedExperience" :title="selectedExperience.role" @close="selectedExperience = null">
    <template v-if="selectedExperience">
      <dl class="modal-facts">
        <div><dt>{{ language === 'ja' ? '勤務先' : 'Company' }}</dt><dd>{{ selectedExperience.company }}</dd></div>
        <div><dt>{{ language === 'ja' ? '期間' : 'Period' }}</dt><dd>{{ selectedExperience.period }}</dd></div>
      </dl>
      <section class="modal-content-block">
        <h4>{{ language === 'ja' ? '概要' : 'Overview' }}</h4>
        <p>{{ selectedExperience.summary }}</p>
      </section>
      <section class="modal-content-block">
        <h4>{{ language === 'ja' ? '担当業務・経験' : 'Responsibilities & experience' }}</h4>
        <ul class="detail-list"><li v-for="highlight in selectedExperience.highlights" :key="highlight">{{ highlight }}</li></ul>
      </section>
    </template>
  </DetailModal>
</template>
