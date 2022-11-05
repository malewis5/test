import React from 'react'

import { Col, Row } from '../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Layout'
import css from './ContactGradient.scss'

const mail = '../../../../../../static/mail.svg'
const messaging = '../../../../../../static/messaging.svg'

const phone = '../../../../../../static/phone.svg'
const linkedin = '../../../../../../static/LinkedInFull.svg'
const facebook = '../../../../../../static/FacebookFull.svg'
const twitter = '../../../../../../static/TwitterFull.svg'

const ContactGradient = () => {
  return (
    <div className={css.gradientContainer}>
      <div className={css.margin}>
        <Row>
          <Col md={6}>
            <div className={css.leftText}>
              <h3>Talk To Us</h3>
              <p>
                We hope we’ve given you a sense of who and what PeakActivity is all about. Now, we want to hear from
                you.
              </p>
              <p>
                Fill out this form and a Peakster will get in touch to see how we can help you solve your business
                challenges. Whether you’re struggling with strategy or implementation, facing challenges in retail or
                B2B, tell us what’s going on, and together, we’ll find a way to move that mountain.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className={css.contactBoxContainer}>
              <a href="mailto:hello@peakactivity.com">
                <div className={css.contactBox}>
                  <img className={css.email} src={mail} />
                  <div className={css.boxText}>
                    <p className={css.topText}>Email Us</p>
                    <h3 className={css.emailFont}>Send us a message</h3>
                  </div>
                </div>
              </a>
              <a href="tel:574-404-7325">
                <div className={css.contactBox}>
                  <img className={css.phone} src={phone} />
                  <div className={css.boxText}>
                    <p className={css.topText}>Call Us</p>
                    <h3 className={css.bottomText}>(574) 404-PEAK</h3>
                  </div>
                </div>
              </a>
              <div className={css.contactBox}>
                <img className={css.messaging} src={messaging} />
                <div className={css.boxText}>
                  <p className={`${css.topText} ${css.follow}`}>Follow Us</p>
                  <div className={css.logos}>
                    <a target="_blank" href="https://www.linkedin.com/company/peakactivity/" rel="noopener noreferrer">
                      <img src={linkedin} />
                    </a>
                    <a target="_blank" href="https://www.facebook.com/peakactivityfl" rel="noopener noreferrer">
                      <img src={facebook} />
                    </a>
                    <a target="_blank" href="https://twitter.com/peak_activity" rel="noopener noreferrer">
                      <img src={twitter} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ContactGradient
