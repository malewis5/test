import React from 'react'

import Modal from '../../../Common/Modal/Modal'
import { HubspotCustomSubscribeForm } from '../HubspotForms'
import css from './SubscribeModal.scss'

const FaceIcons = '../../../../../static/FaceIconScreenshotWhite.png'

export interface ISubscribeModalProps {
  onClose: () => void
}

const SubscribeModal: React.FC<ISubscribeModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} closeIcon width="598px" height="370px">
      <div className={css.formBox}>
        <div className={css.formWrapper}>
          <div className={css.title}>SIGN UP</div>
          <div className={css.subtitle}>Gear Up for News and Updates</div>
          <div className={css.form}>
            <HubspotCustomSubscribeForm className="subscribeModal" />
          </div>
          <div className={css.bottomContent}>
            <img src={FaceIcons} />
            <div className={css.label}>
              <span className={css.number}>+3K</span> industry leaders have already subscribed
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SubscribeModal
