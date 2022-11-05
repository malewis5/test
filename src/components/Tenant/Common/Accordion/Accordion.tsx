import React, { useEffect, useRef, useState } from 'react'

import css from './Accordion.scss'

interface IAccordion {
  title: string
  children: any
  buttonStyles?: object
  buttonTitleStyles?: object
  onClick?: () => void
  forceIsOpen?: boolean
  isButtonTransparent?: boolean
  itemCount?: number
}
const Accordion = (
  props: IAccordion = { title: '', children: '', buttonStyles: {}, buttonTitleStyles: {}, itemCount: 0 }
) => {
  const { title, children, buttonStyles, buttonTitleStyles, onClick, forceIsOpen, isButtonTransparent, itemCount } =
    props
  const [setActive, setActiveState] = useState('')
  const [setHeight, setHeightState] = useState('0px')
  const [setOpen, setOpenState] = useState(forceIsOpen)
  const _content: any = useRef(null)

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '')
    setHeightState(setActive === 'active' ? '0px' : `${_content?.current?.scrollHeight}px`)
    setOpenState(setActive !== 'active')

    onClick?.()
  }

  useEffect(() => {
    setActiveState(forceIsOpen ? 'active' : '')
    setHeightState(forceIsOpen ? `${_content?.current?.scrollHeight}px` : '0px')
    setOpenState(forceIsOpen)
  }, [forceIsOpen])

  useEffect(() => {
    setHeightState(setActive ? `${itemCount ? itemCount * 35 : 100}px` : '0px')
  }, [itemCount])

  return (
    <div className={css.accordion__section}>
      <button
        className={`${css.accordion} ${setActive && css.active} ${isButtonTransparent && css.activeTransparent}`}
        style={buttonStyles}
        onClick={toggleAccordion}
      >
        <p className={css.accordion__title} style={buttonTitleStyles}>
          {title}
        </p>
        <i className={`${css.floatRight} ${setOpen ? `align-middle fas fa-times` : `fas fa-chevron-down`}`} />
      </button>
      <div ref={_content} style={{ maxHeight: `${setHeight}` }} className={css.accordion__content}>
        <div className={css.accordion__text}>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
