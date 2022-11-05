/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import { CONFIG_ENV, SENTRY_DSN, VERSION } from '../../../settings/variables'
import { ILogProviderInterface } from '../logProviderFactory'

const Sentry = require('@sentry/node')

interface ISentryConfiguration {
  dsn: string
  debug?: boolean
  release: string | undefined
  environment: string | undefined
  integrations?: any[]
  tracesSampleRate?: number
  maxValueLength?: number
}

/**
 * Call this at the start of your application
 */
const initialize = () => {
  if (SENTRY_DSN) {
    try {
      const sentryInitConfig: ISentryConfiguration = {
        dsn: SENTRY_DSN,
        debug: false,
        release: VERSION,
        environment: CONFIG_ENV,
        maxValueLength: 750,
      }

      Sentry.init(sentryInitConfig)

      if (process) {
        process.on('unhandledRejection', (err: Error) => {
          Sentry.captureException(err)
        })
        process.on('uncaughtException', (err: Error) => {
          Sentry.captureException(err)
        })
      }
    } catch (e) {
      console.log(`Error logging Sentry: ${e.toString()}`)
    }
  }
}

/**
 * Generic method where you can pass anything in
 * @param {*} config { name:string, settings: object }
 */
const hook = (config: any) => {
  try {
    const app = config.settings.app
    app.use(Sentry.Handlers.errorHandler())
  } catch (e) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Log generic messages here
 * @param {*} message
 */
const logMessage = (message: string) => {
  try {
    Sentry.captureMessage(message)
  } catch (e) {
    console.error(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Log generic messages here
 * @param {*} message
 */
const logWarning = (message: string) => {
  try {
    Sentry.captureWarning(message)
  } catch (e) {
    console.error(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Log generic messages here
 * @param {*} message string || Error
 */
const logError = (error: Error | string) => {
  try {
    if (typeof error === 'string') {
      Sentry.captureException(new Error(error))
      return
    }
    Sentry.captureException(error)
  } catch (e) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

export default { initialize, logMessage, logWarning, logError, hook } as ILogProviderInterface
