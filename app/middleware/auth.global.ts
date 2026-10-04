import type { PortfolioData } from '~/composables/usePortfolioContent'
import type { LandingData } from '~/composables/useLandingContent'

export default defineNuxtRouteMiddleware(async to => {
  const authenticated = useState('portfolio-authenticated', () => false)
  const data = useState<PortfolioData | null>('portfolio-content', () => null)
  const request = useRequestFetch()
  const event = useRequestEvent()
  try {
    const session = import.meta.server
      ? { authenticated: event?.context.portfolioAuthenticated === true }
      : await request<{ authenticated: boolean }>('/api/auth/session')
    authenticated.value = session.authenticated
  } catch {
    authenticated.value = false
  }

  if (to.path === '/') {
    const landing = useState<LandingData | null>('landing-content', () => null)
    if (!landing.value) landing.value = await request<LandingData>('/api/landing')
    return
  }
  if (!authenticated.value) {
    return navigateTo({ path: '/', query: { redirect: to.fullPath } }, { replace: true })
  }
  if (!data.value) {
    try {
      data.value = await request<PortfolioData>('/api/portfolio')
    } catch {
      authenticated.value = false
      return navigateTo({ path: '/', query: { redirect: to.fullPath } }, { replace: true })
    }
  }
})
