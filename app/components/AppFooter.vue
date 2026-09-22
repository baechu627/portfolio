<script setup lang="ts">
import { profile } from '~/data/portfolio'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© {{ currentYear }} {{ profile.name }}</p>
      <a href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
    </div>
  </footer>
</template>
