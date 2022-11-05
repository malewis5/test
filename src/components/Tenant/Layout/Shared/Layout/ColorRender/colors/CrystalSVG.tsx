import * as React from 'react'

import { IColorRenderSVGProps } from '../ColorRender'

const cristal = '../../../../static/Now/crystal.png'

const CrystalSVG = (props: IColorRenderSVGProps) => (
  <img
    title="Cristal"
    src={cristal}
    width={`${props.width ? props.width + 'px' : ''}`}
    height={`${props.height ? props.height + 'px' : ''}`}
    style={{ marginTop: '2px', marginLeft: '1px' }}
  />
)

export default CrystalSVG
