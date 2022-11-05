import * as React from 'react'

export enum THEME_WRAPPER_TAGS {
  CORE_WRAPPER = 'omnistudio-style-wrapper',
  PRIMARY_BACKGROUND_COLOR = 'primaryColorBackground',
  SECONDARY_BACKGROUND_COLOR = 'secondaryColorBackground',
  TERTIARY_BACKGROUND_COLOR = 'tertiaryColorBackground',
  QUATERNARY_BACKGROUND_COLOR = 'quaternaryColorBackground',
  QUINARY_BACKGROUND_COLOR = 'quinaryColorBackground',
  SENARY_BACKGROUND_COLOR = 'senaryColorBackground',
  PRIMARY_FONT_COLOR = 'primaryColorFont',
  SECONDARY_FONT_COLOR = 'secondaryColorFont',
  TERTIARY_FONT_COLOR = 'tertiaryColorFont',
  QUATERNARY_FONT_COLOR = 'quaternaryColorFont',
  QUINARY_FONT_COLOR = 'quinaryColorFont',
  SENARY_FONT_COLOR = 'senaryColorFont',
}

export enum THEME_BUTTON_TYPES {
  PRIMARY = 'primary-button-wrapper',
  SECONDARY = 'secondary-button-wrapper',
}

export default class ThemeWrapper extends React.Component<any> {
  public render() {
    return (
      <div className={`${THEME_WRAPPER_TAGS.CORE_WRAPPER} ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}
