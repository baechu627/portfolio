<script setup lang="ts">
const { content } = useLandingContent()


definePageMeta({
  pageTransition: {
    name: 'portfolio-page',
    mode: 'out-in',
  },
})

useHead(() => ({
  title: content.value.profile.role,
  htmlAttrs: { class: 'landing-viewport-locked' },
  meta: [{ name: 'description', content: content.value.hero.lead }],
}))
</script>

<template>
  <MainVisual />
</template>
