<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="site-logo" to="/" :aria-label="`${content.profile.name} main visual`">
        <span aria-hidden="true">{{ content.profile.initials }}</span>
      </NuxtLink>
      <nav :aria-label="ui.mainNavigation">
        <ul class="nav-list">
          <li v-for="item in content.navigation" :key="item.href">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
