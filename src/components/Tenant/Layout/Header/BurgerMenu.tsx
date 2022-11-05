import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import ThemedButton from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { THEME_BUTTON_TYPES } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import { HubspotCustomSubscribeForm } from '../../Widgets/Hubspot/HubspotForms'
import css from './BurgerMenu.scss'
import { ICategory, ISubcategory } from './Header'

const HeaderLogo = '../../../../../static/PeakHeaderLogo.svg'
const BurgerIcon = '../../../../../static/BurgerMenu.svg'
const Close = '../../../../../static/Close.svg'
const Phone = '../../../../../static/Circle-Phone.svg'
const Mail = '../../../../../static/Circle-Mail.svg'

interface ICategoryProps extends ICategory {
  linkClickHandler: () => void
}

const Category: React.FC<ICategoryProps> = ({ name, linkClickHandler, subcategories, url }) => {
  const [isOpen, setIsOpen] = useState(false)

  const hasSubcategories = subcategories && subcategories.length > 0

  return (
    <div className={css.category}>
      {!url && (
        <div className={css.categoryName} onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <span className={`${isOpen ? css.open : ''}`}>{name}</span>
          {hasSubcategories && <i className={`fas ${isOpen ? 'fa-caret-up' : 'fa-caret-down'} ${css.caret}`} />}
        </div>
      )}
      {!!url && (
        <div className={css.categoryName}>
          <Link href={url}>
            <a onClick={linkClickHandler}>{name}</a>
          </Link>
        </div>
      )}
      {subcategories && isOpen && (
        <div className={css.subcategories}>
          {subcategories.map((subcategory) => (
            <Subcategory
              key={subcategory.name}
              name={subcategory.name}
              url={subcategory.url}
              linkClickHandler={linkClickHandler}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ISubcategoryProps extends ISubcategory {
  linkClickHandler: () => void
}

const Subcategory: React.FC<ISubcategoryProps> = ({ name, linkClickHandler, url }) => {
  return (
    <div className={css.subcategory}>
      <Link href={url}>
        <a onClick={linkClickHandler}>{name}</a>
      </Link>
    </div>
  )
}

interface IBurgerMenuProps {
  navigation: ICategory[]
}

const BurgerMenu: React.FC<IBurgerMenuProps> = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false)

  const [prevHtmlOverflow, setPrevHtmlOverflow] = useState<string>()
  useEffect(() => {
    setPrevHtmlOverflow(document.documentElement.style.overflow)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = isMenuVisible ? 'hidden' : (prevHtmlOverflow as string)
  }, [isMenuVisible])

  const linkClickHandler = () => {
    document.documentElement.style.overflow = prevHtmlOverflow as string
  }

  const onButtonClick = () => {
    setMenuVisible((isVisible) => !isVisible)
  }

  return (
    <div className={css.topBar}>
      {!isMenuVisible && (
        <Link href="/">
          <a className={css.logoLink}>
            <img className={css.logo} src={HeaderLogo} />
          </a>
        </Link>
      )}
      <div className={`${isMenuVisible ? css.closeButton : css.openButton}`} onClick={onButtonClick}>
        {isMenuVisible ? <img src={Close} /> : <img src={BurgerIcon} />}
      </div>
      {isMenuVisible && <div onClick={onButtonClick} className={`${css.modalBackground}`} />}

      <div className={`${css.burgerMenu} ${isMenuVisible ? css.visible : ''}`}>
        <div className={css.burgerMenuContent}>
          <div className={css.topSection}>
            <div className={`${css.navigation}`}>
              {navigation.map((cat) => (
                <Category
                  key={cat.name}
                  name={cat.name}
                  subcategories={cat.subcategories}
                  url={cat.url}
                  linkClickHandler={linkClickHandler}
                />
              ))}
            </div>
            <div className={css.subscribe}>
              <div className={css.label}>Get the Right Gear To Elevate Your Business</div>
              <div className={css.form}>
                <HubspotCustomSubscribeForm className="burgerMenu" />
              </div>
            </div>
          </div>
          <div className={css.bottomButtonRow}>
            <div className={css.icons}>
              <a className={css.icon} href="tel:574-404-7325" target="_blank" rel="noreferrer">
                <img src={Phone} />
              </a>
              <a className={css.icon} href="mailto:hello@peakactivity.com" target="_blank" rel="noreferrer">
                <img src={Mail} />
              </a>
            </div>
            <div className={css.contactBtn}>
              <Link href="/contact">
                <a onClick={linkClickHandler}>
                  <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY}>CONTACT</ThemedButton>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu
