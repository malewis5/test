import * as React from 'react'

import css from './Card.scss'

export interface ICardProps {
  children: any
  minHeight?: string
  center?: boolean
  padding?: string
}

export default function Card(props: ICardProps) {
  const appendStyles = () => {
    let styles = {}
    if (props.minHeight) {
      styles = { ...styles, minHeight: props.minHeight }
    }
    if (props.padding) {
      styles = { ...styles, padding: props.padding }
    }
    return styles
  }
  const applyClasses = () => {
    const classes: string[] = [css.cardContainer]
    if (props.center) {
      classes.push(css.center)
    }
    return classes.join(' ')
  }
  return (
    <div style={appendStyles()} className={applyClasses()}>
      <div className={css.cardInner}>{props.children}</div>
    </div>
  )
}
