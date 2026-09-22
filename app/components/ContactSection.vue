<script setup lang="ts">
import { profile } from '~/data/portfolio'
</script>

<template>
  <section id="contact" class="section contact-section" aria-labelledby="contact-title">
    <div class="container contact-inner">
      <SectionHeading
        heading-id="contact-title"
        eyebrow="05 / Contact"
        title="一緒に、より良い体験をつくりませんか。"
        description="採用やプロジェクトについて、お気軽にご連絡ください。"
      />
      <div class="contact-links">
        <a class="button button-primary" :href="`mailto:${profile.email}`">メールを送る</a>
      </div>
    </div>
  </section>
</template>
