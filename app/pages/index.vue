<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'portfolio-page',
    mode: 'out-in',
  },
})

useHead({
  title: 'Frontend Engineer',
  meta: [
    {
      name: 'description',
      content: 'BAE SUJIN — UI/UXの視点を実装までつなぐFrontend Engineer。',
    },
  ],
})
</script>

<template>
  <MainVisual />
</template>
