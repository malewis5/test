import Document, { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

//import CACHE_CONTSTANT from '../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/cache/constants'
import { CMS_API, GTM_BODY_SCRIPT, GTM_HEAD_SCRIPT } from '../src/settings/variables'
import addIE11Lib from '../src/utils/ie11'

export default class MyDocument extends Document {
  render() {
    // const targetEndpont: string = CACHE_ENDPOINT
    //   ? `${CACHE_ENDPOINT}/themes/active.css?cacheKey=${CACHE_CONTSTANT.FRONTEND.MISC.THEME}`
    //   : `${CMS_API}/themes/active.css`
    const targetEndpont = `${CMS_API}/themes/active.css`
    return (
      <Html lang="en">
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: addIE11Lib(
                'https://polyfill.io/v3/polyfill.js?features=default%2Ces6%2Ces7%2CArray.from%2CArray.isArray%2CArray.prototype.keys%2CArray.prototype.forEach%2CDOMTokenList.prototype.forEach%2CObject.keys%2CPromise%2CObject.assign%2CString.prototype.includes%2CNumber.isNaN%2CPromise.prototype.finally%2CIntersectionObserver%2CIntersectionObserverEntry%2CMutationObserver%2CResizeObserver%2CArray.prototype.%40%40iterator%2CArray.prototype.copyWithin%2CArray.prototype.entries%2CArray.prototype.every%2CArray.prototype.fill%2CArray.prototype.filter%2CArray.prototype.find%2CArray.prototype.findIndex%2CArray.prototype.flat%2CArray.prototype.flatMap%2CArray.prototype.includes%2CArray.prototype.indexOf%2CArray.prototype.map%2CArray.prototype.reduce%2CArray.prototype.values%2CElement%2CMap%2CObject.assign%2CObject.create%2CObject.entries%2CObject.freeze%2CObject.fromEntries%2CSymbol.for%2CSymbol.iterator%2CSymbol.split%2CXMLHttpRequest%2Cdocument.head%2C%7Ehtml5-elements%2Cconsole%2Cconsole.log%2Cconsole.error%2Cconsole.exception%2Cconsole.warn%2Cconsole.debug%2Cconsole.assert%2CElement.prototype.before%2CElement.prototype.animate%2CElement.prototype.append%2CElement.prototype.classList%2CElement.prototype.cloneNode%2CWeakMap%2CWeakSet%2Ces2019'
              ),
            }}
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: addIE11Lib('https://cdnjs.cloudflare.com/ajax/libs/shadydom/1.8.0/shadydom.min.js'),
            }}
          />
          <link href="/styles/main.css" rel="stylesheet" />
          <link href={targetEndpont} rel="stylesheet" />
          <style>{`#__next { height: 100%; }`}</style>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: GTM_HEAD_SCRIPT }} />
          <meta name="facebook-domain-verification" content="alve0iufnrunmqlkf3vsv4cb78rw7t" />
        </Head>
        <body style={{ height: '100%', margin: '0' }}>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
            crossOrigin="anonymous"
          />
          <noscript dangerouslySetInnerHTML={{ __html: GTM_BODY_SCRIPT }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
