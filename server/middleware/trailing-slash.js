/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-rest-params */
const u = require('url')

module.exports = createTrailing

function createTrailing(_options, _next) {
  const next = typeof _options === 'function' ? _options : _next
  const options = typeof _options === 'object' ? _options : {}
  const status = options.status || 302
  const slash = typeof options.slash === 'undefined' ? true : options.slash
  const middleware = !next

  return function trailingSlash() {
    const args = Array.prototype.slice.call(arguments)
    const done = middleware ? args.slice(-1)[0] : next

    const req = args[0]
    const res = args[1]
    const url = u.parse(req.url)
    const length = url.pathname.length
    const hasSlash = url.pathname.charAt(length - 1) === '/'

    if (options && options.ignore && Array.isArray(options.ignore)) {
      for (const ignore of options.ignore) {
        if (url.pathname.startsWith(`${ignore.replace(/\*/g, '')}`)) {
          done()
          return
        }
        if (url.pathname.indexOf(`${ignore}/`) !== -1 && hasSlash) {
          res.sendStatus(404)
          res.end()
          return
        }
      }
    }

    if (hasSlash === slash) {
      if (middleware) {
        return done()
      }
      return next.apply(null, args)
    }

    if (slash) {
      url.pathname = url.pathname + '/'
    } else {
      url.pathname = url.pathname.slice(0, -1)
    }

    res.statusCode = status
    res.setHeader('Location', u.format(url))
    res.end()
  }
}
