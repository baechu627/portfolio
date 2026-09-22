<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <section id="contact" class="section contact-section" aria-labelledby="contact-title">
    <div class="container contact-inner">
      <SectionHeading
        heading-id="contact-title"
        :eyebrow="ui.contactEyebrow"
        :title="ui.contactTitle"
        :description="ui.contactDescription"
      />
      <div class="contact-links">
        <a class="button button-primary" :href="`mailto:${content.profile.email}`">{{ ui.sendEmail }}</a>
      </div>
    </div>
    <AppFooter class="contact-footer" />
  </section>
</template>
