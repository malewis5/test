import { FormikProps } from 'formik'
import * as React from 'react'

import { ITextFieldProps } from './interfaces'
import TextField from './TextField'

interface IOverlayFieldProps {
  onChangePostalCode: (event: any, setFieldValue: (field: string, value: any) => void) => void
}

const ZipCode = (props: ITextFieldProps & FormikProps<any> & IOverlayFieldProps) => {
  const { id, placeholder, onChangePostalCode, ...formProps } = props

  // Handle form autocomplete plugins and onChangeValue
  React.useEffect(() => {
    onChangePostalCode({ currentTarget: { value: props.values?.[props.id] } }, formProps.setFieldValue)
  }, [props.values?.[props.id]])

  return <TextField id={id} placeholder={placeholder} {...formProps} />
}

export default ZipCode
