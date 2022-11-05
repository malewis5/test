import { envIs, ENVS } from '../envUtils'

interface ILogConfig {
  force?: boolean
  type?: string
}

const consoleLogger = (label: string, data: any, config: ILogConfig = { force: false, type: 'log' }): void => {
  if (envIs([ENVS.DEVELOP, ENVS.LOCAL, ENVS.STAGING, ENVS.UAT]) || config.force) {
    switch (config?.type) {
      case 'info':
        console.info(`${label || ''}: `, data)
        break
      case 'warn':
        console.warn(`${label || ''}: `, data)
        break
      default:
        console.log(`${label || ''}: `, data)
        break
    }
  }
}

export { consoleLogger }
