import Head from 'next/head'
import Router from 'next/router'
import * as React from 'react'

import { IPage } from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Interfaces/Strapi/Page'
import { ICategory } from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Interfaces/Strapi/Product'
import {
  CMS_API_CALLS,
  ITransport,
} from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Services/API/CMS'
import CACHE_CONTSTANT from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/cache/constants'
import OmniPage from '../../src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/OmniPage'
import BlogLanding from '../../src/components/Tenant/Layout/Blog/BlogLanding/BlogLanding'
import renderPropsMethods from '../../src/components/Tenant/Widgets/index'
import getDefaultCmsTransport from '../../src/services/api/cmsInterceptor'
import { IMAGE_TRANSFORMATION_PROXY_URL } from '../../src/settings/variables'
import logProviderFactory from '../../src/utils/logs/logProviderFactory'

interface IBlogHomeEvents {
  goToCategory: (targetCategory: ICategory) => void
  onNavigateToPost: (id: string) => void
}

export default class HomePage extends React.Component<any> {
  static async getInitialProps(props: any) {
    try {
      //console.log(props, 'props')
      // TODO: find a way to combine all these calls
      // cache for now
      const transport: ITransport = getDefaultCmsTransport(true)
      const { ctx } = props
      // first we need to get the landing page content for blog
      const cacheKey = `${CACHE_CONTSTANT.FRONTEND.BLOG.ARTICLE}-${ctx?.query?.id?.[0] || 'blog-landing-page'}`
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

      // this will return all sub categories
      const blogSummaryResponse = await CMS_API_CALLS.BLOG.getBlogSummary(
        transport,
        `${CACHE_CONTSTANT.FRONTEND.BLOG.ROOT}-landing-page-summary`
      )

      const blogPagesResponse = await CMS_API_CALLS.BLOG.getCategoryBlogPosts(transport, {
        identifier: 'all',
        cacheKey: `${CACHE_CONTSTANT.FRONTEND.BLOG.CATEGORY_POSTS}`,
      })

      return {
        pages: pageResponse.data,
        blogSummary: blogSummaryResponse.data,
        blogPages: blogPagesResponse,
      }
    } catch (e) {
      logProviderFactory.logError(e?.response?.data || e)
      return {
        pages: null,
        blogSummary: null,
        blogPages: null,
      }
    }
  }

  goToCategory = (targetCategory: ICategory) => {
    Router.push(`/blog/category/${targetCategory.slug || targetCategory.id}`)
  }

  onNavigateToPost = (id: string) => {
    Router.push(`/blog/${id}`)
  }
  renderBlogThumbnails = () => {
    // const postCast: IBlogPost = post as IBlogPost
    return <div>N/A</div>
  }
  render() {
    const { blogPages, pages } = this.props

    if (!pages) {
      return <div>Error no blog</div>
    }

    if (pages.length) {
      const page: IPage = pages[0]
      const events: IBlogHomeEvents = {
        goToCategory: this.goToCategory,
        onNavigateToPost: this.onNavigateToPost,
      }

      const allPages = [...blogPages.data.category.pages]

      const blogNoPress = allPages.filter((page) => !page.tags.toLowerCase().includes('press release'))

      blogNoPress
        .sort(function (a, b) {
          const date1 = new Date(a.createdAt)
          const date2 = new Date(b.createdAt)

          return date1.getTime() - date2.getTime()
        })
        .reverse()

      return (
        <>
          <Head>
            <title key="title">{page?.route === 'blog-landing-page' ? 'Insights From The Peak' : page.title}</title>
            <meta
              name="description"
              property="og:description"
              content={
                page?.route === 'blog-landing-page'
                  ? 'Insights, ideas, opinions, and perspectives from PeakActivity to help you move mountains in your business.'
                  : page.description
              }
            />
            <meta
              name="image"
              property="og:image"
              content={
                page?.route === 'blog-landing-page'
                  ? 'https://storage.googleapis.com/peakactivity-site-assets/blogs/blogLandingPage.jpeg'
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
              // locationData={getLocationData()}
              renderHooks={{
                renderBlogThumbnails: this.renderBlogThumbnails,
                ...renderPropsMethods,
              }}
            />
          )}
          {page?.route === 'blog-landing-page' && (
            <div>
              <BlogLanding
                blogs={blogNoPress}
                featureBlog={blogNoPress}
                options={{
                  renderProps: {},
                  events: {
                    onNavigateToPost: this.onNavigateToPost,
                  },
                  viewAll: true,
                  grid: {
                    minItemWidth: '287px',
                    gap: '30px',
                  },
                }}
              />
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
