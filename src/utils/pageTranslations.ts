import { CMS_API_CALLS } from '../components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Services/API/CMS'
import {
  ITranslationPageApiParams,
  ITranslationPageResponse,
} from '../components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Services/API/CMS/page'
import CACHE_CONTSTANT from '../components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/cache/constants'
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
