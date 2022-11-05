import { CONFIG_ENV } from '../settings/variables'

export enum ENVS {
  PRODUCTION = 'prod',
  STAGING = 'staging',
  UAT = 'uat',
  DEVELOP = 'dev',
  PREVIEW = 'preview',
  LOCAL = 'local',
}

export const isConfigEnvProd = () => {
  return CONFIG_ENV === ENVS.PREVIEW || CONFIG_ENV === ENVS.PRODUCTION
}

export const envIs = (envs: ENVS[]) => {
  return envs.indexOf(CONFIG_ENV as any) !== -1
}

export const envIsNot = (envs: ENVS[]) => {
  return envs.indexOf(CONFIG_ENV as any) === -1
}
