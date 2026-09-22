<script setup lang="ts">
defineProps<{
  headingId: string
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="section-heading">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="headingId">{{ title }}</h2>
    <p v-if="description" class="section-description">{{ description }}</p>
  </header>
</template>
