import Link from 'next/link'
import React from 'react'

import { HubspotContactForm } from '../HubspotForms'
import css from './ContactForm.scss'

const ContactForm = () => {
  return (
    <div className={css.formContainer}>
      <h2>Speak With a Peakster</h2>
      <div className={css.form}>
        <HubspotContactForm />
      </div>
      <Link href="/careers">
        <a>Interested in joining our team?</a>
      </Link>
    </div>
  )
}

export default ContactForm
