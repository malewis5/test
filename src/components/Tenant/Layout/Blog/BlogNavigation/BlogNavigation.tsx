import Link from 'next/link'
import * as React from 'react'

import { ICategory, ICategoryTree } from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Catalog'
import { Col, Row } from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Layout'
import css from './BlogNavigation.scss'

export interface IBlogCategoryNavigationProps {
  prefixes: {
    root: string
    category: string
    post: string
  }
  alignment: string
}

export interface IProps {
  data: IBlogCategoryNavigationProps
  tree: ICategoryTree
  nest?: boolean
}

interface IState {
  menuTree: any[]
}

function nestThisTree(arr: any) {
  const tree: any[] = []
  const mappedArr: any = {}
  let arrElem: any
  let mappedElem: any
  const len: any = arr.length
  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0; i < len; i++) {
    arrElem = arr[i]
    mappedArr[arrElem.id] = arrElem
    mappedArr[arrElem.id].children = []
  }
  for (const id in mappedArr) {
    if (Object.prototype.hasOwnProperty.call(mappedArr, id)) {
      mappedElem = mappedArr[id]
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parent) {
        mappedArr[mappedElem.parent].children.push(mappedElem)
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem)
      }
    }
  }
  return tree
}

class IBlogCategoryNavigation extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = { menuTree: [] }
    this.prepareNavigation = this.prepareNavigation.bind(this)
  }
  public prepareNavigation = () => {
    if (!this.state.menuTree.length) {
      if (this.props.nest !== undefined) {
        if (this.props.nest) {
          this.setState({
            menuTree: nestThisTree(this.props.tree.categories),
          })
          return
        }
      }
      this.setState({
        menuTree: this.props.tree.categories,
      })
    }
  }
  public createDropDownLinks = (children: ICategory[]) => {
    return children.map((cat: ICategory, index: any) => {
      return (
        <div key={index} className={css.dropDownContainer}>
          <a title={cat.title} href={this.prepareLink(cat.slug !== '' ? cat.slug : cat.id)}>
            {cat.title}
          </a>
        </div>
      )
    })
  }
  public prepareLink = (link: string) => {
    if (link.indexOf('http') !== -1 || link.indexOf('https') !== -1) {
      return link
    }
    if (link.charAt(0) === '/') {
      link = link.substr(1)
    }
    const { root, category } = this.props.data.prefixes
    let targetPrefix = ''
    if (root !== undefined) {
      targetPrefix = `${root}/${category}`
    } else {
      targetPrefix = '/'
    }
    if (targetPrefix === '/') {
      targetPrefix = ''
    }
    return `/${targetPrefix}/${link}`
  }

  public render() {
    this.prepareNavigation()
    return (
      <div
        style={{
          textAlign: 'center',
          paddingTop: '15px',
          paddingBottom: '15px',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <div className={css.dropdownContainer}>
          <Link href="/blog">
            <a className={css.categoryAll}>ALL</a>
          </Link>
          {this.state.menuTree.map((cat: ICategory, index: number) => {
            return (
              <div key={index} className={css.dropdown}>
                <a
                  title={cat.title}
                  href={this.prepareLink(cat.slug !== '' ? cat.slug : cat.id)}
                  className={css.categoryTitle}
                >
                  {cat.title}
                </a>
                {index < this.state.menuTree.length - 1}
                {cat.children && cat.children.length > 0 && (
                  <Row>
                    <div className={css.dropdownContent}>
                      <Col sm={12}>{this.createDropDownLinks(cat.children)}</Col>
                    </div>
                  </Row>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default IBlogCategoryNavigation
