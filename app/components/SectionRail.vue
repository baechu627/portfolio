<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { portfolioContent, portfolioUi } from '~/data/portfolio'

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
const activeSection = ref('#about')
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)

      if (visibleSections[0]) {
        activeSection.value = `#${visibleSections[0].target.id}`
      }
    },
    { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
  )

  content.value.navigation.forEach((item) => {
    const section = document.querySelector(item.href)
    if (section) observer?.observe(section)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <nav class="section-rail" :aria-label="ui.sectionNavigation">
    <ol class="section-rail-list">
      <li v-for="(item, index) in content.navigation" :key="item.href">
        <a
          class="section-rail-link"
          :class="{ 'is-active': activeSection === item.href }"
          :href="item.href"
          :aria-current="activeSection === item.href ? 'location' : undefined"
        >
          <span class="section-rail-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>
