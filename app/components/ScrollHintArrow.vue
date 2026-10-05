<script setup lang="ts">
const { language } = usePortfolioLanguage()

defineProps<{
  visible: boolean
  position: Record<string, string>
}>()
</script>

<template>
  <Teleport to="body">
    <span v-if="visible" class="scroll-hint-arrow" :style="position" aria-hidden="true">
      <span class="scroll-hint-label">{{ language === 'ja' ? 'スクロール' : 'Scroll' }}</span>
      <PixelIcon name="arrow-down" />
    </span>
  </Teleport>
</template>

<style scoped>
.scroll-hint-arrow {
  position: fixed;
  z-index: 25;
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  --icon-size: 16px;
  pointer-events: none;
  animation: scroll-hint-arrow var(--hint-duration) ease-in-out var(--hint-repeat) both;
}

.scroll-hint-label {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 4px);
  transform: translateX(-50%);
  font-family: "Noto Sans JP", "Noto Sans", sans-serif;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
}

@keyframes scroll-hint-arrow {
  0% { opacity: 0; transform: translateY(-4px); }
  30% { opacity: 1; }
  60% { opacity: 1; }
  100% { opacity: 0; transform: translateY(4px); }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint-arrow { display: none; animation: none; }
}
</style>
