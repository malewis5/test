import { IBlogCategory, IBlogPost } from '@peakactivity/merce-shared-frontend-components'

export interface IBlogPostPage extends IBlogPost {
  tags: string
  createdAt: string
  id: string
  categories?: {
    title: string
    slug: string
  }[]
}
export interface IBlogCategoryPage extends IBlogCategory {
  id: string
  slug: string
  title: string
  heroBanner: string
  heroText: string
  metaDescription: string
  metaTitle: string
  pages: IBlogPostPage[]
}

export interface IBlogPostSummaryProps {
  page: IBlogPostPage
}
