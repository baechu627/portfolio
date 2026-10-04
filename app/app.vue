<script setup lang="ts">
import { portfolioContent } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])

useHead(() => ({
  htmlAttrs: { lang: language.value },
  titleTemplate: (title) => title ? `${title} | ${content.value.profile.name}` : `${content.value.profile.name} | ${content.value.profile.role}`,
  meta: [{ name: 'theme-color', content: '#ffffff' }],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600;700&family=Noto+Sans+JP:wght@600;700&family=Press+Start+2P&display=swap',
    },
  ],
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <CursorFollower />
    <NuxtPage />
  </div>
</template>

<style src="~/assets/css/main.css" />
<style src="~/assets/css/portfolio.css" />
