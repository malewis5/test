import Link from 'next/link'
import React, { useState } from 'react'

import ThemedButton from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { Col, Row } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Layout'
import { THEME_BUTTON_TYPES } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import { IBlogPostPage } from '../../Layout/Blog'
import css from './PressRelease.scss'

export interface IPressReleaseProps {
  press: IBlogPostPage[]
}
const PressRelease: React.FC<IPressReleaseProps> = ({ press }) => {
  const PressBanner = '../../../../../static/pressBanner.png'
  const PressBannerMobile = '../../../../../static/pressBannerMobile.png'
  const DownloadIcon = '../../../../../static/downloadMagentaIcon.png'

  const monthNames = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ]

  const [showMore, setShowMore] = useState(false)
  const anchorClickHandler = () => {
    const yOffset = -120
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = document.getElementById('pressAnchor')!
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  return (
    <>
      <div className={css.pageHeader}>
        <Row>
          <Col md={8}>
            <div>
              <p>PRESS</p>
              <h2>
                The Best News,
                <br />
                Is Best Shared
              </h2>
            </div>
          </Col>
          <Col md={4}>
            <div className={css.signUpBtn}>
              <ThemedButton onClick={anchorClickHandler} type={THEME_BUTTON_TYPES.SECONDARY}>
                VIEW PRESS RELEASES
              </ThemedButton>
            </div>
          </Col>
        </Row>
      </div>
      <div className={css.bannerImage}>
        <img className={css.desktop} src={PressBanner} />
        <img className={css.mobile} src={PressBannerMobile} />
      </div>
      <div className={css.background}>
        <div className={css.pressBody} id={'pressAnchor'}>
          <div className={css.pressReleases}>
            {press.slice(0, 5).map((press) => {
              const date = new Date(
                press.tags.includes(',') ? press.tags.substring(0, press.tags.indexOf(',')) : 'January 01'
              )
              return (
                <div className={css.pressRelease} key={press.id}>
                  <p>
                    {monthNames[date.getMonth()]} {date.getFullYear()}
                  </p>
                  <h3>{press.title}</h3>
                  <div className={css.pressButton}>
                    <Link href={press.route}>
                      <a>
                        <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })}
            {showMore &&
              press?.slice(5).map((press) => {
                const date = new Date(
                  press.tags.includes(',') ? press.tags.substring(0, press.tags.indexOf(',')) : 'January 01'
                )
                return (
                  <div className={css.pressRelease} key={press.id}>
                    <p>
                      {monthNames[date.getMonth()]} {date.getFullYear()}
                    </p>
                    <h3>{press.title}</h3>
                    <div className={css.pressButton}>
                      <Link href={press.route}>
                        <a>
                          <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>READ MORE</ThemedButton>
                        </a>
                      </Link>
                    </div>
                  </div>
                )
              })}
            <div className={css.loadBtn} style={showMore === true ? { display: 'none' } : { display: 'flex' }}>
              <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY} onClick={() => setShowMore(true)}>
                LOAD MORE
              </ThemedButton>
            </div>
            <div className={css.loadBtn} style={showMore === false ? { display: 'none' } : { display: 'flex' }}>
              <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY} onClick={() => setShowMore(false)}>
                SHOW LESS
              </ThemedButton>
            </div>
          </div>
          <div className={css.pressKitContainer}>
            <Link
              href={
                'https://storage.googleapis.com/peakactivity-site-assets/press-releases/PeakActivity%20Press%20Kit.zip'
              }
            >
              <a>
                <div className={css.pressKit}>
                  <h3>Press Kit</h3>
                  <p>
                    Download this press kit to access everything you need to create media stories about PeakActivity,
                    such as our boilerplate, leadership bios, logo artwork, and more.
                  </p>
                  <div className={css.pressKitDownload}>
                    <img src={DownloadIcon} />
                    <p>DOWNLOAD NOW</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={css.bottomCTA}>
        <hr className="solid" />
        <h3>Considerably Capable</h3>
        <p>
          Now that you’re caught up on how PeakActivity is making news, learn more about our deep expertise in the areas
          of Modernization, Optimization, Innovation, and Engineering Services, and how it’s helping our clients
          progress on their digital journeys.
        </p>
        <div className={css.buttonCTA}>
          <Link href={'/'}>
            <a>
              <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>VIEW OUR SERVICES</ThemedButton>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
export default PressRelease
