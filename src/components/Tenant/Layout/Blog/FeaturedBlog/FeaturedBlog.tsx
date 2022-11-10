import { THEME_BUTTON_TYPES, ThemedButton } from '@peakactivity/merce-shared-frontend-components'
import Link from 'next/link'
import React from 'react'

import { IBlogPostPage } from '..'
import css from './FeaturedBlog.scss'

export interface IBlogFeaturedProps {
  blogs: IBlogPostPage[]
}

const FeaturedBlogs: React.FC<IBlogFeaturedProps> = ({ blogs }) => {
  let categoryTitle = ''
  if (blogs[0].tags.toLowerCase().includes('modernization')) {
    categoryTitle = 'MODERNIZATION'
  }
  if (blogs[0].tags.toLowerCase().includes('optimization')) {
    categoryTitle = 'OPTIMIZATION'
  }
  if (blogs[0].tags.toLowerCase().includes('innovation')) {
    categoryTitle = 'INNOVATION'
  }
  if (blogs[0].tags.toLowerCase().includes('engineering services')) {
    categoryTitle = 'ENGINEERING SERVICES'
  }
  if (blogs[0].tags.toLowerCase().includes('general')) {
    categoryTitle = 'GENERAL'
  }
  return (
    <div className={css.featuredBlogContainer}>
      <div
        className={css.featuredBlog}
        style={{
          // eslint-disable-next-line no-useless-concat
          backgroundImage:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),url(' + `${blogs[0].heroImageUrl}` + ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div>
          <div className={css.blogText}>
            <p>{categoryTitle}</p>
            <h2>{blogs[0].title}</h2>
          </div>
          <div className={css.readMoreBtn}>
            <Link href={blogs[0].route}>
              <a>
                <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY}>READ MORE</ThemedButton>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FeaturedBlogs
