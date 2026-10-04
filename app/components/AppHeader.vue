<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'
import PixelIcon from '~/components/PixelIcon.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const emit = defineEmits<{ navigate: [href: string] }>()

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="header-home" to="/" :aria-label="ui.backToHome">
        <PixelIcon name="home" />
      </NuxtLink>
      <a class="site-logo" href="#about" :aria-label="language === 'ja' ? `${content.profile.name} — Aboutへ` : `${content.profile.name} — Go to About`" @click.prevent="emit('navigate', '#about')">
        <span>{{ content.profile.name }}</span>
      </a>
      <LanguageSwitcher class="header-language-switcher" />
    </div>
  </header>
</template>
