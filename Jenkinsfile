node("staging-base") {
  gitCheckout{}
  def targetBranch = env.BRANCH_NAME
  def sentryDSN = "https://f31490b4b5484176bfbe02698a85c1d9@o417197.ingest.sentry.io/6300330"
  def RECAPTCHA_SITEKEY = "6LfGM54fAAAAAL3mMvPqJSQh0PXZnVl4XPJ8tUz5"

  if (env.BRANCH_NAME == "master") {
     RECAPTCHA_SITEKEY = "6LcY7JkfAAAAAFbpNtdBTxeLAH2q2VMfoTANA9sH"
  } else {
     RECAPTCHA_SITEKEY = "6LfGM54fAAAAAL3mMvPqJSQh0PXZnVl4XPJ8tUz5"
  }
  gitCheckoutSubmodules{}
 if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "preview") {
      buildDeployFrontendHttps {
         namespace = 'peak-activity'
         project = 'peak-activity'
         forceNodeEnvToProduction=true
         minReplicas = 1
         maxReplicas = 5
         requestCpu = "250m"
         requestMemory = "100Mi"
         maxCpu = "1"
         maxMemory = "500Mi"
         disableNginx = true
         envs =
      [
        '{"env":{"name": "SENTRY_DSN", "value": "' + "${sentryDSN}" + '"}}',
        '{"env":{"name": "RECAPTCHA_SITEKEY", "value": "' + "${RECAPTCHA_SITEKEY}" + '"}}',
        '{"secretEnv":{"name": "RECAPTCHA_SECRET_KEY", "secretKey": "RECAPTCHA_SECRET_KEY", "secretName": "prod-env"}}'
      ]
         postHookProviders ="""
         [
            {
            "name": "calibre",
               "settings": {
                  "develop": {},
                  "master": {}
               }
            },
            {
               "name": "gtmetrix",
               "settings": {
                  "develop": {
                     "url": "web.dev.peakactivity.merce.io"
                  },
                  "master": {
                     "url": "web.prod.peakactivity.merce.io"
                  }
               }
            }
         ]
         """
      }
   } else {
         buildDeployFrontendHttps {
         namespace = 'peak-activity'
         project = 'peak-activity'
         forceNodeEnvToProduction=true
         disableNginx = true
         envs =
         [
         '{"env":{"name": "SENTRY_DSN", "value": "' + "${sentryDSN}" + '"}}',
         '{"env":{"name": "RECAPTCHA_SITEKEY", "value": "' + "${RECAPTCHA_SITEKEY}" + '"}}',
         '{"secretEnv":{"name": "RECAPTCHA_SECRET_KEY", "secretKey": "RECAPTCHA_SECRET_KEY", "secretName": "develop-env"}}'
         ]
      }
 }

  slackNotification("peakactivity", currentBuild.currentResult)
}

