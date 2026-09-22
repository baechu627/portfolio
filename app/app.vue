<script setup lang="ts">
import { portfolioContent } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])

useHead(() => ({
  htmlAttrs: { lang: language.value },
  titleTemplate: (title) => title ? `${title} | ${content.value.profile.name}` : `${content.value.profile.name} | ${content.value.profile.role}`,
  meta: [{ name: 'theme-color', content: '#ffffff' }],
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style src="~/assets/css/main.css" />
