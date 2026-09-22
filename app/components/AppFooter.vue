<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const currentYear = new Date().getFullYear()
const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© {{ currentYear }} {{ content.profile.name }}</p>
      <a class="back-to-top" href="#top" :aria-label="ui.backToTop">
        <span class="arrow-glyph back-to-top-arrow" aria-hidden="true">↑</span>
      </a>
    </div>
  </footer>
</template>
