import { AxiosResponse } from 'axios'

import CACHE_CONTSTANT from '../../components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/cache/constants'
import logProviderFactory from '../../utils/logs/logProviderFactory'
import getDefaultCmsTransport from './cmsInterceptor'

const getHeaders = (title: string) => {
  return {
    cacheKey: `${CACHE_CONTSTANT.FRONTEND.MISC.PUBLIC_CONFIGURATIONS}-${title}`,
  }
}
const getPublicConfigurationsByTitle = async (title: string): Promise<any> => {
  try {
    const response: AxiosResponse = await getDefaultCmsTransport(true).get('publicconfigurations', {
      params: { title },
      headers: getHeaders(title),
    })
    if (response?.data && (response?.data?.[0] as any)?.title === title && (response?.data?.[0] as any)?.keyvalues) {
      return (response?.data?.[0] as any)?.keyvalues
    }
    return []
  } catch (e) {
    logProviderFactory.logError(e)
    return e
  }
}

export { getPublicConfigurationsByTitle }
