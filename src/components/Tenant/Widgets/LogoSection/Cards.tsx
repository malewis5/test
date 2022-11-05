import Link from 'next/link'
import React from 'react'

import { fit } from '../../../../utils/imageProxy'
import { imagesSources } from './imageSources'
import css from './LogoSection.scss'

interface ILogoCard {
  imgUrl: string
  urlTo?: string
}

const Cards = ({ logoIndex }: { logoIndex: number }) => {
  const getCards = (data: ILogoCard[]) => {
    return data.map((logo: ILogoCard) => {
      const proxiedUrl = fit(logo.imgUrl, { size: '213x213' })
      const card = (
        <div className={css.cards} key={proxiedUrl}>
          <img className={css.image} src={proxiedUrl} />
        </div>
      )
      if (logo.urlTo) {
        return (
          <Link key={proxiedUrl} href={logo.urlTo}>
            <a>{card}</a>
          </Link>
        )
      }
      return card
    })
  }

  const dataSrc =
    logoIndex === 0
      ? imagesSources.all
      : logoIndex === 1
      ? imagesSources.data
      : logoIndex === 2
      ? imagesSources.testing
      : logoIndex === 3
      ? imagesSources.tech
      : logoIndex === 4
      ? imagesSources.emergTech
      : logoIndex === 5
      ? imagesSources.ecom
      : logoIndex === 6
      ? imagesSources.marketing
      : imagesSources.all

  const imageFilter = getCards(dataSrc)

  return <div className={css.cardRows}>{imageFilter}</div>
}

export default Cards
