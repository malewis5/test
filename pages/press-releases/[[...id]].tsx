import Head from 'next/head'
import Router from 'next/router'
import * as React from 'react'

import { IPage } from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Interfaces/Strapi/Page'
import { ICategory } from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Interfaces/Strapi/Product'
import {
  CMS_API_CALLS,
  ITransport,
} from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Services/API/CMS'
// import { Container } from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Layout'
import CACHE_CONTSTANT from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/cache/constants'
import OmniPage from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/OmniPage'
import renderPropsMethods from '../../src/components/Tenant/Widgets/index'
import PressRelease from '../../src/components/Tenant/Widgets/PressRelease/PressRelease'
import getDefaultCmsTransport from '../../src/services/api/cmsInterceptor'
import { IMAGE_TRANSFORMATION_PROXY_URL } from '../../src/settings/variables'
import logProviderFactory from '../../src/utils/logs/logProviderFactory'

export interface IBlogHomeEvents {
  goToCategory: (targetCategory: ICategory) => void
  onNavigateToPost: (id: string) => void
}
export default class HomePage extends React.Component<any> {
  static async getInitialProps(props: any) {
    try {
      // TODO: find a way to combine all these calls
      // cache for now
      const transport: ITransport = getDefaultCmsTransport(true)

      const { ctx } = props
      const cacheKey = `${CACHE_CONTSTANT.FRONTEND.BLOG.ARTICLE}-${ctx?.query?.id?.[0] || 'press-releases'}`
      const pageResponse: any = await CMS_API_CALLS.PAGE.getPageData(transport, {
        identifier: ctx?.query?.id?.[0] || 'blog-landing-page',
        cacheKey: cacheKey,
      })
      const page: IPage = Array.isArray(pageResponse.data) ? pageResponse.data[0] : pageResponse.data
      if (!page) {
        return {
          statusCode: 404,
        }
      }

      const blogPagesResponse = await CMS_API_CALLS.BLOG.getCategoryBlogPosts(transport, {
        identifier: 'all',
        cacheKey: `${CACHE_CONTSTANT.FRONTEND.BLOG.CATEGORY_POSTS}`,
      })
      return {
        pages: pageResponse.data,
        blogPages: blogPagesResponse,
      }
    } catch (e) {
      logProviderFactory.logError(e?.response?.data || e)
      return {
        pages: null,
        blogPages: null,
      }
    }
  }

  goToCategory = (targetCategory: ICategory) => {
    Router.push(`/blog/category/${targetCategory.slug || targetCategory.id}`)
  }
  onNavigateToPost = (id: string) => {
    Router.push(`/${id}`)
  }
  renderBlogThumbnails = () => {
    return <div>N/A</div>
  }
  render() {
    const { pages, blogPages } = this.props

    if (!pages) {
      return <div>Error no press release</div>
    }

    if (pages.length) {
      const page: IPage = pages[0]
      const events: IBlogHomeEvents = {
        goToCategory: this.goToCategory,
        onNavigateToPost: this.onNavigateToPost,
      }

      const allPages = [...blogPages.data.category.pages]

      const pressFiltered = allPages.filter((page) => page.tags.toLowerCase().includes('press release'))

      pressFiltered
        .sort(function (a, b) {
          const date1 = new Date(a.tags.substring(0, a.tags.indexOf(',')))
          const date2 = new Date(b.tags.substring(0, b.tags.indexOf(',')))

          return date1.getTime() - date2.getTime()
        })
        .reverse()

      return (
        <>
          <Head>
            <title key="title">{page?.route === 'blog-landing-page' ? 'Press Releases and News' : page.title}</title>
            <meta
              name="description"
              content={
                page?.route === 'blog-landing-page'
                  ? 'Stay up to date with the latest product releases, partnerships, and other news from PeakActivity.'
                  : page.description
              }
            />
            <meta
              name="image"
              property="og:image"
              content={
                page?.route === 'blog-landing-page'
                  ? 'https://storage.googleapis.com/peakactivity-site-assets/press-releases/pressBanner.png'
                  : page.metaImageUrl
              }
            />
            <meta name="keywords" content={page.keywords} />
          </Head>
          {page?.route !== 'blog-landing-page' && (
            <OmniPage
              data={page.snapshot.lookup}
              transport={getDefaultCmsTransport(true)}
              events={events}
              imageTransformationProxyUrl={IMAGE_TRANSFORMATION_PROXY_URL}
              renderHooks={{
                renderBlogThumbnails: this.renderBlogThumbnails,
                ...renderPropsMethods,
              }}
            />
          )}
          {page?.route === 'blog-landing-page' && (
            <div>
              <PressRelease press={pressFiltered} />
            </div>
          )}
        </>
      )
    }
    return (
      <>
        <div>404</div>
      </>
    )
  }
}
