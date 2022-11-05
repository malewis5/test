import { AxiosResponse } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import getDefaultCmsTransport from '../../../../services/api/cmsInterceptor'
import logProviderFactory from '../../../../utils/logs/logProviderFactory'
import { ICategory } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Catalog'
import ThemedButton from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { THEME_BUTTON_TYPES } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import css from './InsightCards.scss'

const sampleimg = '../../../../static/sampleblog.png'

interface ICarouselPage {
  id: string
  title: string
  route: string
  heroImageUrl: string
  createdAt: string
  categories: any
}

const InsightCards = (props: any) => {
  const { categorySlug } = props
  const [posts, setPosts] = useState<ICarouselPage[]>([])
  const router = useRouter()
  const fetchData = async () => {
    try {
      let categoryResponse: AxiosResponse | undefined = undefined

      if (categorySlug !== 'all') {
        const categoriesQuery = `
        {
          categories(where: { slug: "${categorySlug}" }, limit: 1) {
            id
            title
            slug
          }
        }
        `
        categoryResponse = await getDefaultCmsTransport(true).post('/graphql', {
          query: categoriesQuery,
        })
      }

      let blogCategory: ICategory
      let categoryQueryParam = ``
      if (categoryResponse && categoryResponse?.data?.data?.categories.length) {
        blogCategory = categoryResponse?.data?.data?.categories[0]
        if (categorySlug !== 'all') {
          categoryQueryParam = `categories_in: ["${blogCategory?.id}"]`
        }
      }

      const query = `
        {
          pages(where: { type: "blog", ${categoryQueryParam}}, sort: "createdAt:desc", limit: 3) {
            id
            title
            route
            heroImageUrl
            createdAt
            categories {
              id
              slug
              title
            }
          }         
        }
        `
      const filteredResponse: AxiosResponse = await getDefaultCmsTransport(true).post('/graphql', {
        query: query,
      })

      setPosts([...filteredResponse?.data?.data?.pages])
    } catch (error) {
      logProviderFactory.logError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [categorySlug])

  if (posts?.length) {
    let postPrefix = ''
    if (!router?.pathname?.includes('blog')) {
      postPrefix = 'blog/'
    }
    return (
      <>
        <div className={css.container}>
          <div className={css.row}>
            {posts?.map((post) => {
              return (
                <Link key={post?.id} href={`${postPrefix}${post?.route}`}>
                  <a>
                    <div className={css.card}>
                      <img className={css.cardImage} src={post?.heroImageUrl} />
                      <p className={css.cardCategory}>{post?.categories?.[0]?.title?.toUpperCase()}</p>
                      <h3 className={css.cardText}>{post?.title}</h3>
                      <div className={css.cardBtn} style={{ marginTop: '60px' }}>
                        <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
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
      <div className={css.container}>
        <div className={css.row}>
          <div className={css.card}>
            <img className={css.cardImage} src={sampleimg} />
            <p className={css.cardCategory}>DIGITAL MARKETING</p>
            <h3 className={css.cardText}>Top 10 Photos of Developers Staring At Screens</h3>
            <div className={css.cardBtn} style={{ marginTop: '60px' }}>
              <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
            </div>
          </div>
          <div className={css.card}>
            <img className={css.cardImage} src={sampleimg} />
            <p className={css.cardCategory}>DIGITAL STRATEGY</p>
            <h3 className={css.cardText}>5 Ways Retailers Can Make Influencer Marketing More Influential</h3>
            <div className={css.cardBtn}>
              <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
            </div>
          </div>
          <div className={css.card}>
            <img className={css.cardImage} src={sampleimg} />
            <p className={css.cardCategory}>ECOMMERCE</p>
            <h3 className={css.cardText}>How Many Emails is Too Many?</h3>
            <div className={css.cardBtn} style={{ marginTop: '95px' }}>
              <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default InsightCards
