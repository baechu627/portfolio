import type { PortfolioLanguage } from '~/data/portfolio'

export function usePortfolioLanguage() {
  const language = useState<PortfolioLanguage>('portfolio-language', () => 'ja')

  function setLanguage(nextLanguage: PortfolioLanguage) {
    language.value = nextLanguage
  }

  return { language, setLanguage }
}
