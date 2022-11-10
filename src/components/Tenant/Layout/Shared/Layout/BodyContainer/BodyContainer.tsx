import * as React from 'react'

import css from './BodyContainer.module.scss'

export default class Body extends React.Component<any> {
  public render() {
    return (
      <div className={`${css.fillBody} ${this.props.class}`}>
        <main>{this.props.children}</main>
      </div>
    )
  }
}
