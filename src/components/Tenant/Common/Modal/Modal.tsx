/* eslint-disable react/jsx-no-bind */
import * as React from 'react'

import css from './Modal.scss'

export interface IModalsProps {
  children: any
  onClose: (evt: any) => void
  show?: boolean
  /**
   * Text to be displayed on the Modal
   */
  title?: string
  width?: string
  height?: string
  dynamicClip?: boolean
  renderFixedContent?: any
  full?: boolean
  lock?: boolean
  closeIcon?: boolean
  showTitle?: boolean
}

export default class Modals extends React.Component<IModalsProps, any> {
  public divElement: any = null

  constructor(props: IModalsProps) {
    super(props)
    this.state = {
      height: 0,
      prevHtmlOverflow: null,
    }
  }

  public escFunction = (event: any) => {
    if (event.keyCode === 27) {
      // Do whatever when esc is pressed
      if (!this.props.lock) {
        this.closeModalHook('key')
      }
    }
  }

  public componentWillUnmount() {
    document.documentElement.style.overflow = this.state.prevHtmlOverflow
    document.removeEventListener('keydown', this.escFunction, false)
  }

  public componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)

    const height = this.divElement ? this.divElement.clientHeight : 0
    const prevHtmlOverflow = document.documentElement.style.overflow

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ height, prevHtmlOverflow })

    document.documentElement.style.overflow = 'hidden'
  }

  public closeModalHook = (type: string) => {
    if (this.props.onClose && !this.props.lock) {
      this.props.onClose(type)
    }
  }

  public getHeight = () => {
    const { height } = this.props
    const targetHeight = height !== undefined ? height : 'auto'
    const style: any = {
      height: targetHeight,
    }
    if (height === undefined) {
      style.maxHeight = '800px'
    }
    return style
  }

  public getBodyStyles = () => {
    const { full, width } = this.props
    const targetWidth: string = width !== undefined ? width : '95%'
    const isFull: boolean = full !== undefined ? full : false
    const style: any = {}
    style.width = targetWidth
    if (isFull) {
      style.top = '0'
      style.left = '0'
      style.transform = 'none'
      style.width = '98.5%'
      style.margin = '15px'
    }
    return style
  }

  public getInnerContentStyles = () => {
    const { dynamicClip, full } = this.props
    const setupDynamicClip: boolean = dynamicClip !== undefined ? dynamicClip : false
    const isFull: boolean = full !== undefined ? full : false
    if (!setupDynamicClip) {
      const style: any = {
        overflow: 'auto',
        ...this.getHeight(),
      }
      if (isFull) {
        style.maxHeight = '91vh'
        style.height = '91vh'
      }
      return style
    }
    const { height } = this.state
    if (height >= 799) {
      return {
        maxHeight: '650px',
        overflow: 'auto',
      }
    }
    return {}
  }

  public render() {
    const { show, title, showTitle = true } = this.props

    const doShow = show !== undefined ? show : true
    if (!doShow) {
      return <div />
    }

    return (
      <div className={css.modalContainer}>
        <div onClick={this.closeModalHook.bind(this, 'overlay')} className={`${css.modalBackground}`} />
        <div className={css.body} style={this.getBodyStyles()}>
          <div className={css.innerBody}>
            {showTitle && (
              <div className={css.titleContainer}>
                {!this.props.lock && (
                  <div className={css.close} onClick={this.closeModalHook.bind(this, 'button')}>
                    {this.props.closeIcon ? <i className="fas fa-times" /> : 'Close'}
                  </div>
                )}
                <h1 className={title ? css.title : css.invisible}>{title ?? ''}</h1>
              </div>
            )}
            {this.props.renderFixedContent?.()}
            <div
              style={this.getInnerContentStyles()}
              className={`${css.modalContent} fadeIn`}
              ref={(divElement) => (this.divElement = divElement)}
            >
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
