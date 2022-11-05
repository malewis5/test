import * as React from 'react'

import css from '../../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Layout/Layout.scss'

export default class Body extends React.Component<any> {
  public render() {
    return (
      <div className={`${css.fillBody} ${this.props.class}`}>
        <main>{this.props.children}</main>
      </div>
    )
  }
}
