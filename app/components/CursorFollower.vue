<script setup lang="ts">
const cursor = ref<HTMLSpanElement | null>(null)
let animationFrame = 0
let pointerX = 0
let pointerY = 0
let displayedX = 0
let displayedY = 0
let lastFrameAt = 0
let initialized = false
const followDelayMs = 100

function renderCursor(timestamp: number) {
  animationFrame = 0
  if (!cursor.value) return

  // Time-based easing keeps the trailing effect consistent across refresh rates.
  const elapsed = Math.min(timestamp - lastFrameAt, 64)
  lastFrameAt = timestamp
  const easing = 1 - Math.exp(-elapsed / followDelayMs)
  displayedX += (pointerX - displayedX) * easing
  displayedY += (pointerY - displayedY) * easing
  const settled = Math.hypot(pointerX - displayedX, pointerY - displayedY) < 0.1
  if (settled) {
    displayedX = pointerX
    displayedY = pointerY
  }
  cursor.value.style.transform = `translate3d(${displayedX}px, ${displayedY}px, 0) translate(-50%, -50%)`
  if (!settled) animationFrame = requestAnimationFrame(renderCursor)
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return

  pointerX = event.clientX
  pointerY = event.clientY

  if (!initialized) {
    displayedX = pointerX
    displayedY = pointerY
    initialized = true
    if (cursor.value) cursor.value.style.transform = `translate3d(${displayedX}px, ${displayedY}px, 0) translate(-50%, -50%)`
  }
  cursor.value?.classList.add('is-visible')

  if (!animationFrame) {
    lastFrameAt = performance.now()
    animationFrame = requestAnimationFrame(renderCursor)
  }
}

function handlePointerLeave(event: PointerEvent) {
  if (!event.relatedTarget) {
    cursor.value?.classList.remove('is-visible')
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = 0
    initialized = false
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
