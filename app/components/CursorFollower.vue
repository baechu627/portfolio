<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const cursor = ref<HTMLSpanElement | null>(null)
let animationFrame = 0
let pointerX = 0
let pointerY = 0

function renderCursor() {
  if (cursor.value) {
    cursor.value.style.transform = `translate3d(${pointerX - 10}px, ${pointerY - 10}px, 0)`
    cursor.value.classList.add('is-visible')
  }
  animationFrame = 0
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return

  pointerX = event.clientX
  pointerY = event.clientY

  if (!animationFrame) {
    animationFrame = requestAnimationFrame(renderCursor)
  }
}

function handlePointerLeave(event: PointerEvent) {
  if (!event.relatedTarget) {
    cursor.value?.classList.remove('is-visible')
  }
}

onMounted(() => {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!hasFinePointer || prefersReducedMotion) return

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerout', handlePointerLeave, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerout', handlePointerLeave)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <span ref="cursor" class="cursor-follower" aria-hidden="true" />
</template>
