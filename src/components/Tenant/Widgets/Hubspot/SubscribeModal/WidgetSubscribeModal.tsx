import React from 'react'

import ThemedButton from '../../../Common/Button/ThemedButton'
import { THEME_BUTTON_TYPES } from '../../../Common/Theme/ThemeWrapper'
import SubscribeModal from './SubscribeModal'
import css from './WidgetSubscribeModal.scss'

export interface IWidgetSubscribeModalProps {
  id: string
  label?: string
}

const WidgetSubscribeModal: React.FC<IWidgetSubscribeModalProps> = ({ id, label }) => {
  const [signUpModal, setSignUpModal] = React.useState(false)

  const ToggleSignUpModal = () => {
    setSignUpModal(!signUpModal)
  }
  return (
    <>
      {id === 'blog' && (
        <div
          className={label === 'SUBSCRIBE' ? `${css.signUpBtnBottom}` : `${css.signUpBtnTop}`}
          onClick={ToggleSignUpModal}
        >
          <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>
            {label || 'SIGN UP FOR MORE INSIGHTS IN YOUR INBOX'}
          </ThemedButton>
        </div>
      )}

      {signUpModal && <SubscribeModal onClose={() => setSignUpModal(false)} />}
    </>
  )
}

export default WidgetSubscribeModal
