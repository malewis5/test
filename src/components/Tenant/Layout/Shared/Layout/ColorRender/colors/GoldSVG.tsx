import * as React from 'react'

import { IColorRenderSVGProps } from '../ColorRender'

const GoldSVG = (props: IColorRenderSVGProps) => (
  <svg
    width={`${props.width ? props.width + 'px' : '100%'}`}
    height={`${props.height ? props.height + 'px' : '100%'}`}
    viewBox="3 3 26 26"
    version="1.1"
  >
    <title>Oval</title>
    <g id="Main-Pages" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Artboard" fill="#D4AF37">
        <rect x="2.4px" y="2.4px" width="50px" height="50px" />
      </g>
    </g>
  </svg>
)
export default GoldSVG