<script setup lang="ts">
import PixelIcon from '~/components/PixelIcon.vue'
import { containTouchScroll } from '~/utils/containTouchScroll'
import { AboutSection, ExperienceSection, ProjectsSection, SkillsSection, ContactSection } from '#components'

const { content, ui } = usePortfolioContent()

const { language } = usePortfolioLanguage()
const route = useRoute()
const router = useRouter()
const scenes = [
  { id: 'about', component: AboutSection, image: 1 },
  { id: 'experience', component: ExperienceSection, image: 2 },
  { id: 'projects', component: ProjectsSection, image: 3 },
  { id: 'skills', component: SkillsSection, image: 4 },
  { id: 'contact', component: ContactSection, image: 5 },
] as const
const activeIndex = ref(Math.max(0, scenes.findIndex(scene => `#${scene.id}` === route.hash)))
const scene = computed(() => scenes[activeIndex.value] ?? scenes[0])
const sceneLabel = computed(() => content.value.navigation[activeIndex.value]?.label ?? scene.value.id)
function warmNextBackground() {
  const next = scenes[activeIndex.value + 1]
  if (!next) return
  const suffix = window.matchMedia('(max-width: 47.99rem)').matches ? '-sp' : ''
  const image = new Image()
  image.decoding = 'async'
  image.src = `/images/section-bg-${next.image}${suffix}.webp`
}
const panel = ref<HTMLElement | null>(null)
const direction = ref(1)
let locked = false
let unlockTimer: ReturnType<typeof setTimeout> | undefined
let wheelTotal = 0
let lastWheelAt = 0
let wheelConsumed = false
let touchStartY = 0
let touchLastY = 0
let touchStartX = 0
let touchAtTop = false
let touchAtBottom = false

function navigate(index: number) {
  if (index < 0 || index >= scenes.length || index === activeIndex.value) return
  direction.value = index > activeIndex.value ? 1 : -1
  activeIndex.value = index
  locked = true
  clearTimeout(unlockTimer)
  unlockTimer = setTimeout(() => { locked = false }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 650)
  void router.replace({ hash: `#${scene.value.id}` })
}

function navigateToHref(href: string) {
  const index = scenes.findIndex(item => `#${item.id}` === href)
  if (index === activeIndex.value) panel.value?.scrollTo({ top: 0, behavior: 'auto' })
  else navigate(index)
}

function advanceContent(step: number) {
  if (locked) return
  navigate(activeIndex.value + step)
}

// Long content remains readable before a gesture advances to the next scene.
function canScroll(element: HTMLElement, delta: number) {
  return delta > 0
    ? element.scrollTop + element.clientHeight < element.scrollHeight - 2
    : element.scrollTop > 2
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
  if (!panel.value || canScroll(panel.value, event.deltaY)) return
  const now = performance.now()
  const gap = now - lastWheelAt
  lastWheelAt = now
  event.preventDefault()
  if (locked || (wheelConsumed && gap < 180)) return
  if (gap >= 180) { wheelTotal = 0; wheelConsumed = false }
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? panel.value.clientHeight : 1)
  if (Math.sign(delta) !== Math.sign(wheelTotal)) wheelTotal = 0
  wheelTotal += delta
  if (Math.abs(wheelTotal) < 60) return
  advanceContent(Math.sign(wheelTotal))
  wheelConsumed = true
  wheelTotal = 0
}

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  if (!touch) return
  touchStartY = touch.clientY
  touchLastY = touch.clientY
  touchStartX = touch.clientX
  touchAtTop = !!panel.value && panel.value.scrollTop <= 2
  touchAtBottom = !!panel.value && panel.value.scrollTop + panel.value.clientHeight >= panel.value.scrollHeight - 2
}

function onTouchMove(event: TouchEvent) {
  containTouchScroll(event, touchLastY)
  const touch = event.touches[0]
  if (touch) touchLastY = touch.clientY
}

function onTouchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0]
  if (!touch || !panel.value || locked) return
  const delta = touchStartY - touch.clientY
  if (Math.abs(delta) < 60 || Math.abs(touch.clientX - touchStartX) >= Math.abs(delta)) return
  if (delta > 0 ? !touchAtBottom : !touchAtTop) return
  if (!canScroll(panel.value, delta)) advanceContent(Math.sign(delta))
}

function onKeydown(event: KeyboardEvent) {
  if (!(event.target instanceof HTMLElement) || event.target.closest('input, textarea, select, [contenteditable="true"]')) return
  const step = ['ArrowDown', 'PageDown'].includes(event.key) ? 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0
  if (step && panel.value) {
    event.preventDefault()
    if (canScroll(panel.value, step)) {
      panel.value.scrollBy({ top: step * (event.key.startsWith('Page') ? panel.value.clientHeight * 0.8 : 40), behavior: 'auto' })
    } else if (!locked) advanceContent(step)
  }
}

function onAnchorClick(event: MouseEvent) {
  if (!(event.target instanceof Element) || !event.target.closest('a[href="#top"]')) return
  event.preventDefault()
  navigate(0)
}

function focusScene() { panel.value?.focus({ preventScroll: true }) }

watch(() => route.hash, hash => {
  const index = scenes.findIndex(item => `#${item.id}` === hash)
  if (index >= 0 && index !== activeIndex.value) {
    direction.value = index > activeIndex.value ? 1 : -1
    activeIndex.value = index
  }
})
onBeforeUnmount(() => { clearTimeout(unlockTimer) })

definePageMeta({
  pageTransition: {
    name: 'portfolio-page',
    mode: 'out-in',
  },
})

useHead(() => ({
  title: 'Portfolio',
  htmlAttrs: { class: 'portfolio-viewport-locked' },
  meta: [{ name: 'description', content: content.value.hero.lead }],
}))
</script>

<template>
  <div id="top" class="portfolio-theme scene-portfolio" :data-scene="scene.id" :style="{ '--scene-direction': direction }" @keydown="onKeydown" @click="onAnchorClick">
    <a class="skip-link" href="#main-content">{{ ui.skipToContent }}</a>
    <AppHeader @navigate="navigateToHref" />
    <SectionRail :active-section="`#${scene.id}`" @navigate="navigateToHref" />
    <main id="main-content" class="scene-stage" tabindex="-1" @wheel="onWheel" @touchstart.capture.passive="onTouchStart" @touchmove="onTouchMove" @touchend.passive="onTouchEnd">
      <Transition name="scene-background">
        <picture :key="scene.id" class="scene-background" :class="{ 'is-skills': scene.id === 'skills' }" aria-hidden="true">
          <source media="(max-width: 47.99rem)" :srcset="`/images/section-bg-${scene.image}-sp.webp`" />
          <img :src="`/images/section-bg-${scene.image}.webp`" alt="" decoding="async" fetchpriority="high" @load="warmNextBackground" />
        </picture>
      </Transition>
      <PixelSparkles class="scene-sparkles" />
      <Transition name="scene-copy" mode="out-in" @after-enter="focusScene">
        <div :key="`${scene.id}-${language}`" ref="panel" class="scene-panel" :class="{ 'is-contact': scene.id === 'contact' }" tabindex="-1">
          <component :is="scene.component" />
        </div>
      </Transition>
    </main>
    <nav class="scene-controls" :aria-label="ui.sectionNavigation">
      <button class="scene-control" type="button" :disabled="activeIndex === 0" :aria-label="language === 'ja' ? '前のセクションへ' : 'Previous section'" @click="advanceContent(-1)"><PixelIcon name="arrow-up" /></button>
      <span class="scene-counter" aria-live="polite">{{ String(activeIndex + 1).padStart(2, '0') }} / 05 <span>{{ sceneLabel }}</span></span>
      <button class="scene-control" type="button" :disabled="activeIndex === scenes.length - 1" :aria-label="language === 'ja' ? '次のセクションへ' : 'Next section'" @click="advanceContent(1)"><PixelIcon name="arrow-down" /></button>
    </nav>
  </div>
</template>
