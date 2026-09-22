<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const isEntering = ref(false)
const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])

function startEnter() {
  isEntering.value = true
}
</script>

<template>
  <main class="landing" aria-labelledby="landing-title">
    <section class="landing-shell">
      <div class="landing-topline">
        <div class="landing-identity">
          <div class="landing-meta">
            <p>{{ content.profile.name }}</p>
            <p>{{ content.profile.location }}</p>
          </div>
          <p class="landing-role">{{ content.profile.role }}</p>
        </div>
      </div>

      <div class="landing-copy">
        <h1 id="landing-title">
          {{ content.hero.titleLineOne }}<br>
          <span>{{ content.hero.titleLineTwo }}</span>
        </h1>
        <p class="landing-description">{{ content.hero.lead }}</p>

        <LanguageSwitcher />

        <NuxtLink
          class="enter-link"
          :class="{ 'is-entering': isEntering }"
          to="/portfolio"
          :aria-busy="isEntering || undefined"
          @click="startEnter"
        >
          <span>{{ isEntering ? ui.openingPortfolio : ui.enterPortfolio }}</span>
          <span class="enter-arrow" aria-hidden="true">→</span>
        </NuxtLink>
      </div>

      <div class="landing-footer">
        <p>{{ content.hero.careerPath }}</p>
      </div>
    </section>
  </main>
</template>
