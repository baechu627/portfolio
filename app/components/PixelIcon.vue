<script setup lang="ts">
defineProps<{ name: 'home' | 'modal' | 'mail' | 'arrow-up-right' | 'arrow-right' | 'arrow-down' | 'arrow-up' }>()
</script>

<template>
  <span class="pixel-icon" aria-hidden="true">
    <span class="pixel-icon-shape" :style="{ maskImage: `url(/icons/${name}.svg)`, WebkitMaskImage: `url(/icons/${name}.svg)` }" />
  </span>
</template>

<style scoped>
.pixel-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 0;
}
.pixel-icon-shape {
  display: block;
  width: var(--icon-size, 1em);
  height: var(--icon-size, 1em);
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}
</style>
