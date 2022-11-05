import React from 'react'

import ModalLoader from './ModalLoader'
import css from './OverlayLoading.scss'
import SimpleCssLoader from './SimpleCssLoader'

interface IOverlayLoadingProps {
  isVisible?: boolean
  loadingText?: string
  useCssLoader?: boolean
  useModal?: boolean
}

const OverlayLoading = ({ isVisible, loadingText, useModal, useCssLoader }: IOverlayLoadingProps) => {
  if (!isVisible) {
    return null
  }

  const LoaderComponent = useCssLoader ? SimpleCssLoader : ModalLoader
  let overlayClasses = `${css.loadingOverlay} loading-overlay-public`
  let modalClasses = css.loadingWrapper

  if (useModal) {
    overlayClasses = `${css.loadingOverlayModal} ${overlayClasses}`
    modalClasses = css.loadingModal
  }

  let textClasses = css.loadingTextHidden
  let text = 'Loading'
  if (loadingText) {
    textClasses = css.loadingText
    text = loadingText
  }

  return (
    <div className={overlayClasses}>
      <div
        className={`${modalClasses} ${css.loadingWrapper}`}
        role="dialog"
        aria-labelledby="loading-label"
        aria-modal="true"
      >
        <h5 className={textClasses} id="loading-label">
          {text}
        </h5>

        <LoaderComponent />
      </div>
    </div>
  )
}

export default OverlayLoading
