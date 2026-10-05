/** Briefly reveal overflowing content after a section enters the screen. */
export function useScrollHint() {
  const scrollArea = ref<HTMLElement | null>(null)
  const hintVisible = ref(false)
  const hintStyle = ref<Record<string, string>>({})
  let startTimer: ReturnType<typeof setTimeout> | undefined
  let animationFrame = 0
  let cancelled = false

  function cancelHint() {
    cancelled = true
    clearTimeout(startTimer)
    cancelAnimationFrame(animationFrame)
    animationFrame = 0
    hintVisible.value = false
  }

  function onWheel() {
    // Ignore leftover navigation momentum while the entry hint is waiting.
    // Actual scrolling before it starts is detected by scrollTop in playHint.
    if (animationFrame) cancelHint()
  }

  function playHint() {
    const element = scrollArea.value
    if (cancelled || !element || element.scrollTop > 0) return
    if (!window.matchMedia('(max-width: 69.99rem)').matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const overflow = getComputedStyle(element).overflowY
    const availableScroll = element.scrollHeight - element.clientHeight
    if (!['auto', 'scroll'].includes(overflow) || availableScroll <= 2) return

    const distance = Math.min(24, availableScroll)
    const startedAt = performance.now()
    const downDuration = 360
    const pauseDuration = 100
    const upDuration = 480
    const duration = downDuration + pauseDuration + upDuration
    const repeatCount = 1
    const totalDuration = duration * repeatCount
    const bounds = element.getBoundingClientRect()
    hintStyle.value = {
      left: `${bounds.left + (bounds.width - 16) / 2}px`,
      top: `${bounds.bottom - 32}px`,
      color: getComputedStyle(element).color,
      '--hint-duration': `${duration}ms`,
      '--hint-repeat': String(repeatCount),
    }
    hintVisible.value = true
    const ease = (progress: number) => (1 - Math.cos(Math.PI * progress)) / 2

    function animate(now: number) {
      if (cancelled || !element) return
      const elapsed = now - startedAt
      if (elapsed >= totalDuration) {
        element.scrollTop = 0
        animationFrame = 0
        hintVisible.value = false
        return
      }
      const cycleElapsed = elapsed % duration
      let offset = distance
      if (cycleElapsed < downDuration) {
        offset = distance * ease(cycleElapsed / downDuration)
      } else if (cycleElapsed > downDuration + pauseDuration) {
        const progress = Math.min(1, (cycleElapsed - downDuration - pauseDuration) / upDuration)
        offset = distance * (1 - ease(progress))
      }
      element.scrollTop = offset
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
  }

  onMounted(() => {
    // Wait for the scene transition and fonts before measuring overflow.
    void document.fonts.ready.then(() => {
      if (!cancelled) startTimer = setTimeout(playHint, 800)
    })
    const element = scrollArea.value
    element?.addEventListener('pointerdown', cancelHint, { passive: true })
    element?.addEventListener('touchstart', cancelHint, { passive: true })
    element?.addEventListener('wheel', onWheel, { passive: true })
    element?.addEventListener('keydown', cancelHint)
  })

  onBeforeUnmount(() => {
    cancelHint()
    const element = scrollArea.value
    element?.removeEventListener('pointerdown', cancelHint)
    element?.removeEventListener('touchstart', cancelHint)
    element?.removeEventListener('wheel', onWheel)
    element?.removeEventListener('keydown', cancelHint)
  })

  return { scrollArea, hintVisible, hintStyle }
}
