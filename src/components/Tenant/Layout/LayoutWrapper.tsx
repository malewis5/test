import { useRouter } from 'next/router'
import * as React from 'react'

import { IPage } from '../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Interfaces/Strapi/Page'
import { ICategoryTree } from '../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Interfaces/Strapi/Product'
import ThemeWrapper from '../Common/Theme/ThemeWrapper'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import css from './LayoutWrapper.scss'

export interface ILayoutProps {
  data: {
    footerNav: IPage[]
    headerNav: ICategoryTree[]
    [x: string]: any
  }
  [x: string]: any
}

const ApplyThemeWrapper = (props: any) => {
  const { children } = props
  const globalClasses: string = [css.fillHeight, css.fillCore].join(' ')
  return <ThemeWrapper className={`${globalClasses}`}>{children}</ThemeWrapper>
}

const LayoutWrapper = (props: ILayoutProps) => {
  const { footerNav } = props.data
  const router = useRouter()

  console.log(router.pathname)
  if (router.pathname.includes('/nextconf')) {
    return (
      <ApplyThemeWrapper {...props}>
        <div className={css.fillBody}>{props.children}</div>
      </ApplyThemeWrapper>
    )
  }
  return (
    <ApplyThemeWrapper {...props}>
      <Header />
      <div className={css.fillBody} style={router.asPath === '/' ? { marginTop: '0' } : { marginTop: '128px' }}>
        <main>
          <div className="padding-top padding-bottom">{props.children}</div>
        </main>
      </div>
      <Footer navigation={footerNav || []} />
    </ApplyThemeWrapper>
  )
}
export default LayoutWrapper
