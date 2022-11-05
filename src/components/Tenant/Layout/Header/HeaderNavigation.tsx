import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { ICategory, ISubcategory } from './Header'
import css from './HeaderNavigation.scss'

const Category: React.FC<ICategory> = ({ name, subcategories, url }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const hasSubcategories = subcategories && subcategories.length > 0

  const onEnterHandler = () => {
    setIsOpen(true)
  }

  const onLeaveHandler = () => {
    setIsOpen(false)
  }

  return (
    <>
      {!!url && (
        <li>
          <Link href={url}>
            <a>{name}</a>
          </Link>
        </li>
      )}
      {hasSubcategories && (
        <li
          onMouseEnter={onEnterHandler}
          onMouseLeave={onLeaveHandler}
          className={
            subcategories?.some(({ url }) => url === router.asPath) ? `${css.link} ${css.active}` : `${css.link}`
          }
        >
          {name}
          <i className={isOpen ? 'fas fa-caret-up' : 'fas fa-caret-down'} />
          {isOpen && (
            <div className={css.dropDownContent}>
              <div className={css.filler} />
              <div className={css.column}>
                <ul>
                  {subcategories.map((subcategory) => (
                    <SubCategory key={subcategory.name} name={subcategory.name} url={subcategory.url} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
      )}
    </>
  )
}

const SubCategory: React.FC<ISubcategory> = ({ name, url }) => {
  return (
    <li>
      <Link href={url}>
        <a>{name}</a>
      </Link>
    </li>
  )
}

interface IHeaderNavigationProps {
  navigation: ICategory[]
}

export const HeaderNavigation: React.FC<IHeaderNavigationProps> = ({ navigation }) => {
  return (
    <div className={css.headerNavigation}>
      <div className={css.navItems}>
        <nav>
          <ul>
            {navigation.map((category) => (
              <Category
                key={category.name}
                name={category.name}
                subcategories={category.subcategories}
                url={category.url}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
