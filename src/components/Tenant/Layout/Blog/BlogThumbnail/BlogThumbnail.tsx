/* eslint-disable react/jsx-no-bind */
import Link from 'next/link'
import * as React from 'react'

import { IBlogOptions } from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Blog'
import ThemedButton from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { THEME_BUTTON_TYPES } from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import { has } from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/lodash'
import { IBlogPostPage } from '..'
import css from './BlogThumbnail.scss'

export interface IBlogThumbnailProps {
  post: IBlogPostPage
  options?: IBlogOptions
}

export default class BlogThumbnail extends React.Component<IBlogThumbnailProps, any> {
  public onThumbnailClick = (id: string) => {
    const onNavigateToPost: any = has(this.props, ['options', 'events', 'onNavigateToPost'])
    if (onNavigateToPost) {
      onNavigateToPost(id)
    }
  }

  public render() {
    const { post, options } = this.props
    if (options?.renderProps?.BlogPost) {
      const { BlogPost } = options.renderProps
      return BlogPost(post)
    }
    let categoryTitle = ''
    if (post.tags.includes('Modernization')) {
      categoryTitle = 'Modernization'
    }
    if (post.tags.includes('Optimization')) {
      categoryTitle = 'Optimization'
    }
    if (post.tags.includes('Innovation')) {
      categoryTitle = 'Innovation'
    }
    if (post.tags.includes('Engineering Services')) {
      categoryTitle = 'Engineering Services'
    }
    if (post.tags.includes('General')) {
      categoryTitle = 'General'
    }

    // const targetRoute: string = post.route ? post.route : post.id
    return (
      <Link href={`/blog/${post.route}`}>
        <a>
          <div className={css.card}>
            <img className={css.cardImage} src={post.heroImageUrl} />
            <p className={css.cardCategory}>{categoryTitle}</p>
            <h3 className={css.cardText}>{post.title}</h3>
            <div className={css.cardBtn}>
              <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
            </div>
          </div>
        </a>
      </Link>
    )
  }
}
