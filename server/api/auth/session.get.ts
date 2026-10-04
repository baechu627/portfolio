export default defineEventHandler(event => ({
  authenticated: event.context.portfolioAuthenticated === true,
}))
