import { portfolioContent, portfolioUi } from '../../app/data/portfolio'

export default defineEventHandler(() => {
  function landing(language: 'ja' | 'en') {
    const { profile, hero } = portfolioContent[language]
    return {
      profile: { name: profile.name, role: profile.role, location: profile.location },
      hero,
      ui: { enterPortfolio: portfolioUi[language].enterPortfolio },
    }
  }
  // The main visual is public; never include contact details or portfolio sections here.
  return { ja: landing('ja'), en: landing('en') }
})
