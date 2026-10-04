import { isPortfolioAuthenticated } from '../utils/portfolioAuth'

export default defineEventHandler(event => {
  setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  const url = getRequestURL(event)
  const path = url.pathname.replace(/\/$/, '') || '/'
  // Only these public assets are exempt; a route with a file extension is not exempt.
  const asset = ['/images/', '/icons/', '/_nuxt/'].some(prefix => path.startsWith(prefix))
    || ['/robots.txt', '/favicon.ico'].includes(path)
  const developmentAsset = process.env.NODE_ENV !== 'production'
    && ['/__nuxt', '/_nuxt', '/@vite', '/@fs/', '/@id/'].some(prefix => path.startsWith(prefix))
  if (asset || developmentAsset) return

  setHeader(event, 'Cache-Control', 'private, no-store, max-age=0')
  setHeader(event, 'Vary', 'Cookie')
  event.context.portfolioAuthenticated = isPortfolioAuthenticated(event)
  if (path === '/' || path === '/api/landing' || path === '/api/auth/session' || path === '/api/auth/password') return
  if (event.context.portfolioAuthenticated) return

  if (path.startsWith('/api/')) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }
  return sendRedirect(event, `/?redirect=${encodeURIComponent(url.pathname + url.search)}`, 302)
})
