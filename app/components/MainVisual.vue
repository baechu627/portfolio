<script setup lang="ts">
import PixelIcon from '~/components/PixelIcon.vue'
import { containTouchScroll } from '~/utils/containTouchScroll'

const { content, ui } = useLandingContent()
const descriptionLines = computed(() => {
  const { lead, desktopBreakAfter } = content.value.hero
  const index = lead.indexOf(desktopBreakAfter)
  if (index < 0) return [lead]
  const boundary = index + desktopBreakAfter.length
  return [lead.slice(0, boundary), lead.slice(boundary)]
})

const isEntering = ref(false)
const { language } = usePortfolioLanguage()
const route = useRoute()
const authenticated = useState('portfolio-authenticated', () => false)
const password = ref('')
const passwordVisible = ref(false)
const authError = ref('')
const passwordInput = ref<HTMLInputElement | null>(null)
let touchLastY = 0

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0]
  if (touch) touchLastY = touch.clientY
}

function onTouchMove(event: TouchEvent) {
  containTouchScroll(event, touchLastY)
  const touch = event.touches[0]
  if (touch) touchLastY = touch.clientY
}

const passwordLabel = computed(() => language.value === 'ja' ? 'パスワード' : 'Password')
const passwordPlaceholder = computed(() => language.value === 'ja'
  ? 'ここにパスワードを入力してください'
  : 'Please enter your password here')
const passwordToggleLabel = computed(() => language.value === 'ja'
  ? (passwordVisible.value ? 'パスワードを隠す' : 'パスワードを表示')
  : (passwordVisible.value ? 'Hide password' : 'Show password'))
watch(authenticated, value => {
  if (!value) isEntering.value = false
})
watch(password, () => { authError.value = '' })

async function submitPassword() {
  if (isEntering.value) return
  if (!password.value) {
    authError.value = language.value === 'ja'
      ? 'パスワードを入力してください。'
      : 'Please enter your password.'
    passwordInput.value?.focus()
    return
  }
  isEntering.value = true
  authError.value = ''
  try {
    await $fetch('/api/auth/password', { method: 'POST', body: { password: password.value } })
    password.value = ''
    passwordVisible.value = false
    const destination = safePortfolioRedirect(route.query.redirect, route.hash)
    window.location.replace(destination === '/' ? '/portfolio' : destination)
  } catch (cause) {
    const invalid = (cause as { statusCode?: number }).statusCode === 401
    authError.value = language.value === 'ja'
      ? (invalid ? 'パスワードが違います。もう一度お試しください。' : '現在認証できません。しばらくしてからお試しください。')
      : (invalid ? 'Incorrect password. Please try again.' : 'Authentication is unavailable. Please try again later.')
    isEntering.value = false
    await nextTick()
    passwordInput.value?.focus()
    passwordInput.value?.select()
  }
}

function startEnter() {
  isEntering.value = true
}
</script>

<template>
  <main
    class="landing"
    :class="{ 'is-locked': !authenticated }"
    aria-labelledby="landing-title"
    @touchstart.capture.passive="onTouchStart"
    @touchmove="onTouchMove"
  >
    <picture>
      <source
        media="(max-width: 47.99rem)"
        srcset="/images/pixel-sky-mobile.webp"
        width="941"
        height="1672"
      >
      <img
        class="landing-background"
        src="/images/pixel-sky.webp"
        alt=""
        width="1536"
        height="1024"
        fetchpriority="high"
      >
    </picture>
    <section class="landing-shell">
      <PixelSparkles />
      <LanguageSwitcher class="landing-language-switcher" />
      <div class="landing-topline">
        <div class="landing-identity">
          <div class="landing-meta">
            <p>{{ content.profile.name }}</p>
            <p>{{ content.profile.location }}</p>
          </div>
          <p class="landing-role">{{ content.profile.role }}</p>
        </div>
      </div>

      <div class="landing-copy">
        <div class="landing-message">
          <h1 id="landing-title">
            <span>{{ content.hero.titleLineOne }}</span>
            <span>{{ content.hero.titleLineTwo }}</span>
          </h1>
          <p class="landing-description"><template v-for="(line, index) in descriptionLines" :key="index"><br v-if="index > 0" class="landing-description-break">{{ line }}</template></p>
        </div>

        <NuxtLink
          v-if="authenticated"
          class="enter-link"
          :class="{ 'is-entering': isEntering }"
          to="/portfolio"
          :aria-busy="isEntering || undefined"
          @click="startEnter"
        >
          <span>{{ ui.enterPortfolio }}</span>
          <PixelIcon name="arrow-right" class="enter-arrow" />
        </NuxtLink>
        <form v-else class="landing-access-form" :aria-busy="isEntering" novalidate @submit.prevent="submitPassword">
          <label class="visually-hidden" for="portfolio-password">{{ passwordLabel }}</label>
          <div class="landing-password-field">
            <input
              id="portfolio-password"
              ref="passwordInput"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              autocomplete="current-password"
              :placeholder="passwordPlaceholder"
              required
              maxlength="1024"
              :disabled="isEntering"
              :aria-invalid="!!authError"
              :aria-describedby="authError ? 'landing-auth-error' : undefined"
            >
            <button
              class="landing-password-toggle"
              type="button"
              :aria-label="passwordToggleLabel"
              :aria-pressed="passwordVisible"
              aria-controls="portfolio-password"
              :disabled="isEntering"
              @click="passwordVisible = !passwordVisible"
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter">
                  <path v-if="passwordVisible" d="M2 4 4 2v8M2 10h4M10 2h4v4h-4v4h4M18 2h4v8h-4M18 6h4" />
                  <path v-else d="M4 3v6M1.5 4.5l5 3M1.5 7.5l5-3M12 3v6M9.5 4.5l5 3M9.5 7.5l5-3M20 3v6M17.5 4.5l5 3M17.5 7.5l5-3" />
                </svg>
              </span>
            </button>
          </div>
          <div class="landing-auth-feedback">
            <p class="landing-auth-help">
              <template v-if="language === 'ja'">
                ※ パスワードが不明な場合や、入力してもアクセスできない場合は、<br>
                ご連絡ください。
              </template>
              <template v-else>
                ※ If you don’t know the password or cannot access the site,<br>
                please get in touch.
              </template>
            </p>
            <p v-if="authError" id="landing-auth-error" class="landing-auth-error" role="alert">{{ authError }}</p>
          </div>
          <button class="enter-link" :class="{ 'is-entering': isEntering }" type="submit" :disabled="isEntering">
            <span>{{ ui.enterPortfolio }}</span>
            <PixelIcon name="arrow-right" class="enter-arrow" />
          </button>
        </form>
      </div>

      <div class="landing-footer">
        <LanguageSwitcher class="landing-language-switcher-mobile" />
        <p>{{ content.hero.careerPath }}</p>
      </div>
    </section>
  </main>
</template>
