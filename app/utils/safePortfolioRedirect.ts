export function safePortfolioRedirect(value: unknown, hash = '') {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')
    || /[\\\u0000-\u001f]/.test(value)) return '/'
  try {
    const url = new URL(value, 'https://portfolio.local')
    if (url.origin !== 'https://portfolio.local' || url.pathname.replace(/\/$/, '') === '/unlock') return '/'
    return url.pathname + url.search + (url.hash || hash)
  } catch {
    return '/'
  }
}
