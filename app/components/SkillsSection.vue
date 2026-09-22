<script setup lang="ts">
import { skillGroups } from '~/data/portfolio'
</script>

<template>
  <section id="skills" class="section section-dark" aria-labelledby="skills-title">
    <div class="container">
      <SectionHeading
        heading-id="skills-title"
        eyebrow="04 / Skills"
        title="できること"
        description="実務で使用している技術と、現在学習・探索している領域を分けて掲載しています。"
      />
      <div class="skills-grid">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          class="skill-card"
          :class="{ 'skill-card-learning': group.kind === 'learning' }"
        >
          <p class="skill-category">{{ group.kind === 'professional' ? 'Professional Experience' : 'Learning / Exploring' }}</p>
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
