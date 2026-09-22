<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="site-logo" to="/" :aria-label="ui.backToHome">
        <span>{{ content.profile.name }}</span>
      </NuxtLink>
    </div>
  </header>
</template>
