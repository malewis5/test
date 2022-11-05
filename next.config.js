/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
// const withTypescript = require('@zeit/next-typescript')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

// We must build sourcemaps and include the sourceMapUrl in the js files
// the dockerfile will remove the actual maps after we upload to sentry
const withSourceMaps = require('@zeit/next-source-maps')()
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const { SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN } = process.env

//we don't always want to serve from root
//set this env variable from outside the app if you wish to server from non-root
//NOTE: CONTEXT_PATH should begin with /
const CONTEXT_PATH = '' //`${process.env.CONTEXT_PATH || ""}`;
const devOptions = process.env.IS_DEV
  ? {
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]_[hash:base64:5]',
      },
    }
  : {}

module.exports = withSourceMaps(
  withCSS(
    withSass({
      ...devOptions,
      assetPrefix: `${CONTEXT_PATH}`,
      webpack5: false,
      webpack(config, options) {
        if (process.env.ANALYZE) {
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'server',
              analyzerPort: 8888,
              openAnalyzer: true,
            })
          )
        }
        config.output.publicPath = `${CONTEXT_PATH}/${config.output.publicPath}`
        config.plugins.push(
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
          })
        )
        // In `pages/_app.js`, Sentry is imported from @sentry/node. While
        // @sentry/browser will run in a Node.js environment, @sentry/node will use
        // Node.js-only APIs to catch even more unhandled exceptions.
        //
        // This works well when Next.js is SSRing your page on a server with
        // Node.js, but it is not what we want when your client-side bundle is being
        // executed by a browser.
        //
        // Luckily, Next.js will call this webpack function twice, once for the
        // server and once for the client. Read more:
        // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
        //
        // So ask Webpack to replace @sentry/node imports with @sentry/browser when
        // building the browser's bundle
        if (!options.isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }
        // ----------------------------------------------------------------------------
        // When all the Sentry configuration env variables are available/configured
        // The Sentry webpack plugin gets pushed to the webpack plugins to build
        // and upload the source maps to sentry.
        // This is an alternative to manually uploading the source maps
        // Note: This is disabled in development mode.
        if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN) {
          config.plugins.push(
            new SentryWebpackPlugin({
              include: '.next',
              ignore: ['node_modules'],
              urlPrefix: '~/_next',
              release: process.env.VERSION || options.buildId,
            })
          )
        }
        return config
      },
      cssModules: true,
      env: {
        CONFIG_ENV: process.env.CONFIG_ENV,
        CMS_API: process.env.CMS_API,
        CMS_SERVICE_ENDPOINT: process.env.CMS_SERVICE_ENDPOINT,
        VERSION: process.env.VERSION,
        SENTRY_DSN,
        IS_DEV: process.env.IS_DEV,
        GTM_ID: process.env.GTM_ID,
        GTM_AUTH: process.env.GTM_AUTH,
        GTM_ENV: process.env.GTM_ENV,
        CACHE_ENDPOINT: process.env.CACHE_ENDPOINT,
        CACHE_SERVICE_ENDPOINT: process.env.CACHE_SERVICE_ENDPOINT,
        PAGE_TTL: process.env.PAGE_TTL,
        IMAGE_TRANSFORMATION_PROXY_URL: process.env.IMAGE_TRANSFORMATION_PROXY_URL,
      },
      publicRuntimeConfig: {
        NODE_ENV: process.env.NODE_ENV,
      },
      module: {
        loaders: [
          {
            test: /.tsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader?limit=100000',
          },
        ],
      },
    })
  )
)
