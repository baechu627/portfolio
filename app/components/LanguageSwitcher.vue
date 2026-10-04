<script setup lang="ts">

const { language, setLanguage } = usePortfolioLanguage()
</script>

<template>
  <div
    class="language-switcher"
    :class="{ 'is-en': language === 'en' }"
    role="group"
    :aria-label="language === 'ja' ? '言語を選択' : 'Select language'"
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
