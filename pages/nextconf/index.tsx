import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import css from './index.scss'

const FooterLogo = '/static/PeakFooterLogo.svg'
const OpenGraph = '/static/nextopengraph.png'

export default function NextConfPage() {
  return (
    <>
      <Head>
        <title>PeakActivity</title>
        <meta property="og:image" content={OpenGraph} />
      </Head>
      <div className={css.container}>
        <div className={css.body}>
          <div className={css.header}>
            <h1>
              Psst...Get in Here <br /> We&apos;ve Got Something <br />
              <span>Exclusive for You</span>
            </h1>
            <div className={css.borderEffect}>
              <Link href="/nextconf/register">
                <a>Enter</a>
              </Link>
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
