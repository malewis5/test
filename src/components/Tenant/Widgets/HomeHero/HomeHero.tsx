import React, { useEffect, useState } from 'react'

import SubscribeForm from '../Hubspot/SubscribeForm/SubscribeForm'
import css from './HomeHero.scss'

const HomeHero = () => {
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.pageYOffset)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={css.heroContainer}>
      <div className={css.backgroundClouds} style={{ transform: `translateY(-${offsetY * 0.05}px)` }} />
      <div className={css.backgroundMark} style={{ transform: `translateY(-${offsetY * 0.15}px)` }} />
      <div className={css.backgroundMountain} style={{ transform: `translateY(-${offsetY * 0.25}px)` }} />
      <div
        className={css.foregroundMan}
        role={'img'}
        title={'A man standing on a mountain looking up at the peak of an even higher mountain.'}
        style={{ transform: `translateY(-${offsetY * 0.25}px)` }}
      ></div>
      <div className={css.content}>
        <div className={css.title}>
          <h1>
            Helping Your Business Reach
            <br />
            <span style={{ color: '#D61E57' }}>Greater Heights</span>
          </h1>
        </div>
        <div className={css.titleMob}>
          <h1>
            Helping Your Business
            <br />
            <span style={{ color: '#D61E57' }}>Reach Greater Heights</span>
          </h1>
        </div>
        <div className={css.subscribeBox}>
          <SubscribeForm />
        </div>
      </div>
    </div>
  )
}

export default HomeHero
