<script setup lang="ts">
const { ui } = usePortfolioContent()

const props = defineProps<{
  open: boolean
  title: string
  greetingIntro?: boolean
}>()
const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement | null>(null)
const titleId = `detail-${useId()}`
const greetings = [
  { text: '안녕하세요!', lang: 'ko' },
  { text: 'こんにちは!', lang: 'ja' },
  { text: 'Hello!', lang: 'en' },
] as const
const greetingIndex = ref(greetings.length)
const activeGreeting = computed(() => greetings[greetingIndex.value])
let greetingTimer: ReturnType<typeof setTimeout> | undefined
let pointerStartedOutside = false

function isOutsideDialog(event: MouseEvent | PointerEvent) {
  const element = dialog.value
  if (!element || event.target !== element) return false
  const bounds = element.getBoundingClientRect()
  return event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom
}

function onDialogClick(event: MouseEvent) {
  if (pointerStartedOutside && isOutsideDialog(event)) dialog.value?.close()
  pointerStartedOutside = false
}

function onDialogClose() {
  stopIntro()
  emit('close')
}

function stopIntro() {
  clearTimeout(greetingTimer)
  greetingIndex.value = greetings.length
}

function startIntro() {
  stopIntro()
  if (!props.greetingIntro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  greetingIndex.value = 0
  function advance() {
    greetingIndex.value++
    if (activeGreeting.value) greetingTimer = setTimeout(advance, 700)
  }
  greetingTimer = setTimeout(advance, 700)
}

function syncDialog() {
  if (props.open && !dialog.value?.open) {
    startIntro()
    dialog.value?.showModal()
    dialog.value?.focus({ preventScroll: true })
  } else if (!props.open) {
    stopIntro()
    if (dialog.value?.open) dialog.value.close()
  }
}
watch(() => props.open, syncDialog, { flush: 'post' })
onMounted(syncDialog)
onBeforeUnmount(stopIntro)
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="portfolio-theme project-dialog detail-dialog"
      :class="{ 'about-profile-dialog': !!$slots.profile, 'is-greeting': !!activeGreeting }"
      :hidden="!open"
      :aria-labelledby="titleId"
      tabindex="-1"
      autofocus
      @pointerdown="pointerStartedOutside = isOutsideDialog($event)"
      @pointercancel="pointerStartedOutside = false"
      @click="onDialogClick"
      @close="onDialogClose"
    >
      <template v-if="open">
        <button v-if="!activeGreeting" type="button" class="modal-close" :aria-label="ui.closeModal" @click="dialog?.close()">×</button>
        <div v-if="$slots.profile" v-show="!activeGreeting" class="about-profile-header">
          <slot name="profile" />
        </div>
        <h3 :id="titleId" :class="{ 'visually-hidden': !!activeGreeting }">{{ title }}</h3>
        <div v-if="activeGreeting" class="about-greeting-intro" aria-live="polite" aria-atomic="true">
          <Transition name="about-greeting" mode="out-in" appear>
            <p :key="activeGreeting.lang" :lang="activeGreeting.lang">{{ activeGreeting.text }}</p>
          </Transition>
        </div>
        <div v-else class="detail-dialog-content" :class="{ 'about-intro-content': greetingIntro }">
          <slot />
        </div>
      </template>
    </dialog>
  </Teleport>
</template>
