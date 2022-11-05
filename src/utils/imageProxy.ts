import stripTrailingSlash from '../components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/stripTrailingSlash'
import { IMAGE_TRANSFORMATION_PROXY_URL } from '../settings/variables'

export enum IMAGE_PROXY_TYPES {
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp',
}

export interface IImageProxyFitParams {
  size?: number | string
  quality?: number
  type?: IMAGE_PROXY_TYPES
}

export interface IImageProxyQualityParams {
  quality?: number
  type?: IMAGE_PROXY_TYPES
}

const optimizeImage = (url: string, params?: IImageProxyQualityParams) => {
  if (url.indexOf(IMAGE_TRANSFORMATION_PROXY_URL || '') !== -1) {
    return url
  }
  const quality: number = params?.quality ?? 90
  const type: string = params?.type ?? 'jpeg'
  if (IMAGE_TRANSFORMATION_PROXY_URL) {
    const safeProxyUrl: string = stripTrailingSlash(IMAGE_TRANSFORMATION_PROXY_URL)
    return `${safeProxyUrl}/q${quality},${type}/${url}`
  }
  return url
}

const fit = (url: string, params?: IImageProxyFitParams) => {
  if (url.indexOf(IMAGE_TRANSFORMATION_PROXY_URL || '') !== -1) {
    return url
  }
  const size: number | string = params?.size ?? 300
  const quality: number = params?.quality ?? 90
  const type: string = params?.type ?? 'jpeg'
  //todo: move this to an array of strings
  // if (url.indexOf('morPlaceholder') !== -1) {
  //   return url
  // }
  if (IMAGE_TRANSFORMATION_PROXY_URL) {
    const safeProxyUrl: string = stripTrailingSlash(IMAGE_TRANSFORMATION_PROXY_URL)
    return `${safeProxyUrl}/${size},fit,q${quality},${type}/${url}`
  }
  return url
}

export { fit, optimizeImage }
