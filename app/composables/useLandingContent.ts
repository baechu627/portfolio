import type { portfolioContent, portfolioUi } from '~/data/portfolio'

type LandingCopy = {
  profile: Pick<typeof portfolioContent.ja.profile, 'name' | 'role' | 'location'>
  hero: typeof portfolioContent.ja.hero
  ui: Pick<typeof portfolioUi.ja, 'enterPortfolio'>
}
export type LandingData = Record<'ja' | 'en', LandingCopy>

export function useLandingContent() {
  const { language } = usePortfolioLanguage()
  const data = useState<LandingData | null>('landing-content', () => null)
  const content = computed(() => data.value![language.value])
  const ui = computed(() => content.value.ui)
  return { content, ui }
}
