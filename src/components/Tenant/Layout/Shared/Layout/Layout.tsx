import * as React from 'react'

import ThemeWrapper from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import FooterContainer from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Layout/FooterContainer/FooterContainer'
import HeaderContainer from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Layout/HeaderContainer/HeaderContainer'
import css from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Layout/Layout.scss'
import BodyContainer from './BodyContainer/BodyContainer'

export interface ILayoutProps {
  data: {
    header: any
    layout: any
    footer: any
  }
  configuration: {
    globalStyles: boolean
  }
  class?: any
  style?: any
  url?: string
}

const ApplyThemeWrapper = (props: any) => {
  const {
    children,
    configuration: { globalStyles },
  } = props
  const globalClasses: string = [css.fillHeight, css.fillCore].join(' ')
  if (globalStyles) {
    return <ThemeWrapper className={`${globalClasses}`}>{children}</ThemeWrapper>
  }
  return <div className={`${globalClasses}`}>{children}</div>
}

const findImage = (obj: object, key: string) => {
  const list = findValuesHelper(obj, key, [])
  if (list.includes('SLIDESHOW') || list.includes('SINGLE_IMAGE')) {
    return true
  }

  return false
}

function findValuesHelper(obj: any, key: string, list: any) {
  if (!obj) return list
  if (obj instanceof Array) {
    for (const i of obj) {
      list = list.concat(findValuesHelper(obj[i], key, []))
    }
    return list
  }
  if (obj[key]) list.push(obj[key])

  if (typeof obj == 'object' && obj !== null) {
    const children = Object.keys(obj)
    if (children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        list = list.concat(findValuesHelper(obj[children[i]], key, []))
      }
    }
  }
  return list
}

export default class Layout extends React.Component<ILayoutProps> {
  public render() {
    const dataObject = this.props.data.header.props?.pageProps
    let hasImage = false

    const snapshotID = dataObject?.data?.snapshot?.structure?.[0]?.id
      ? dataObject?.data?.snapshot?.structure?.[0]?.id
      : dataObject?.pages && dataObject?.pages?.[0].snapshot?.structure?.[0]?.id

    const firstSnapshot = dataObject?.data?.snapshot?.lookup[snapshotID]
      ? dataObject?.data?.snapshot?.lookup[snapshotID]
      : dataObject?.pages && dataObject?.pages?.[0].snapshot?.lookup[snapshotID]

    hasImage = findImage(firstSnapshot, 'type')

    const AppliedLayout = this.props.data.layout

    return (
      <ApplyThemeWrapper {...this.props}>
        <HeaderContainer>{this.props.data.header}</HeaderContainer>
        <BodyContainer class={this.props.class}>
          <AppliedLayout class={!hasImage ? 'header-border ' : ''} url={this.props.url}>
            {this.props.children}
          </AppliedLayout>
        </BodyContainer>
        <FooterContainer>{this.props.data.footer}</FooterContainer>
      </ApplyThemeWrapper>
    )
  }
}
