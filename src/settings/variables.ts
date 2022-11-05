/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

//SENTRY_DSN needs to be visible on the client side and is considered safe practice according to their documentation
export const SENTRY_DSN: string = process.env.SENTRY_DSN || ''
export const VERSION: string = process.env.VERSION || 'localhost'
export const CURRENT_NODE_ENV: string = publicRuntimeConfig.NODE_ENV || 'LOCAL'
export const CONFIG_ENV: string = process.env.CONFIG_ENV || 'local'
export const IS_DEV = process.env.IS_DEV
export const PAGE_TTL: number = process.env.PAGE_TTL ? Number(process.env.PAGE_TTL) : 1
export const RECAPTCHA_SITEKEY: string = process.env.RECAPTCHA_SITEKEY || '6LfGM54fAAAAAL3mMvPqJSQh0PXZnVl4XPJ8tUz5'

// ------- API -------------------
export const CMS_API: string = process.env.CMS_API || 'http://localhost:1337'
export const CMS_SERVICE_ENDPOINT: string = process.env.CMS_SERVICE_ENDPOINT || ''
export const CACHE_ENDPOINT: string = process.env.CACHE_ENDPOINT || ''
export const CACHE_SERVICE_ENDPOINT: string = process.env.CACHE_SERVICE_ENDPOINT || ''
export const IMAGE_TRANSFORMATION_PROXY_URL: string =
  process.env.IMAGE_TRANSFORMATION_PROXY_URL || 'https://image-proxy.dev.peakactivity.merce.io'

// --------GTM--------------------
export const GTM_ID: string = process.env.GTM_ID || 'GTM-N4ZW7HK'
export const GTM_AUTH: string = process.env.GTM_AUTH || ''
export const GTM_ENV: string = process.env.GTM_ENV || ''
export const GTM_HEAD_SCRIPT = `(function(w,d,s,l,i){
  if(!/Trident.*rv:/.test(navigator.userAgent)) {
  w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://analytics.peakactivity.com/gtm.js?id='+i+dl+ '&gtm_auth=${GTM_AUTH}&gtm_preview=${GTM_ENV}&gtm_cookies_win=x';if(f.parentNode) { f.parentNode.appendChild(j);}
  }
})(window,document,'script','dataLayer','${GTM_ID}');`
export const GTM_BODY_SCRIPT = `<iframe src="https://analytics.peakactivity.com/ns.html?id=${GTM_ID}&gtm_auth=${GTM_AUTH}&gtm_preview=${GTM_ENV}gtm_cookies_win=x"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
