<script setup lang="ts">
import PixelIcon from '~/components/PixelIcon.vue'

const { content, ui } = useLandingContent()

interface Sparkle {
  x: string
  y: string
  kind: 'rays' | 'ring' | 'diamond'
  desktopOnly?: boolean
}

const isEntering = ref(false)
const companionPatterns = [
  [{ x: '-16px', y: '-12px', kind: 'diamond' }, { x: '20px', y: '12px', kind: 'rays' }],
  [{ x: '4px', y: '-20px', kind: 'ring' }, { x: '-12px', y: '16px', kind: 'diamond' }],
  [{ x: '-20px', y: '4px', kind: 'rays' }, { x: '16px', y: '-8px', kind: 'ring' }],
  [{ x: '20px', y: '4px', kind: 'diamond' }, { x: '4px', y: '20px', kind: 'ring' }],
  [{ x: '-12px', y: '-20px', kind: 'ring' }, { x: '-20px', y: '12px', kind: 'rays' }],
]
const sparkles: Sparkle[] = [
  // Each timing group spans both sides and the upper, middle, and lower areas.
  { x: '18%', y: '18%', kind: 'rays' },
  { x: '32%', y: '14%', kind: 'ring' },
  { x: '8%', y: '26%', kind: 'diamond' },
  { x: '82%', y: '18%', kind: 'ring' },
  { x: '68%', y: '14%', kind: 'diamond' },
  { x: '92%', y: '26%', kind: 'rays' },
  { x: '10%', y: '48%', kind: 'diamond' },
  { x: '16%', y: '60%', kind: 'rays' },
  { x: '22%', y: '38%', kind: 'ring' },
  { x: '90%', y: '48%', kind: 'rays' },
  { x: '84%', y: '60%', kind: 'ring' },
  { x: '78%', y: '38%', kind: 'diamond' },
  { x: '24%', y: '82%', kind: 'ring' },
  { x: '10%', y: '76%', kind: 'diamond' },
  { x: '36%', y: '88%', kind: 'rays' },
  { x: '76%', y: '82%', kind: 'diamond' },
  { x: '90%', y: '76%', kind: 'rays' },
  { x: '64%', y: '88%', kind: 'ring' },
  { x: '36%', y: '8%', kind: 'diamond', desktopOnly: true },
  { x: '5%', y: '34%', kind: 'rays', desktopOnly: true },
  { x: '5%', y: '88%', kind: 'ring', desktopOnly: true },
  { x: '64%', y: '8%', kind: 'diamond', desktopOnly: true },
  { x: '95%', y: '34%', kind: 'rays', desktopOnly: true },
  { x: '95%', y: '88%', kind: 'ring', desktopOnly: true },
]
const smallSparkles: Sparkle[] = [
  { x: '12%', y: '12%', kind: 'diamond' },
  { x: '43%', y: '18%', kind: 'rays' },
  { x: '74%', y: '10%', kind: 'ring' },
  { x: '88%', y: '34%', kind: 'diamond' },
  { x: '6%', y: '40%', kind: 'ring' },
  { x: '26%', y: '28%', kind: 'rays' },
  { x: '94%', y: '58%', kind: 'rays' },
  { x: '7%', y: '68%', kind: 'diamond' },
  { x: '20%', y: '90%', kind: 'ring' },
  { x: '48%', y: '84%', kind: 'diamond' },
  { x: '82%', y: '92%', kind: 'rays' },
  { x: '72%', y: '72%', kind: 'ring' },
  { x: '30%', y: '64%', kind: 'ring', desktopOnly: true },
  { x: '70%', y: '64%', kind: 'diamond', desktopOnly: true },
  { x: '38%', y: '76%', kind: 'rays', desktopOnly: true },
  { x: '62%', y: '76%', kind: 'ring', desktopOnly: true },
  { x: '4%', y: '20%', kind: 'diamond', desktopOnly: true },
  { x: '96%', y: '20%', kind: 'rays', desktopOnly: true },
]
const { language } = usePortfolioLanguage()
const route = useRoute()
const authenticated = useState('portfolio-authenticated', () => false)
const password = ref('')
const passwordVisible = ref(false)
const authError = ref('')
const passwordInput = ref<HTMLInputElement | null>(null)
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
  <main class="landing" :class="{ 'is-locked': !authenticated }" aria-labelledby="landing-title">
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
      <div class="landing-sparkles" aria-hidden="true">
        <span
          v-for="(sparkle, index) in sparkles"
          :key="index"
          class="landing-sparkle"
          :class="[`sparkle-${sparkle.kind}`, { 'sparkle-desktop-only': sparkle.desktopOnly }]"
          :style="{ left: sparkle.x, top: sparkle.y, '--delay': `${-(index % 3) * 3}s` }"
        >
          <span
            v-for="(companion, companionIndex) in (sparkle.desktopOnly ? [] : companionPatterns[index % companionPatterns.length])"
            :key="companionIndex"
            class="sparkle-companion"
            :class="`sparkle-${companion.kind}`"
            :style="{ left: companion.x, top: companion.y }"
          />
        </span>
        <span
          v-for="(sparkle, index) in smallSparkles"
          :key="`small-${index}`"
          class="landing-sparkle sparkle-small"
          :class="[`sparkle-${sparkle.kind}`, { 'sparkle-desktop-only': sparkle.desktopOnly }]"
          :style="{ left: sparkle.x, top: sparkle.y, '--delay': `${-(index % 4) * 1.5}s` }"
        />
      </div>
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
          <p class="landing-description">{{ content.hero.lead }}</p>
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
            <input id="portfolio-password" ref="passwordInput" v-model="password" :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password" :placeholder="passwordPlaceholder" required maxlength="1024" :disabled="isEntering" :aria-invalid="!!authError" :aria-describedby="authError ? 'landing-auth-error' : undefined">
            <button class="landing-password-toggle" type="button" :aria-label="passwordToggleLabel" :aria-pressed="passwordVisible" aria-controls="portfolio-password" :disabled="isEntering" @click="passwordVisible = !passwordVisible">
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
