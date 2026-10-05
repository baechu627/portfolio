<script setup lang="ts">
import PixelIcon from '~/components/PixelIcon.vue'

const { content, ui } = usePortfolioContent()
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
        <a class="button button-primary contact-email" :href="`mailto:${content.profile.email}`">
          <span>{{ ui.sendEmail }}</span>
          <PixelIcon name="mail" />
        </a>
      </div>
    </div>
    <AppFooter class="contact-footer" />
  </section>
</template>
