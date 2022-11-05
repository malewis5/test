// import { CONFIG_ENV } from '../../settings/variables'
import consoleLogger from './providers/console'
import sentryLogger from './providers/sentry'

const logProviders: ILogProviderInterface[] = [sentryLogger, consoleLogger]

// if (CONFIG_ENV) {
//   const lower: string = CONFIG_ENV.toLowerCase()
//   if (lower === 'local' || lower === 'dev') {
//     logProviders.push(consoleLogger)
//   }
// }

export interface ILogProviderHookInterface {
  name: string
  settings: Record<string, any>
}

export interface ILogProviderInterface {
  initialize: (data?: Record<string, any>) => void
  hook: (config?: ILogProviderHookInterface) => void
  logMessage: (message: string) => void
  logError: (message: Error | string) => void
  logWarning: (message: string) => void
}

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
const hook = (config: any) => {
  for (const provider of logProviders) {
    provider.hook(config)
  }
}

/**
 * Log generic messages here
 * @param {*} message string
 */
const logMessage = (message: string) => {
  for (const provider of logProviders) {
    provider.logMessage(message)
  }
}

/**
 * Log generic messages here
 * @param {*} message string
 */
const logWarning = (message: string) => {
  for (const provider of logProviders) {
    provider.logWarning(message)
  }
}

/**
 * Log generic messages here
 * @param {*} message string || Error
 */
const logError = (error: Error | string) => {
  for (const provider of logProviders) {
    provider.logError(error)
  }
}

export default { initialize, logMessage, logError, logWarning, hook } as ILogProviderInterface
