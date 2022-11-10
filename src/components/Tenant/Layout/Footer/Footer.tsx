import { IPage } from '@peakactivity/merce-shared-frontend-components'
import * as React from 'react'

import css from './Footer.scss'
import FooterBanner from './FooterBanner'
import FooterNavigation from './FooterNavigation'

interface FooterProps {
  navigation: IPage[]
}
const Footer: React.FC<FooterProps> = () => {
  const FooterLogo = '../../../../../../static/PeakFooterLogo.svg'

  return (
    <div className={css.footer}>
      <div className={css.patternBackground} />
      <div className={css.patternBackgroundTablet} />
      <div className={css.patternBackgroundMobile} />
      <div className={css.footerBanner}>
        <FooterBanner />
      </div>
      <div className={css.topBar}>
        <div className={css.logo}>
          <img src={FooterLogo} />
        </div>
        <h2>Dream. Deliver. Elevate.</h2>
      </div>
      <hr />
      <div className={css.footerNavigation}>
        <FooterNavigation />
      </div>

      <div className={css.legal}>
        <p>Peak Activity, LLC © 2022 Copyright. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
