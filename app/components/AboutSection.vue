<script setup lang="ts">
import { about } from '~/data/portfolio'
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container split-layout">
      <SectionHeading
        heading-id="about-title"
        eyebrow="01 / About"
        :title="about.title"
      />
      <div class="prose">
        <p class="lead-text">
          {{ about.lead }}
        </p>
        <p v-for="paragraph in about.paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </section>
</template>
