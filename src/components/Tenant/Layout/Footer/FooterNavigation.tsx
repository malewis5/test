import Link from 'next/link'
import React, { useState } from 'react'

import { Col, Row } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Layout'
import SubscribeModal from '../../Widgets/Hubspot/SubscribeModal/SubscribeModal'
import css from './FooterNavigation.scss'

const EmailIcon = '../../../../../static/EmailIcon.svg'
const NewsletterIcon = '../../../../../static/NewsletterIcon.svg'
const FooterMark = '../../../../../static/FooterMark.svg'
const Linkedin = '../../../../../static/footerLinkedin.svg'
const Facebook = '../../../../../static/footerFacebook.svg'
const Twitter = '../../../../../static/footerTwitter.svg'

interface IFooterLink {
  title: string
  route: string
}

const ServicesLinks: IFooterLink[] = [
  {
    title: 'Modernization',
    route: '/modernization',
  },
  {
    title: 'Optimization',
    route: '/optimization',
  },
  {
    title: 'Innovation',
    route: '/innovation',
  },
  {
    title: 'Engineering Services',
    route: '/engineering-services',
  },
]

const CompanyLinks: IFooterLink[] = [
  {
    title: 'About Us',
    route: '/about',
  },
  {
    title: 'Leadership',
    route: '/leadership',
  },
  {
    title: 'Careers',
    route: '/careers',
  },
]

const InsightsLinks: IFooterLink[] = [
  {
    title: 'Blog',
    route: '/blog',
  },
  {
    title: 'Press Releases',
    route: '/press-releases',
  },
]

const ContactLinks: IFooterLink[] = [
  {
    title: 'Contact Us',
    route: '/contact',
  },
  {
    title: 'Privacy Policy',
    route: '/privacy-policy',
  },
]

const FooterNavigation = () => {
  const [signUpModal, setSignUpModal] = useState(false)

  const renderLinks = (arr: IFooterLink[]) => {
    return arr.map((link: IFooterLink, index: number) => (
      <ul key={index} className={css.navList}>
        <li>
          <Link href={link.route}>
            <a>{link.title}</a>
          </Link>
        </li>
      </ul>
    ))
  }

  return (
    <>
      {signUpModal && <SubscribeModal onClose={() => setSignUpModal(false)} />}
      <div className={css.navigationContainer}>
        <Row>
          <Col md={6}>
            <Row>
              <div className={css.linkContainer}>
                <Col md={6}>
                  <p className={css.navTitle}>Services</p>
                  {renderLinks(ServicesLinks)}
                  <p className={css.navTitle} style={{ marginTop: '30px' }}>
                    Company
                  </p>
                  {renderLinks(CompanyLinks)}
                </Col>

                <Col md={6}>
                  <p className={css.navTitle}>Insights</p>
                  {renderLinks(InsightsLinks)}
                  <p className={css.navTitle} style={{ marginTop: '99px' }}>
                    Contact
                  </p>
                  {renderLinks(ContactLinks)}
                </Col>
              </div>
            </Row>
          </Col>
          <Col md={6}>
            <div className={css.description}>
              <p>
                PeakActivity is a digital acceleration and technology services company that enables progress for
                businesses at every point of their digital journey through modernization, optimization, innovation, and
                engineering services.
              </p>
            </div>
            <Row>
              <Col md={6}>
                <div className={css.float}>
                  <div className={css.iconLinks}>
                    <a href="mailto:hello@peakactivity.com">
                      <div className={css.iconRow}>
                        <img src={EmailIcon} />
                        <p>Email Us</p>
                      </div>
                    </a>
                    <div className={css.iconRow} onClick={() => setSignUpModal(true)}>
                      <img src={NewsletterIcon} />
                      <p>Newsletter Sign Up</p>
                    </div>
                  </div>
                </div>
                <div className={css.footerMark}>
                  <img src={FooterMark} />
                </div>
                <div className={css.socialLinks}>
                  <Link href="https://www.linkedin.com/company/peakactivity/">
                    <a target="_blank">
                      <img src={Linkedin} />
                    </a>
                  </Link>
                  <Link href="https://www.facebook.com/peakactivityfl">
                    <a target="_blank">
                      <img src={Facebook} />
                    </a>
                  </Link>
                  <Link href="https://twitter.com/peak_activity">
                    <a target="_blank">
                      <img src={Twitter} />
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default FooterNavigation
