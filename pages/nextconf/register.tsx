import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { NextForm } from '../../src/NextConf/NextForm'
import css from './register.scss'

const FooterLogo = '/static/PeakFooterLogo.svg'
const NextJSLogo = '/static/nextjs.svg'
const OpenGraph = '/static/nextopengraph.png'

export default function form() {
  return (
    <>
      <Head>
        <title>Register | PeakActivity</title>
        <meta property="og:image" content={OpenGraph} />
      </Head>
      <div className={css.container}>
        <div className={css.header}>
          <Link href={'https://nextjs.org/'}>
            <a>
              <Image className={css.nextLogo} src={NextJSLogo} height={23} width={150} />
            </a>
          </Link>
          <Link href="https://peakactivity.com">
            <a>
              <Image className={css.nextLogo} src={FooterLogo} height={23} width={203} />
            </a>
          </Link>
        </div>
        <div className={css.body}>
          <div className={css.giveawayContainer}>
            <div>
              <h3>Giveaway Details</h3>
              <p>This giveaway has ended, but you can still subscribe to our newsletter!</p>
            </div>
          </div>
          <div className={css.formContainer}>
            <NextForm className={css.form} />
          </div>
          <div className={css.valuePropContainer}>
            <div className={css.gridItem}>
              <h3>Exclusivity</h3>
              <p>
                Exclusive access to our private community that will help you grow and learn from other developers.
                Allowing you to stay up to date with the latest trends and technologies.
              </p>
            </div>
            <div className={css.gridItem}>
              <h3>SME Content</h3>
              <p>
                Curated engineering insights, tips, and tricks from our team of experts. We will provide deep dives into
                the latest technologies and trends helping you stay ahead of the curve.
              </p>
            </div>
            <div className={css.gridItem}>
              <h3>Engineering Opportunities</h3>
              <p>
                Fully vetted opportunities from our network of partners. We have a unique advantage of being able to
                provide you with the best opportunities in the market. If you are looking for a new role, we can help
                you find it.
              </p>
            </div>
          </div>
        </div>

        <footer className={css.footer}>
          <Link href="/">
            <a>
              <Image className={css.textLogo} src={FooterLogo} height={23} width={203} />
            </a>
          </Link>
        </footer>
      </div>
    </>
  )
}
