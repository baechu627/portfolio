<script setup lang="ts">
import { portfolioContent, portfolioUi } from '~/data/portfolio'

defineProps<{ activeSection: string }>()
const emit = defineEmits<{ navigate: [href: string] }>()

const { language } = usePortfolioLanguage()
const content = computed(() => portfolioContent[language.value])
const ui = computed(() => portfolioUi[language.value])
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
          @click.prevent="emit('navigate', item.href)"
        >
          <span class="section-rail-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>
