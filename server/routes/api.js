/* eslint-disable @typescript-eslint/no-var-requires */
// const authorizeDotNetRoutes = require('./payment/providers/authorize-dot-net')W

/**
 * Use this as the base for all your api routes
 */
const getApiRoutes = (fastify, opts, done) => {
  // fastify.register(authorizeDotNetRoutes, {
  //   prefix: '/payment/authorize-dot-net',
  // })W
  done()
}

module.exports = getApiRoutes
