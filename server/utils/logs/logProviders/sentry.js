/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const Sentry = require('@sentry/node')

/**
 * Call this at the start of your application
 */
const initialize = () => {
  try {
    const SENTRY_DSN = process.env.SENTRY_DSN || ''
    if (SENTRY_DSN) {
      Sentry.init({
        dsn: SENTRY_DSN,
        debug: false,
        release: process.env.VERSION || 'localhost',
        environment: (process.env.CONFIG_ENV || 'local').toLowerCase(),
        maxValueLength: 750,
      })
    } else {
      console.log('SENTRY_DSN was not provided...')
    }
  } catch (e) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Generic method where you can pass anything in
 * @param {*} config { name:string, settings: object }
 */
const hook = (config) => {
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
const logMessage = (message) => {
  try {
    Sentry.captureMessage(message)
  } catch (e) {
    console.log(`Error logging Sentry: ${e.toString()}`)
  }
}

/**
 * Log generic messages here
 * @param {*} message string || Error
 */
const logError = (error) => {
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

module.exports = { initialize, logMessage, logError, hook }
