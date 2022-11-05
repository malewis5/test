import * as React from 'react'

import css from './PreviewButton.scss'

export function PreviewButton(props: any) {
  return (
    <>
      <div className={css.previewButton}>
        <div className={css.previewButtonInner}>
          {props.inPreview ? (
            <a href="/api/preview/end">Exit Preview Mode</a>
          ) : (
            <a href="/api/preview/start">Enter Preview Mode</a>
          )}
        </div>
      </div>
    </>
  )
}
