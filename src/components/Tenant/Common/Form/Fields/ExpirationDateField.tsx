import { FormikProps } from 'formik'
import * as React from 'react'

import { ITextFieldProps } from './interfaces'
import OverlayField from './OverlayField'

const expirationDateRegex = /^\(?([0-9]{0,2})\)?([0-9]{0,4})$/

const ExpirationDateField = (props: ITextFieldProps & FormikProps<any>) => {
  const overlayFieldId = 'cc-exp'
  const handleValuesFormat = (value: string): string[] => {
    let formattedValue: string = value
    let _value = ''

    if (formattedValue && formattedValue.length > 2 && !formattedValue.endsWith('-')) {
      formattedValue = formattedValue.replace('/', '-')

      formattedValue = formattedValue.replace(expirationDateRegex, '$1-$2')
    }
    _value = `${formattedValue.substr(0, 2)}/${formattedValue.substr(5, 2)}`

    return [formattedValue, _value]
  }

  /**
   * Adding an onblur formatter to try to prevent field failures as much as possible.
   * @param value string. The value of the overlay field to check and see if we can format it.
   * @returns [string, string]
   */
  const formatOnBlur = (value: string): string[] => {
    let formattedValue: string = value ?? ''
    let _value = ''

    if (formattedValue?.length === 5 && !formattedValue.endsWith('-')) {
      formattedValue = formattedValue.replace('/', '-')

      formattedValue = formattedValue.split('-').join('-20')
    }
    _value = `${formattedValue.substr(0, 2)}/${formattedValue.substr(5, 2)}`

    return [formattedValue, _value]
  }

  return (
    <OverlayField
      handleValuesFormat={handleValuesFormat}
      formatOnBlur={formatOnBlur}
      type="tel"
      {...props}
      // Matching what google expects for autocomplete
      overlayId={overlayFieldId}
      maxLength="5"
      overlayMaxLength="7"
      autoComplete={overlayFieldId}
    />
  )
}

export default ExpirationDateField
