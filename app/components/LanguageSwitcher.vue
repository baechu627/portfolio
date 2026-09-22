<script setup lang="ts">
import { portfolioUi } from '~/data/portfolio'

const { language, setLanguage } = usePortfolioLanguage()
const ui = computed(() => portfolioUi[language.value])
</script>

<template>
  <div
    class="language-switcher"
    :class="{ 'is-en': language === 'en' }"
    role="group"
    :aria-label="ui.languageSelection"
  >
    <button
      type="button"
      :aria-pressed="language === 'ja'"
      aria-label="日本語"
      @click="setLanguage('ja')"
    >
      JP
    </button>
    <button
      type="button"
      :aria-pressed="language === 'en'"
      aria-label="English"
      @click="setLanguage('en')"
    >
      EN
    </button>
  </div>
</template>
