import Link from 'next/link'
import * as React from 'react'

import ThemedButton from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { THEME_BUTTON_TYPES } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import css from './404.scss'

export interface IAppProps {
  message?: string
}
const gif = '../../../../static/avalanche.gif'

export function PageNotFound() {
  return (
    <>
      <div className={css.notFoundContainer}>
        <div className={css.gifContainer}>
          <div className={css.gif}>
            <img src={gif} />
          </div>
          <h2>404</h2>
        </div>
        <div className={css.textContainer}>
          <h3>This page does not exist.</h3>
          <h3>
            An avalanche of disappointment
            <br />
            is completely normal.
          </h3>
          <p>The page you are looking for was moved, removed, renamed, or never existed.</p>
          <div className={css.button}>
            <Link href="/">
              <a>
                <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY}>RETURN TO HOME</ThemedButton>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
