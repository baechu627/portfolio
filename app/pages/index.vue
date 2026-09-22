<script setup lang="ts">
import { portfolioContent } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])

definePageMeta({
  pageTransition: {
    name: 'portfolio-page',
    mode: 'out-in',
  },
})

useHead(() => ({
  title: content.value.profile.role,
  meta: [{ name: 'description', content: content.value.hero.lead }],
}))
</script>

<template>
  <MainVisual />
</template>
