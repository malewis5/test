// env variables
import { appendQueryString } from '@peakactivity/merce-shared-frontend-components'
import axios, { AxiosInstance } from 'axios'

import { CACHE_ENDPOINT, CACHE_SERVICE_ENDPOINT, CMS_API, CMS_SERVICE_ENDPOINT } from '../../settings/variables'
import logProviderFactory from '../../utils/logs/logProviderFactory'

const getQueryStringsAsObject = (search: string) => {
  try {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  } catch (e) {
    return {}
  }
}

function startsWith(str: string, word: string) {
  return str.lastIndexOf(word, 0) === 0
}

const removeQuery = (name: string, targetUrl: string) => {
  return targetUrl
    .split('?')
    .map((url, i) =>
      !i
        ? url
        : url
            .split('&')
            .filter((p) => !startsWith(p, name + '='))
            .join('&')
    )
    .join('?')
}

const getDefaultCmsTransport = (cache?: boolean): AxiosInstance => {
  const isServerSide: boolean = typeof window === undefined
  const hasCache: boolean =
    CACHE_ENDPOINT !== '' && CACHE_ENDPOINT !== undefined && cache !== undefined && cache === true
  let targetEndpoint = ''
  if (!hasCache) {
    targetEndpoint = isServerSide ? CMS_SERVICE_ENDPOINT : CMS_API
  } else {
    targetEndpoint = isServerSide ? CACHE_SERVICE_ENDPOINT : CACHE_ENDPOINT
  }
  const apiAxiosInstance = axios.create({ baseURL: targetEndpoint })
  /**
   * Gets called before each request
   */
  apiAxiosInstance.interceptors.request.use(
    (config) => {
      if (config.headers?.cacheKey) {
        if (hasCache && config.url) {
          config.url = appendQueryString(config.url, { cacheKey: config.headers.cacheKey })
        }
        delete config.headers.cacheKey
      }
      // we don't want cacheKey present in url if going directly to strapi
      if (!hasCache && config.url) {
        const queryAsObject: { [x: string]: any } = getQueryStringsAsObject(config.url)
        if (queryAsObject.cacheKey) {
          config.url = removeQuery('cacheKey', config.url)
        }
      }
      return config
    },
    (error) => {
      logProviderFactory.logError(error)
      return Promise.reject(error)
    }
  )

  apiAxiosInstance.interceptors.response.use(
    (config) => config,
    (error) => {
      logProviderFactory.logError(error)
      return Promise.reject(error)
    }
  )

  return apiAxiosInstance
}

export default getDefaultCmsTransport
