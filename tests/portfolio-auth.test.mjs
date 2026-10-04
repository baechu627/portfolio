import test from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { readdir, readFile } from 'node:fs/promises'
import { SESSION_COOKIE, SESSION_SECONDS, createPortfolioSession, verifyPortfolioSession, verifyPortfolioPassword } from '../server/utils/portfolioAuth.ts'
import { safePortfolioRedirect } from '../app/utils/safePortfolioRedirect.ts'

const password = randomBytes(32).toString('hex')
process.env.PORTFOLIO_PASSWORD = password

test('password verification, signed sessions, expiry, tampering, and password rotation', () => {
  assert.equal(verifyPortfolioPassword(password), true)
  assert.equal(verifyPortfolioPassword('incorrect'), false)
  const token = createPortfolioSession()
  assert.equal(verifyPortfolioSession(token), true)
  assert.equal(verifyPortfolioSession(undefined), false)
  assert.equal(verifyPortfolioSession('true'), false)
  assert.equal(verifyPortfolioSession(`${token}.extra`), false)
  assert.equal(verifyPortfolioSession(token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a')), false)
  assert.equal(verifyPortfolioSession(createPortfolioSession(Date.now() - (SESSION_SECONDS + 1) * 1000)), false)
  assert.equal(verifyPortfolioSession(createPortfolioSession(Date.now() + 60_000)), false)
  process.env.PORTFOLIO_PASSWORD = 'changed-password'
  assert.equal(verifyPortfolioSession(token), false)
  delete process.env.PORTFOLIO_PASSWORD
  assert.equal(verifyPortfolioSession(token), false)
  assert.throws(() => verifyPortfolioPassword(password), { statusCode: 503 })
  process.env.PORTFOLIO_PASSWORD = password
})

test('return paths cannot redirect outside the site or back into the lock page', () => {
  for (const input of ['https://example.com', '//example.com', '/\\example.com', '/unlock', '/unlock?redirect=/']) {
    assert.equal(safePortfolioRedirect(input), '/')
  }
  assert.equal(safePortfolioRedirect('/portfolio?view=1#projects'), '/portfolio?view=1#projects')
  assert.equal(safePortfolioRedirect('/portfolio', '#skills'), '/portfolio#skills')
})

async function availablePort() {
  const server = createServer()
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  await new Promise(resolve => server.close(resolve))
  return port
}

async function startServer(t, configured = true) {
  const port = await availablePort()
  const env = { ...process.env, NODE_ENV: 'production', HOST: '127.0.0.1', PORT: String(port) }
  if (configured) env.PORTFOLIO_PASSWORD = password
  else delete env.PORTFOLIO_PASSWORD
  const child = spawn(process.execPath, ['.output/server/index.mjs'], { env, stdio: 'ignore' })
  t.after(() => child.kill('SIGTERM'))
  const origin = `http://127.0.0.1:${port}`
  for (let attempt = 0; attempt < 100; attempt++) {
    try { await fetch(`${origin}/api/auth/session`); return origin } catch { await new Promise(resolve => setTimeout(resolve, 50)) }
  }
  throw new Error('Build first with npm run build; the production server did not start.')
}

test('production routes, content API, cookie flags, noindex, and uncached responses', async t => {
  const origin = await startServer(t)
  const request = (path, options) => fetch(origin + path, options)
  for (const path of ['/portfolio', '/portfolio?view=1', '/unknown-route', '/portfolio/_payload.json']) {
    const response = await request(path, { redirect: 'manual' })
    assert.equal(response.status, 302, path)
    assert.match(response.headers.get('location'), /^\/\?redirect=/)
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow')
    assert.match(response.headers.get('cache-control'), /no-store/)
  }
  const locked = await request('/')
  assert.equal(locked.status, 200)
  const lockHtml = await locked.text()
  assert.ok(lockHtml.includes('type="password"'))
  for (const privateText of ['oomia6027', 'Case Studies']) assert.ok(!lockHtml.includes(privateText))
  assert.ok(lockHtml.includes('landing-title'))
  const landing = await (await request('/api/landing')).json()
  assert.ok(landing.ja.hero)
  assert.equal(landing.ja.profile.email, undefined)
  assert.equal(landing.ja.projects, undefined)
  assert.match(lockHtml, /name="robots" content="noindex, nofollow"/)
  assert.deepEqual(await (await request('/api/auth/session')).json(), { authenticated: false })
  assert.equal((await request('/api/portfolio')).status, 401)

  const login = (value, requestOrigin = origin) => request('/api/auth/password', {
    method: 'POST', headers: { origin: requestOrigin, 'content-type': 'application/json' }, body: JSON.stringify({ password: value }),
  })
  assert.equal((await login(password, 'https://example.com')).status, 403)
  const wrong = await login('incorrect')
  assert.equal(wrong.status, 401)
  assert.equal(wrong.headers.get('set-cookie'), null)
  assert.equal((await login('')).status, 400)
  const success = await login(password)
  assert.equal(success.status, 200)
  const cookieHeader = success.headers.get('set-cookie')
  for (const flag of ['HttpOnly', 'Secure', 'SameSite=Lax', 'Max-Age=604800', 'Path=/']) assert.ok(cookieHeader.includes(flag), flag)
  const cookie = cookieHeader.split(';')[0]
  assert.ok(!cookie.includes(password))
  const options = { headers: { cookie } }
  assert.deepEqual(await (await request('/api/auth/session', options)).json(), { authenticated: true })
  const content = await request('/api/portfolio', options)
  assert.equal(content.status, 200)
  assert.ok((await content.json()).content.ja.profile.name)
  assert.match(content.headers.get('cache-control'), /no-store/)
  for (const path of ['/', '/portfolio']) {
    const page = await request(path, options)
    assert.equal(page.status, 200)
    assert.match(page.headers.get('cache-control'), /no-store/)
    assert.ok((await page.text()).includes('BAE SUJIN'))
  }
  const expired = `${SESSION_COOKIE}=${createPortfolioSession(Date.now() - (SESSION_SECONDS + 1) * 1000)}`
  assert.equal((await request('/portfolio', { redirect: 'manual', headers: { cookie: expired } })).status, 302)
  assert.equal((await request('/api/portfolio', { headers: { cookie: `${SESSION_COOKIE}=forged` } })).status, 401)
})

test('a missing environment variable fails closed', async t => {
  const origin = await startServer(t, false)
  assert.equal((await fetch(`${origin}/portfolio`, { redirect: 'manual' })).status, 302)
  assert.equal((await fetch(`${origin}/api/auth/password`, {
    method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify({ password }),
  })).status, 503)
})

test('public JavaScript bundles contain neither the password nor private portfolio copy', async () => {
  const paths = await readdir('.output/public/_nuxt', { recursive: true })
  for (const path of paths.filter(path => path.endsWith('.js'))) {
    const source = await readFile(`.output/public/_nuxt/${path}`, 'utf8')
    assert.ok(!source.includes(password), `Password exposed in ${path}`)
    assert.ok(!source.includes('oomia6027'), `Private content exposed in ${path}`)
    assert.ok(!source.includes('PayPay Card'), `Private content exposed in ${path}`)
  }
})
