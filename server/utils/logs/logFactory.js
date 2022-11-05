/* eslint-disable @typescript-eslint/no-var-requires */
const sentryLogger = require('./logProviders/sentry')
const consoleLogger = require('./logProviders/console')

const logProviders = [sentryLogger, consoleLogger]

/**
 * Call this at the start of your application
 */
const initialize = () => {
  for (const provider of logProviders) {
    provider.initialize()
  }
}

/**
 * Generic method where you can pass anything in
 * @param {*} config { name:string, settings: object }
 */
const hook = (config) => {
  for (const provider of logProviders) {
    provider.hook(config)
  }
}

/**
 * Log generic messages here
 * @param {*} message string
 */
const logMessage = (message) => {
  for (const provider of logProviders) {
    provider.logMessage(message)
  }
}

/**
 * Log generic messages here
 * @param {*} message string || Error
 */
const logError = (error) => {
  for (const provider of logProviders) {
    provider.logError(error)
  }
}

module.exports = { initialize, logMessage, logError, hook }
