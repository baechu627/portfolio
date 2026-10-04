import { portfolioContent, portfolioUi } from '../../app/data/portfolio'

export default defineEventHandler(event => {
  if (event.context.portfolioAuthenticated !== true) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }
  return { content: portfolioContent, ui: portfolioUi }
})
