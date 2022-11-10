import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import {
  CACHE_CONTSTANT,
  combineQueries,
  ICategoryTree,
  ICombineQueryBody,
  ICombineQueryResponse,
  IPage,
} from '@peakactivity/merce-shared-frontend-components'
import { NextPageContext } from 'next'
import App, { AppInitialProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'

import GlobalLayout from '../src/components/Tenant/Layout/LayoutWrapper'
import getDefaultCmsTransport from '../src/services/api/cmsInterceptor'
import logProviderFactory from '../src/utils/logs/logProviderFactory'

interface IMyAppProps extends AppInitialProps {
  footerNav: IPage[]
  headerNav: ICategoryTree[]
  pageProps: any
  account: any
  anonId: any
  isBot: boolean
  isStaticAsset?: boolean
  url?: string
}

export interface IMerceNextPageContext {
  ctx: NextPageContext
}
export interface INextPageProps {
  header?: {
    type: string
    text: string
    link: string
  }
  footer?: {
    type: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

logProviderFactory.initialize()
class MyApp extends App<IMyAppProps> {
  /**
   * Initial server-side call to get header, footer, and cookie data
   * When using this method, we are automatically opting out of static pages unless we include getStaticProps on the page
   * See: https://github.com/vercel/next.js/discussions/10949#discussioncomment-44898
   * @param data AppContext
   */
  static getInitialProps = async (data: any) => {
    const { ctx, Component } = data
    let pageProps: INextPageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx } as any)
    }
    /**
     * We want to combine our api calls for header and footer then cache
     */
    try {
      const { headerNav, footerNav } = await MyApp.getHeaderAndFooter()
      return {
        pageProps,
        footerNav,
        headerNav,
        isBot: false,
        url: ctx?.req?.url,
      } as any
    } catch (e) {
      logProviderFactory.logError(e)
      return {
        props: {
          footerNav: [],
          headerNav: [],
          isBot: false,
        },
      }
    }
  }
  /**
   * We want to combine our api calls to get the header and footer back
   * After, we cache
   */
  static getHeaderAndFooter = async () => {
    let headerNav: ICategoryTree[] = []
    let footerNav: IPage[] = []
    const postBody: ICombineQueryBody = {
      cacheKey: `${CACHE_CONTSTANT.FRONTEND.MISC.HEADER_FOOTER}`,
      queries: [
        {
          id: 'header',
          type: 'navigationtree',
          method: 'navigation',
          params: [{ title: 'Main' }],
        },
        {
          id: 'footer',
          type: 'navigationtree',
          method: 'navigation',
          params: [{ title: 'Footer' }],
        },
      ],
    }
    try {
      const cq: ICombineQueryResponse = await combineQueries(getDefaultCmsTransport(true), postBody)
      if (cq.lookup) {
        const pages: ICategoryTree[] | null = cq.lookup?.header //   has(cq.lookup, ['header'])
        if (pages) {
          headerNav = pages
        }
        const footer: IPage[] | null = cq.lookup?.footer?.[0]?.pages //   has(cq.lookup, ['footer', 0, 'pages'])
        if (footer) {
          footerNav = footer
        }
      }
    } catch (e) {
      logProviderFactory.logError(e)
    }
    return { headerNav, footerNav }
  }

  /**
   * Automatically catch any errors
   * @param error
   * @param errorInfo
   */
  componentDidCatch(error: Error) {
    logProviderFactory.logError(error)
  }

  // ------------------------------------------------------------ RENDER ----------------------------------------------------
  render() {
    const { Component, pageProps, footerNav, headerNav, isBot, isStaticAsset } = this.props
    if (isBot || isStaticAsset) {
      return <div />
    }
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <HubspotProvider>
          <GlobalLayout
            configuration={{
              globalStyles: true,
            }}
            data={{
              headerNav,
              footerNav,
            }}
          >
            <Component {...pageProps} />
          </GlobalLayout>
        </HubspotProvider>
      </>
    )
  }
}

export default MyApp
