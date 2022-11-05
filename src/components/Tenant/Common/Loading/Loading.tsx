import React from 'react'

import css from './Loading.scss'

interface ILoadingProps {
  label?: string
  style?: any
}

const Loading = (props: ILoadingProps) => {
  return (
    <div className={`${css.loadingContainer}`} style={props.style}>
      <div className={css.loadingBox}>
        <img src="/spinners/gears.svg" alt={props.label ? props.label : 'loading'} />
        {props.label && <div className={css.text}>{props.label}</div>}
      </div>
    </div>
  )
}

export default Loading
