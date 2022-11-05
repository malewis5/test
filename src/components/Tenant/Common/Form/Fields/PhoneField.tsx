import { FormikProps } from 'formik'
import * as React from 'react'

import { ITextFieldProps } from './interfaces'
import OverlayField from './OverlayField'

const SEPARATOR = new RegExp('-', 'g')
const phoneRegex = /^\(?([0-9]{0,3})\)?([0-9]{0,3})[\s-]?([0-9]{0,4})$/

const PhoneField = (props: ITextFieldProps & FormikProps<any>) => {
  const handleValuesFormat = (value: string): string[] => {
    let formattedValue: string = value?.replace(SEPARATOR, '')
    let originalValue: string = value

    if (formattedValue) {
      if (formattedValue.length <= 3) {
        formattedValue = formattedValue.replace(phoneRegex, '$1')
      } else if (formattedValue.length <= 6) {
        formattedValue = formattedValue.replace(phoneRegex, '$1-$2')
      } else {
        formattedValue = formattedValue.replace(phoneRegex, '$1-$2-$3')
      }
      originalValue = formattedValue.replace(SEPARATOR, '')
    }

    return [formattedValue, originalValue]
  }

  return (
    <OverlayField
      pattern="\d*"
      handleValuesFormat={handleValuesFormat}
      type="tel"
      {...props}
      maxLength="10"
      overlayMaxLength="12"
    />
  )
}

export default PhoneField
