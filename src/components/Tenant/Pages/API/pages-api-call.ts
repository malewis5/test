import { appendQueryString, IPage } from '@peakactivity/merce-shared-frontend-components'
import { AxiosInstance } from 'axios'

export interface ITranslationPageResponse {
  data: IPage | null
  error: any
}

export interface IPageApiParams {
  identifier: string
  cacheKey?: string
}

export interface ITranslationPageApiParams {
  route: string
  lang?: string
  cacheKey?: string
  siteId?: string
  fallback?: boolean
}

const ENDPOINTS = {
  PAGE: `pages`,
  TRANSLATION: `pages/translation`,
}

// ----------------------------------------------------- pages -----------------------------------------------------------------------
const getPageData = async (cmsTransport: AxiosInstance, params: IPageApiParams) => {
  try {
    const finalEndpoint: string = appendQueryString(`/${ENDPOINTS.PAGE}`, params)
    const response = await cmsTransport.get(finalEndpoint)
    return {
      error: '',
      data: response.data,
    }
  } catch (e) {
    return {
      error: e.toString(),
      data: null,
    }
  }
}

const getTranslationData = async (
  cmsTransport: AxiosInstance,
  params: ITranslationPageApiParams
): Promise<ITranslationPageResponse> => {
  try {
    const response = await cmsTransport.post(`/${ENDPOINTS.TRANSLATION}`, params)
    return {
      error: null,
      data: response.data,
    }
  } catch (e) {
    return {
      error: e.toString(),
      data: null,
    }
  }
}

const createPage = async (cmsTransport: AxiosInstance, params: any) => {
  try {
    const response = await cmsTransport.post(`/${ENDPOINTS.PAGE}`, params)
    return {
      error: '',
      data: response.data,
    }
  } catch (e) {
    return {
      error: e.toString(),
      data: null,
    }
  }
}

export const PAGES_API_CALLS = {
  getPageData,
  getTranslationData,
  createPage,
}
