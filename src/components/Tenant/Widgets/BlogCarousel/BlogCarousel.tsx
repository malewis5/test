import { ICategory, THEME_BUTTON_TYPES, ThemedButton } from '@peakactivity/merce-shared-frontend-components'
import { AxiosResponse } from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import getDefaultCmsTransport from '../../../../services/api/cmsInterceptor'
import logProviderFactory from '../../../../utils/logs/logProviderFactory'
import css from './BlogCarousel.scss'

const spinner = '../../../../../spinners/spinner.gif'

interface ICarouselPage {
  id: string
  title: string
  route: string
  heroImageUrl: string
  createdAt: string
  categories: any
}

const BlogCarousel = () => {
  const [posts, setPosts] = useState<ICarouselPage[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesQuery = `
        {
          categories(where: { slug_in: ["modernization", "optimization", "innovation", "engineering-services", "general"] }) {
            id
            title
            slug
          }
        }
        `
        const categoryResponse: AxiosResponse = await getDefaultCmsTransport(true).post('/graphql', {
          query: categoriesQuery,
        })

        if (categoryResponse.data?.data?.categories.length) {
          const blogCategories = categoryResponse.data?.data?.categories
          const categoriesIds: string[] = blogCategories.map((cat: ICategory) => cat.id)

          const query = `
          {
            pages: pages(where: { type: "blog", categories_in: ["${categoriesIds.join(
              '", "'
            )}"] }, sort: "createdAt:desc", limit: 20) {
              id
              title
              route
              heroImageUrl
              createdAt
              categories {
                title
              }
            }
          }
          `
          const response: AxiosResponse = await getDefaultCmsTransport(true).post('/graphql', {
            query: query,
          })
          setPosts([...response?.data?.data?.pages])
        }
      } catch (error) {
        logProviderFactory.logError(error)
      }
    }

    fetchData()
  }, [])

  if (posts?.length) {
    return (
      <>
        <div className={css.container}>
          <div className={css.row}>
            {posts?.map((post: any) => {
              return (
                <Link key={post?.id} href={`blog/${post?.route}`}>
                  <a>
                    <div className={css.card}>
                      <img className={css.cardImage} src={post?.heroImageUrl} />
                      <p className={css.cardCategory}>
                        {post?.categories?.[0]?.title?.toUpperCase() || 'DIGITAL MARKETING'}
                      </p>
                      <h3 className={css.cardText}>{post?.title}</h3>
                      <div className={css.cardBtn}>
                        <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY}>READ MORE</ThemedButton>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className={css.loader}>
        <img src={spinner} />
      </div>
    </>
  )
}
export default BlogCarousel
