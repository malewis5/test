import * as React from 'react'

import css from './ColorRender.scss'
import BlackSVG from './colors/BlackSVG'
import BlueSVG from './colors/BlueSVG'
import BrownSVG from './colors/BrownSVG'
import CrystalSVG from './colors/CrystalSVG'
import GoldSVG from './colors/GoldSVG'
import GraySVG from './colors/GraySVG'
import GreenSVG from './colors/GreenSVG'
import OrangeSVG from './colors/OrangeSVG'
import PinkSVG from './colors/PinkSVG'
import PurpleSVG from './colors/PurpleSVG'
import RedSVG from './colors/RedSVG'
import SilverSVG from './colors/SilverSVG'
import TortoiseSVG from './colors/TortoiseSVG'
import WhiteSVG from './colors/WhiteSVG'
import YellowSVG from './colors/YellowSVG'

export interface IColorRenderSVGProps {
  height?: number
  width?: number
}

export interface IColorRenderProps {
  color: string
  selected?: boolean
  size?: string
}

const getColor = (color: string, selected: boolean, isIE11: boolean, size?: string) => {
  const h = 28.5
  const w = 28.5
  const styleLine: { [x: string]: any } = size
    ? {
        height: size,
        width: size,
      }
    : {}

  switch (color) {
    case 'Black':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <BlackSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Blue':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <BlueSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Brown':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <BrownSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Crystal':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <CrystalSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Gold':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <GoldSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Gray':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <GraySVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Green':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <GreenSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Orange':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <OrangeSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Pink':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <PinkSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Purple':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <PurpleSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Red':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <RedSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Silver':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <SilverSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Tortoise':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <TortoiseSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'White':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <WhiteSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    case 'Yellow':
      return (
        <div className={`${css.square} ${selected ? css.squareSelected : ''}`} style={styleLine}>
          <YellowSVG height={isIE11 ? h : 0} width={isIE11 ? w : 0} />
        </div>
      )
    default:
      return <div> {color}</div>
  }
}

const ColorRender = (props: IColorRenderProps) => {
  const isIE11 = false
  return <div className={css.squareContainer}>{getColor(props.color, !!props.selected, isIE11, '20')}</div>
}

export default ColorRender
