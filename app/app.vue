<script setup lang="ts">
import { profile } from '~/data/portfolio'

useHead({
  htmlAttrs: { lang: 'ja' },
  titleTemplate: (title) => title ? `${title} | ${profile.name}` : `${profile.name} | Frontend Engineer`,
  meta: [{ name: 'theme-color', content: '#ffffff' }],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style src="~/assets/css/main.css" />
