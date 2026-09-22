<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])

definePageMeta({
  pageTransition: {
    name: 'portfolio-page',
    mode: 'out-in',
  },
})

useHead(() => ({
  title: 'Portfolio',
  meta: [{ name: 'description', content: content.value.hero.lead }],
}))
</script>

<template>
  <div id="top">
    <a class="skip-link" href="#main-content">{{ ui.skipToContent }}</a>
    <AppHeader />
    <Transition name="language-content" mode="out-in">
      <main id="main-content" :key="language">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </Transition>
    <AppFooter />
  </div>
</template>
