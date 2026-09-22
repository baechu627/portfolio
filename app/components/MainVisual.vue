<script setup lang="ts">
import { hero, profile } from '~/data/portfolio'

const isEntering = ref(false)

function startEnter() {
  isEntering.value = true
}
</script>

<template>
  <main class="landing" aria-labelledby="landing-title">
    <section class="landing-shell">
      <div class="landing-topline">
        <p>{{ profile.name }}</p>
        <p>{{ profile.location }}</p>
      </div>

      <div class="landing-copy">
        <p class="eyebrow">{{ profile.role }}</p>
        <h1 id="landing-title">
          UI/UXの視点を、<br>
          <span>実装までつなぐ。</span>
        </h1>
        <p>{{ hero.lead }}</p>
      </div>

      <div class="landing-footer">
        <NuxtLink
          class="enter-link"
          :class="{ 'is-entering': isEntering }"
          to="/portfolio"
          :aria-busy="isEntering || undefined"
          @click="startEnter"
        >
          <span>{{ isEntering ? 'Opening Portfolio' : 'Enter Portfolio' }}</span>
          <span class="enter-arrow" aria-hidden="true">→</span>
        </NuxtLink>
        <p>{{ hero.careerPath }}</p>
      </div>
    </section>
  </main>
</template>
