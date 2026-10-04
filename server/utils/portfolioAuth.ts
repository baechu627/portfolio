import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { createError, getCookie, setCookie, type H3Event } from 'h3'

export const SESSION_COOKIE = 'portfolio_session'
export const SESSION_SECONDS = 7 * 24 * 60 * 60

// Read at request time: never expose this value through runtimeConfig or client state.
function passwordFromEnvironment() {
  return process.env.PORTFOLIO_PASSWORD || null
}

function digest(value: string) {
  return createHash('sha256').update(value, 'utf8').digest()
}

function signature(payload: string, password: string) {
  return createHmac('sha256', password).update(`portfolio-session:v1:${payload}`).digest('base64url')
}

export function verifyPortfolioPassword(input: string) {
  const password = passwordFromEnvironment()
  if (!password) throw createError({ statusCode: 503, statusMessage: 'Authentication is unavailable' })
  return timingSafeEqual(digest(input), digest(password))
}

export function createPortfolioSession(now = Date.now()) {
  const password = passwordFromEnvironment()
  if (!password) throw createError({ statusCode: 503, statusMessage: 'Authentication is unavailable' })
  const issuedAt = Math.floor(now / 1000)
  const payload = Buffer.from(JSON.stringify({ issuedAt, expiresAt: issuedAt + SESSION_SECONDS, nonce: randomBytes(16).toString('hex') })).toString('base64url')
  return `${payload}.${signature(payload, password)}`
}

export function verifyPortfolioSession(token: string | undefined, now = Date.now()) {
  const password = passwordFromEnvironment()
  if (!password || !token || token.length > 512) return false
  const parts = token.split('.')
  if (parts.length !== 2 || !parts.every(part => /^[A-Za-z0-9_-]+$/.test(part))) return false
  const [payload, mac] = parts as [string, string]
  if (!timingSafeEqual(digest(mac), digest(signature(payload, password)))) return false
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    const seconds = Math.floor(now / 1000)
    return Number.isSafeInteger(session.issuedAt)
      && Number.isSafeInteger(session.expiresAt)
      && session.issuedAt <= seconds
      && session.expiresAt > seconds
      && session.expiresAt - session.issuedAt === SESSION_SECONDS
      && typeof session.nonce === 'string'
      && /^[a-f0-9]{32}$/.test(session.nonce)
  } catch {
    return false
  }
}

export function isPortfolioAuthenticated(event: H3Event) {
  return verifyPortfolioSession(getCookie(event, SESSION_COOKIE))
}

export function issuePortfolioCookie(event: H3Event) {
  setCookie(event, SESSION_COOKIE, createPortfolioSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
    expires: new Date(Date.now() + SESSION_SECONDS * 1000),
  })
}
