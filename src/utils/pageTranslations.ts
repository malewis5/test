import {
  CACHE_CONTSTANT,
  CMS_API_CALLS,
  ITranslationPageApiParams,
  ITranslationPageResponse,
} from '@peakactivity/merce-shared-frontend-components'

import getDefaultCmsTransport from '../services/api/cmsInterceptor'

const getTranslatedPage = async (query: { [x: string]: any }) => {
  const params: ITranslationPageApiParams = {
    route: query.id,
    cacheKey: `${CACHE_CONTSTANT.FRONTEND.CONTENT.PAGE}-${query.id}`,
  }
  if (query.lang) {
    params.lang = query.lang
    params.cacheKey = `${CACHE_CONTSTANT.FRONTEND.CONTENT.PAGE}-${query.id}-${query.lang}`
  }
  const pageResponse: ITranslationPageResponse = await CMS_API_CALLS.PAGE.getTranslationData(
    getDefaultCmsTransport(true),
    params
  )
  return {
    error: pageResponse.error ? pageResponse.error.toString() : '',
    data: pageResponse.data,
    canonicalURL: query.canonicalURL,
  }
}

export default getTranslatedPage
