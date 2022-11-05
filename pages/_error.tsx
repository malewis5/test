import NextErrorComponent from 'next/error'
import * as React from 'react'

import logProviderFactory from '../src/utils/logs/logProviderFactory'
import { IMerceNextPageContext } from './_app'

/**
 * Note: this page will only get called for any 500 errors (production builds only)
 * It is during this time that we want to log errors to Sentry via server side
 * https://nextjs.org/docs/advanced-features/custom-error-page#500-page
 * @param param0
 */
const MyError = ({ statusCode, hasGetInitialPropsRun, err }: any) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    logProviderFactory.logError(err)
  }
  return <NextErrorComponent statusCode={statusCode} />
}

MyError.getInitialProps = async (mercePageCtx: IMerceNextPageContext) => {
  const { res, err } = mercePageCtx.ctx
  const errorInitialProps: any = await NextErrorComponent.getInitialProps({
    res,
    err,
  } as any)

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 }
  }
  if (err) {
    logProviderFactory.logError(err)
    return errorInitialProps
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  // Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`))

  return errorInitialProps
}

export default MyError
