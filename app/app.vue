<script setup lang="ts">
import type { PortfolioData } from '~/composables/usePortfolioContent'
import type { LandingData } from '~/composables/useLandingContent'

const { language } = usePortfolioLanguage()
const data = useState<PortfolioData | null>('portfolio-content', () => null)
const landing = useState<LandingData | null>('landing-content', () => null)
const authenticated = useState('portfolio-authenticated', () => false)
const route = useRoute()
const profile = computed(() => landing.value?.[language.value].profile
  ?? (authenticated.value ? data.value?.content[language.value].profile : undefined))

useHead(() => ({
  htmlAttrs: { lang: language.value },
  titleTemplate: (title) => profile.value
    ? (title ? `${title} | ${profile.value.name}` : `${profile.value.name} | ${profile.value.role}`)
    : 'Portfolio access',
  meta: [
    { name: 'theme-color', content: '#ffffff' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Noto+Sans:wght@600;700&family=Noto+Sans+JP:wght@600;700&display=swap',
    },
  ],
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <CursorFollower v-if="authenticated || route.path === '/'" />
    <NuxtPage v-if="authenticated || route.path === '/'" />
  </div>
</template>

<style src="~/assets/css/main.css" />
<style src="~/assets/css/portfolio.css" />
