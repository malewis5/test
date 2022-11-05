import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form'
import axios, { AxiosResponse } from 'axios'
import Script from 'next/script'
import React, { useState } from 'react'

import { RECAPTCHA_SITEKEY } from '../../../../settings/variables'
import logProviderFactory from '../../../../utils/logs/logProviderFactory'
import css from './HubspotForms.scss'

const HUBSPOT_PORTAL_ID = '4072931'
const HUBSPOT_BURGER_MENU_FORM_ID = '6ba741e6-a669-4ae0-9590-5769616a6d3a'
const HUBSPOT_SUBMIT_FORM_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}`

const HUBSPOT_SUBSCRIPTION_TYPE_ID = 5302503
const HUBSPOT_FORM_TEXT_CONFIRMATION = 'Yes, I would like to receive marketing emails from PeakActivity.'

const RECAPTCHA_SCRIPT_URL = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITEKEY}`

interface IHubspotError {
  message: string
  errorType: string // let's ignore the enum for now since we're not using it
}

declare global {
  interface Window {
    grecaptcha: any
    dataLayer: any
  }
}

if (typeof window !== 'undefined') {
  window.grecaptcha = window.grecaptcha || {}
}

interface IHubspotSubmitFormResponse {
  correlationId?: string
  redirectUri?: string
  inlineMessage?: string
  errors?: IHubspotError[]
  message?: string
  status?: string
}

const buildFormBody = (email: string, pageUri: string, pageName: string, consent: boolean) => {
  return {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'email',
        value: email,
      },
    ],
    context: {
      pageUri,
      pageName,
    },
    legalConsentOptions: {
      legitimateInterest: {
        value: consent,
        subscriptionTypeId: HUBSPOT_SUBSCRIPTION_TYPE_ID,
        legalBasis: 'LEAD',
        text: HUBSPOT_FORM_TEXT_CONFIRMATION,
      },
    },
  }
}

const subscribeUser = async (formId: string, email: string, pageUri: string, pageName: string, consent: boolean) => {
  const formBody = buildFormBody(email, pageUri, pageName, consent)
  const response: AxiosResponse<IHubspotSubmitFormResponse> = await axios.post(
    `${HUBSPOT_SUBMIT_FORM_URL}/${formId}`,
    formBody
  )
  return response.data
}

interface IHubspotCustomSubscribeFormsProps {
  className: string
}

export const HubspotCustomSubscribeForm: React.FC<IHubspotCustomSubscribeFormsProps> = ({ className }) => {
  const [email, setEmail] = useState<string>('')
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [consent, setConsent] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (typeof window !== 'undefined') {
      e.preventDefault()

      if (!email) {
        return setErrorMessage('Please enter your email address')
      }

      try {
        window.grecaptcha.enterprise.ready(async () => {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITEKEY, {
            action: 'submit',
          })

          const validateCaptcha = await axios.post('/api/recaptcha/', { token })
          if (validateCaptcha?.data?.valid) {
            try {
              const response = await subscribeUser(
                HUBSPOT_BURGER_MENU_FORM_ID,
                email,
                location.href,
                document.title,
                consent
              )
              if (window.dataLayer) {
                window.dataLayer.push({
                  event: 'form_submission',
                  form_details: {
                    form_title: 'Email Subscribe',
                    form_action: 'Submission',
                  },
                })
              }
              if (response.inlineMessage) {
                setSuccessMessage(response.inlineMessage)
              }
              if (response.redirectUri) {
                location.href = response.redirectUri
              }
            } catch (e) {
              if (e.response?.data?.errors.length) {
                logProviderFactory.logError(e)
                const errors = e.response.data.errors
                setErrorMessage(
                  errors.reduce(
                    (acc: string, error: IHubspotError) => `${acc}\n${error.message.replace('fields.', '')}`,
                    ''
                  )
                )
              } else if (e.response?.data?.message) {
                setErrorMessage(e.response.data.message)
              } else {
                setErrorMessage(e.toString())
              }
            }
          } else {
            setErrorMessage(`An error ocurred while trying to subscribe.`)
          }
        })
      } catch (e) {
        logProviderFactory.logError(e)
      }
    }
  }

  return (
    <>
      {!!successMessage && <div className={css.thanksMessage} dangerouslySetInnerHTML={{ __html: successMessage }} />}
      {!successMessage && (
        <>
          {typeof window !== 'undefined' && (
            <Script id="recaptcha-js" strategy="afterInteractive" src={RECAPTCHA_SCRIPT_URL} />
          )}
          <form className={`${css.hubspotSubscribeForm} ${css[className]}`} onSubmit={handleSubmit}>
            <input
              className={css.email}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={css.consent}>
              <input
                className={css.checkbox}
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <label className={css.label} htmlFor="consent">
                {HUBSPOT_FORM_TEXT_CONFIRMATION}
              </label>
            </div>
            {className !== 'burgerMenu' && (
              <div className={css.captchaLabel}>
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
              </div>
            )}
            {errorMessage && <div className={css.errorMessage}>{errorMessage}</div>}
            <input type="submit" className={css.submit} value="Subscribe" />
            {className == 'burgerMenu' && (
              <div className={css.captchaLabel}>
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
              </div>
            )}
          </form>
        </>
      )}
    </>
  )
}

export const HubspotContactForm = () => {
  useHubspotForm({
    portalId: '4072931',
    formId: 'fdc4d868-0d86-47ce-930c-a863491c63d3',
    target: '#my-hubspot-form-contact',
  })
  return (
    <div>
      <div id="my-hubspot-form-contact" />
    </div>
  )
}

export const HubspotPartnerForm = () => {
  useHubspotForm({
    portalId: '4072931',
    formId: '0f1a04c8-6621-4727-b5c7-c8317a3436aa',
    target: '#my-hubspot-form-partner',
  })

  return (
    <div>
      <div id="my-hubspot-form-partner" />
    </div>
  )
}
