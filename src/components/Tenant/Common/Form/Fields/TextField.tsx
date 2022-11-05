import { Field, FormikProps } from 'formik'
import * as React from 'react'

import css from './TextField.scss'

interface ITextFieldProps {
  id: string
  placeholder?: string
  disabled?: boolean
  type?: string
  label?: string
  hidden?: boolean
  min?: string
  max?: string
  overrideValue?: string
  onChange?: (event: React.BaseSyntheticEvent) => void
  onBlur?: () => void
  autoComplete?: string
  pattern?: string
  maxLength?: string
  required?: boolean
}

const TextField = (props: ITextFieldProps & FormikProps<any>) => {
  const {
    id,
    placeholder,
    label,
    errors,
    touched,
    disabled,
    type,
    min,
    max,
    overrideValue,
    pattern,
    maxLength,
    onChange,
    onBlur,
    autoComplete,
    required,
  } = props

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
  const conditionalProps = overrideValue !== undefined ? { value: overrideValue } : {}

  return (
    <div className={generateClasses()}>
      {label && <label>{label}</label>}

      <Field
        name={id}
        type={type ?? 'text'}
        placeholder={placeholder ?? ''}
        className={`${css.textInput}`}
        disabled={disabled}
        min={min}
        max={max}
        onKeyUp={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        pattern={pattern}
        maxLength={maxLength}
        required={required}
        {...conditionalProps}
      />

      {errors[id] && touched[id] && (
        <div className={css.formError}>
          <i>{errors[id]}</i>
        </div>
      )}
    </div>
  )
}

export default TextField
