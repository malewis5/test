import { GetStaticProps } from 'next'
import * as React from 'react'

import { PageNotFound } from '../src/components/Tenant/Common/404/404'

/**
 * A custom and static 404 page
 */
export default function Custom404Page() {
  return <PageNotFound />
}

/**
 * Since we are using getInitialProps in the _app.tsx, it automatically opts us out of static generation
 * However, if you include getStaticProps in your file, it will build this page as static
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * @param params
 */
export async function getStaticProps(): Promise<GetStaticProps> {
  //if you wish to have a custom 404 page in studio, you can make the api call here
  return {
    props: {},
  } as any
}
