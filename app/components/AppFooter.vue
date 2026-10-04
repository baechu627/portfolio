<script setup lang="ts">
import PixelIcon from '~/components/PixelIcon.vue'

const { content, ui } = usePortfolioContent()

const currentYear = new Date().getFullYear()
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
