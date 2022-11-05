/* eslint-disable import/order */
import * as React from 'react'

import ThemedButtonWrapper from '../Theme/ThemedButtonWrapper'
import { THEME_BUTTON_TYPES } from '../Theme/ThemeWrapper'
import css from './ThemedButton.scss'

export interface IThemedButtonProps {
  onClick?: any
  type?: THEME_BUTTON_TYPES
  inverse?: boolean
  fullWidth?: boolean
  style?: any
  disabled?: boolean
  className?: string
}

export default class ThemedButton extends React.Component<IThemedButtonProps> {
  public clickHandler = (event: any) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event)
    }
  }

  getClassName() {
    return this.props.className ?? ''
  }

  public render() {
    const fullWidth: boolean = this.props.fullWidth !== undefined ? this.props.fullWidth : false
    const isInverted: boolean = this.props.inverse !== undefined ? this.props.inverse : false

    return (
      <ThemedButtonWrapper type={this.props.type} inverse={isInverted}>
        <div
          onClick={this.clickHandler}
          className={`${this.getClassName()} button ${css.merceButton} ${fullWidth ? css.fullWidth : ''} ${
            this.props.disabled ? `${css.disabled} disabled` : ''
          }`}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </ThemedButtonWrapper>
    )
  }
}
