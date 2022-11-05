import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import ThemedButton from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { THEME_BUTTON_TYPES } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import SubscribeModal from '../../Widgets/Hubspot/SubscribeModal/SubscribeModal'
import BurgerMenu from './BurgerMenu'
import css from './Header.scss'
import { HeaderNavigation } from './HeaderNavigation'

export interface ICategory {
  name: string
  url?: string
  subcategories?: ISubcategory[]
}

export interface ISubcategory {
  name: string
  url: string
}

const navigation: ICategory[] = [
  {
    name: 'Services',
    subcategories: [
      {
        name: 'Modernization',
        url: '/modernization',
      },
      {
        name: 'Optimization',
        url: '/optimization',
      },
      {
        name: 'Innovation',
        url: '/innovation',
      },
      {
        name: 'Engineering Services',
        url: '/engineering-services',
      },
    ],
  },
  {
    name: 'Client Success',
    subcategories: [
      {
        name: 'Case Studies',
        url: '/case-studies',
      },
      {
        name: 'Partners',
        url: '/partners',
      },
    ],
  },
  {
    name: 'Insights',
    subcategories: [
      {
        name: 'Blog',
        url: '/blog',
      },
      {
        name: 'Press Releases',
        url: '/press-releases',
      },
    ],
  },
  {
    name: 'About',
    subcategories: [
      {
        name: 'About Us',
        url: ' /about',
      },
      {
        name: 'Methodology',
        url: ' /methodology',
      },
      {
        name: 'Leadership',
        url: '/leadership',
      },
    ],
  },
  {
    name: 'Careers',
    url: '/careers',
  },
]

const Header = () => {
  const HeaderLogo = '../../../../static/PeakHeaderLogo.svg'
  const type = THEME_BUTTON_TYPES.PRIMARY

  const [signUpModal, setSignUpModal] = useState(false)
  const [scroll, setScroll] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 0)

    setScroll(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Here we use the route as a key to the menus to ensure react understands that on different routes
   * it should render the component again.
   * This prevents and issue with internal navigation using next/link and our menus that popups on hover or focus
   * of a navigation element and stays open after the redirection.
   */
  const localRoute = global?.window?.location?.href

  return (
    <>
      <div className={`${css.headerContainer} ${scroll ? css.scrolling : css.notScrolling}`}>
        <div className={css.pinkBar} />
        <div className={css.header}>
          <Link href="/">
            <a>
              <img className={css.logo} src={HeaderLogo} />
            </a>
          </Link>
          <div className={css.rightBox}>
            <div>
              <HeaderNavigation navigation={navigation} />
            </div>
            <div className={css.verticalLine} />
            <div className={css.signUp} onClick={() => setSignUpModal(true)}>
              <a>Sign Up</a>
            </div>
            <Link href="/contact">
              <a>
                <div className={css.contactBtn}>
                  <ThemedButton type={type}>CONTACT</ThemedButton>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={css.mobile}>
          <BurgerMenu key={localRoute} navigation={navigation} />
        </div>
      </div>
      {signUpModal && <SubscribeModal onClose={() => setSignUpModal(false)} />}
    </>
  )
}

export default Header
