<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'portfolio-page',
    mode: 'out-in',
  },
})

useHead({
  title: 'Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Vue・Nuxt・TypeScriptを中心に、使いやすく保守しやすいWeb体験をつくるフロントエンドエンジニアのポートフォリオです。',
    },
  ],
})
</script>

<template>
  <div id="top">
    <a class="skip-link" href="#main-content">本文へ移動</a>
    <AppHeader />
    <main id="main-content">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
