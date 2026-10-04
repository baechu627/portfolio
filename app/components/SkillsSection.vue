<script setup lang="ts">
import { containOverflowScroll } from '~/utils/containOverflowScroll'

const { content, ui } = usePortfolioContent()

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
      <div
        class="skills-content"
        role="region"
        :aria-label="ui.skillsTitle"
        tabindex="0"
        @wheel="containOverflowScroll"
        @touchstart="containOverflowScroll"
        @touchend="containOverflowScroll"
        @keydown="containOverflowScroll"
      >
        <div class="skills-grid skills-overview">
          <article
            v-for="group in content.skillGroups"
            :key="group.title"
            class="skill-card"
            :class="{ 'skill-card-learning': group.kind === 'learning' }"
          >
            <div class="skill-group-heading">
              <p v-if="group.kind === 'professional'" class="skill-category">{{ ui.professionalExperience }}</p>
              <h3>{{ group.title }}</h3>
            </div>
            <ul class="skill-lines" :aria-label="ui.technologiesAria">
              <li v-for="skill in group.skills" :key="skill" class="skill-line-item">
                <span>{{ skill }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
