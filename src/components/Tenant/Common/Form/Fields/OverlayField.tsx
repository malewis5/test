import { Field, FormikProps } from 'formik'
import * as React from 'react'

import { ITextFieldProps } from './interfaces'
import css from './TextField.scss'

interface IOverlayFieldProps {
  handleValuesFormat: (value: string) => string[]
  formatOnBlur?: (value: string) => string[]
  overlayMaxLength: string
  pattern?: string
  overlayId?: string
}

const OverlayField = (props: ITextFieldProps & FormikProps<any> & IOverlayFieldProps) => {
  const {
    id,
    placeholder,
    label,
    errors,
    touched,
    disabled,
    min,
    max,
    maxLength,
    overlayMaxLength,
    onChange,
    onBlur,
    autoComplete,
    handleValuesFormat,
    formatOnBlur,
    pattern,
    type,
    overlayId,
  } = props
  const _overlayId = overlayId ?? `overlay${props.id}`

  React.useEffect(() => {
    const overlayValue = props.values?.[props.id]

    setFieldsValue(overlayValue)
  }, [])

  // Handle form autocomplete plugins.
  React.useEffect(() => {
    const overlayValue = props.values?.[_overlayId]

    setFieldsValue(overlayValue)
  }, [props.values?.[_overlayId]])

  const setFieldsValue = (overlayValue: string) => {
    if (overlayValue) {
      const [formattedValue, originalValue] = handleValuesFormat(overlayValue)

      props.setFieldValue(_overlayId, formattedValue, false)
      props.setFieldValue(props.id, originalValue, true)
    }
  }

  const _handleOnBlur = (event: any) => {
    if (formatOnBlur) {
      const overlayValue = event?.target.value ?? ''

      if (overlayValue) {
        const [formattedValue, originalValue] = formatOnBlur(overlayValue)

        props.setFieldValue(_overlayId, formattedValue, false)
        props.setFieldValue(props.id, originalValue, true)
      }
    }

    onBlur?.()
  }

  const generateClasses = () => {
    const classes: string[] = [css.formField]
    if (props.disabled !== undefined) {
      if (props.disabled) {
        classes.push(css.disabled)
      }
    }
    if (props.errors[id] && props.touched[id]) {
      classes.push(css.error)
    }
    if (props.hidden) {
      classes.push(css.hidden)
    }
    return classes.join(' ')
  }

  const handleOnKeyUp = (event: React.ChangeEvent<any>) => {
    const overlayValue: string = event.target?.value
    const [formattedValue, originalValue] = handleValuesFormat(overlayValue)

    props.setFieldValue(`overlay${props.id}`, formattedValue, false)
    props.setFieldValue(props.id, originalValue, true)

    onChange?.(event)
  }

  return (
    <div className={generateClasses()}>
      {label && <label>{label}</label>}

      <div className={css.overlayInputContainer}>
        <Field
          name={id}
          placeholder={placeholder ?? ''}
          className={`${css.textInputHidden}`}
          disabled={disabled}
          min={min}
          max={max}
          pattern={pattern}
          type={type}
          maxLength={maxLength}
        />

        <Field
          name={_overlayId}
          placeholder={placeholder ?? ''}
          className={`${css.textInput}`}
          disabled={disabled}
          min={min}
          max={max}
          onKeyUp={handleOnKeyUp}
          type={type}
          onBlur={_handleOnBlur}
          autoComplete={autoComplete}
          maxLength={overlayMaxLength}
        />
      </div>

      {errors[id] && touched[id] && (
        <div className={css.formError}>
          <i>{errors[id]}</i>
        </div>
      )}
    </div>
  )
}

export default OverlayField
