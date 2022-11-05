import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import { RECAPTCHA_SITEKEY } from '../../src/settings/variables'
import logProviderFactory from '../../src/utils/logs/logProviderFactory'

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

const RECAPTCHA_PROJECT_NAME = 'peakactivity-website'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req, method: req.method })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
  try {
    const createAssessment = await axios.post(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_NAME}/assessments?key=${RECAPTCHA_SECRET_KEY}`,
      {
        event: {
          token: req.body.token,
          siteKey: RECAPTCHA_SITEKEY,
          expectedAction: 'submit',
        },
      }
    )
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    const { data } = createAssessment
    const { event, riskAnalysis, tokenProperties } = data
    if (event?.expectedAction !== tokenProperties?.action) {
      return res.status(400).json({ message: 'Action data is incorrect.', valid: false })
    }

    if (!riskAnalysis) {
      return res.status(400).json({ message: 'Risk analysis missing.', valid: false })
    }

    if (!tokenProperties?.valid) {
      return res.status(400).json({ message: 'Token not valid.', valid: false })
    }
    console.log({ riskAnalysis })

    if (riskAnalysis?.score < 0.8) {
      let reasons = ''
      if (riskAnalysis?.reasons?.length) {
        reasons = riskAnalysis?.reasons?.join(', ')
      }
      return res.status(400).json({ message: 'Risk score is low.', reasons, valid: false })
    } else {
      // leaving this code sample here in case we want to improve recaptcha logic in GCP with assessments annotations
      // await axios.post(`https://recaptchaenterprise.googleapis.com/v1/${data?.name}:annotate`, { annotation: 'LEGITIMATE' })
      return res.status(200).json({ message: 'Assessment success.', valid: true })
    }
  } catch (error) {
    logProviderFactory.logError(error)
  }
}

export default handler
