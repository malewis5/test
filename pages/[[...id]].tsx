import { CACHE_CONTSTANT, Loader, OmniPage } from '@peakactivity/merce-shared-frontend-components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

import { PageNotFound } from '../src/components/Tenant/Common/404/404'
import { ITranslationPageResponse, PAGES_API_CALLS } from '../src/components/Tenant/Pages/API/pages-api-call'
import renderPropsMethods from '../src/components/Tenant/Widgets/index'
import getDefaultCmsTransport from '../src/services/api/cmsInterceptor'
import { IMAGE_TRANSFORMATION_PROXY_URL } from '../src/settings/variables'
import logProviderFactory from '../src/utils/logs/logProviderFactory'

interface IPageProps {
  page: any
  error: any
  title: string
  description: string
  metaImageUrl: string
}

/**
 * Gets called both client side and server side and uses the props returned from getStaticProps
 * @param param0
 */
const DynamicPage = ({ error, page, title, description, metaImageUrl }: IPageProps) => {
  // -------- fallback ------------------------
  const router = useRouter()
  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Loader center spinner="/spinners/3gears.svg" />
  }

  if (error || !page) {
    return <PageNotFound />
  }

  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta name="description" property="og:description" content={description} />
        <meta name="image" property="og:image" content={metaImageUrl} />
      </Head>
      <OmniPage
        Head={Head}
        transport={getDefaultCmsTransport(true)}
        data={page}
        imageTransformationProxyUrl={IMAGE_TRANSFORMATION_PROXY_URL}
        // imageTransformationDefaultSettings={{
        //   quality: 'q10',
        // }}

        renderHooks={{
          ...renderPropsMethods,
        }}
      />
    </>
  )
}

// --------------------------------------------------- GetStaticProps -------------------------------------------------------------
/**
 * If you export an async function called getStaticProps from a page,
 * Next.js will pre-render this page at build time using the props returned by getStaticProps.
 * This method never gets called on the client-side
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * @param params
 */
export async function getServerSideProps(props: any) {
  try {
    const { query } = props
    const pageId: string | string[] = query?.id || 'home'
    const route: string = Array.isArray(pageId) ? pageId.join('/') : pageId
    const cacheKey = `${CACHE_CONTSTANT.FRONTEND.CONTENT.PAGE}-${route}`
    const pageResponse: ITranslationPageResponse = await PAGES_API_CALLS.getTranslationData(
      getDefaultCmsTransport(true),
      {
        route: route,
        cacheKey: cacheKey,
      }
    )

    return {
      props: {
        error: pageResponse?.error,
        page: pageResponse?.data?.snapshot?.lookup,
        title: pageResponse?.data?.metaTitle || pageResponse?.data?.title,
        description: pageResponse?.data?.description,
        metaImageUrl: pageResponse?.data?.metaImageUrl,
      },
    } as any
  } catch (e) {
    logProviderFactory.logError(e)
    return {
      error: 'An unknown error has occurred.',
      data: null,
      // Re-generate the post at most once every 10 minutes if a request comes in
    } as any
  }
}
export default DynamicPage
