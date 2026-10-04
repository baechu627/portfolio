<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'
import PixelIcon from '~/components/PixelIcon.vue'

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
        <PixelIcon name="arrow-up" class="back-to-top-arrow" />
      </a>
    </div>
  </footer>
</template>
