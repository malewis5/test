import { IBlogCategory, IBlogPost } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Blog'

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
