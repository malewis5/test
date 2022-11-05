import React from 'react'

import { HubspotCustomSubscribeForm } from '../HubspotForms'
import css from './SubscribeForm.scss'

const FaceIcons = '../../../../../static/FaceIconScreenshot.png'

const SubscribeForm = () => {
  return (
    <div className={css.formBox}>
      <div className={css.formWrapper}>
        <h3>Gear Up for Emails, Updates, and Insights</h3>
        <div className={css.form}>
          <HubspotCustomSubscribeForm className="subscribeForm" />
        </div>
        <div className={css.bottomContent}>
          <img src={FaceIcons} />
          <p>+3K industry leaders have already subscribed</p>
        </div>
      </div>
    </div>
  )
}

export default SubscribeForm
