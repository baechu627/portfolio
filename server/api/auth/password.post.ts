import { issuePortfolioCookie, verifyPortfolioPassword } from '../../utils/portfolioAuth'

export default defineEventHandler(async event => {
  // JSON plus a same-origin check prevents cross-site login submissions.
  const origin = getHeader(event, 'origin')
  const expectedOrigin = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin
  if (origin !== expectedOrigin || !getHeader(event, 'content-type')?.startsWith('application/json')) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid request origin' })
  }
  if (Number(getHeader(event, 'content-length')) > 8192) {
    throw createError({ statusCode: 413, statusMessage: 'Request too large' })
  }
  const body = await readBody<unknown>(event)
  if (!body || typeof body !== 'object' || !('password' in body)
    || typeof body.password !== 'string' || body.password.length === 0 || body.password.length > 1024) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid password input' })
  }
  if (!verifyPortfolioPassword(body.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }
  issuePortfolioCookie(event)
  return { authenticated: true }
})
