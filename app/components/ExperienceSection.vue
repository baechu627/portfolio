<script setup lang="ts">
import { experiences } from '~/data/portfolio'
</script>

<template>
  <section id="experience" class="section section-tinted" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        heading-id="experience-title"
        eyebrow="02 / Experience"
        title="経験"
        description="プロダクトの背景を理解し、設計から実装・改善まで責任を持って取り組みます。"
      />
      <ol class="timeline" aria-label="職務経歴">
        <li v-for="experience in experiences" :key="`${experience.period}-${experience.role}`" class="timeline-item">
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
