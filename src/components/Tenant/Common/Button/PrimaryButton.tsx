import * as React from 'react'

import css from './PrimaryButton.scss'

interface IPrimaryButtonProps {
  children: any
  type?: 'button' | 'submit' | 'reset' | undefined
  additionalClass?: string
  onClick?: (target: any) => void
  invert?: boolean
  disabled?: boolean
}

export default function PrimaryButton(props: IPrimaryButtonProps) {
  const setType = () => {
    if (props.type) {
      return props.type
    }
    return 'button'
  }
  const wrapClasses = () => {
    const classes: string[] = [css.button]
    if (props.invert !== undefined && props.invert) {
      classes.push(css.invert)
    }
    if (props.additionalClass) {
      classes.push(props.additionalClass)
    }
    if (isDisabled()) {
      classes.push(css.disabled)
    }
    return classes.join(' ')
  }
  const isDisabled = () => {
    if (props.disabled === undefined) {
      return false
    }
    return props.disabled
  }

  return (
    <button disabled={isDisabled()} className={wrapClasses()} type={setType()} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
