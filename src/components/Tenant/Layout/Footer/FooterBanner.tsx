import { Col, Row } from '@peakactivity/merce-shared-frontend-components'
import Link from 'next/link'
import React, { useState } from 'react'

import css from './Footer.scss'

const FooterBanner = () => {
  const [tablet, setTablet] = useState(false)
  React.useEffect(() => {
    if (window.innerWidth < 1001 && window.innerWidth > 767) {
      setTablet(true)
    }
  }, [])

  return (
    <div
      className={css.bannerContainer}
      style={
        tablet === true
          ? {
              backgroundImage: 'url(../../../../../static/FooterBannerTablet.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {
              backgroundImage: 'url(../../../../../static/FooterBanner.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
      }
    >
      <div className={css.bannerContent}>
        <Row>
          <Col>
            <div className={css.bannerText}>
              <h3>
                Let&apos;s Move Mountains. <br />
                Together.
              </h3>
            </div>
          </Col>
          <Col>
            <div className={css.bannerStartBtn}>
              <Link href="/contact">
                <a>
                  <button>Get Started</button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FooterBanner
