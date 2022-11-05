import { FormikProps } from 'formik'
import * as React from 'react'

import { ITextFieldProps } from './interfaces'
import OverlayField from './OverlayField'

const SEPARATOR = new RegExp(' ', 'g')
const creditCardRegex = /^\(?([0-9]{0,4})\)?([0-9]{0,4})[\s-]?([0-9]{0,4})[\s-]?([0-9]{0,4})$/

const CreditCardField = (props: ITextFieldProps & FormikProps<any>) => {
  const overlayFieldId = 'cardnumber'
  const handleValuesFormat = (value: string): string[] => {
    let formattedValue: string = value?.replace(SEPARATOR, '')
    let originalValue: string = value

    if (formattedValue) {
      if (formattedValue.length <= 4) {
        formattedValue = formattedValue.replace(creditCardRegex, '$1')
      } else if (formattedValue.length <= 8) {
        formattedValue = formattedValue.replace(creditCardRegex, '$1 $2')
      } else if (formattedValue.length <= 12) {
        formattedValue = formattedValue.replace(creditCardRegex, '$1 $2 $3')
      } else {
        formattedValue = formattedValue.replace(creditCardRegex, '$1 $2 $3 $4')
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
      // Matching what google expects for autocomplete
      overlayId={overlayFieldId}
      maxLength="16"
      overlayMaxLength="19"
      autoComplete={overlayFieldId}
    />
  )
}

export default CreditCardField
