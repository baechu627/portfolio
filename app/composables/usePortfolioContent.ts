import type { portfolioContent, portfolioUi } from '~/data/portfolio'

export interface PortfolioData {
  content: typeof portfolioContent
  ui: typeof portfolioUi
}

export function usePortfolioContent() {
  const { language } = usePortfolioLanguage()
  const data = useState<PortfolioData | null>('portfolio-content', () => null)
  // The global route guard loads this data before mounting any protected page.
  const content = computed(() => data.value!.content[language.value])
  const ui = computed(() => data.value!.ui[language.value])
  return { content, ui }
}
