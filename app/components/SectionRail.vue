<script setup lang="ts">
const { content, ui } = usePortfolioContent()

defineProps<{ activeSection: string }>()
const emit = defineEmits<{ navigate: [href: string] }>()

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
