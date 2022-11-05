import * as React from 'react'

import { THEME_BUTTON_TYPES } from '../Theme/ThemeWrapper'

export interface IThemedButtonWrapperProps {
  type?: THEME_BUTTON_TYPES
  inverse?: boolean
}

export default class ThemedButtonWrapper extends React.Component<IThemedButtonWrapperProps> {
  public render() {
    const type: THEME_BUTTON_TYPES = this.props.type !== undefined ? this.props.type : THEME_BUTTON_TYPES.PRIMARY
    const isinverse: boolean = this.props.inverse !== undefined ? this.props.inverse : false

    return <div className={`${type}${isinverse ? '-inverse' : ''}`}>{this.props.children}</div>
  }
}
