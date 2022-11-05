import { FormikProps } from 'formik'
import * as React from 'react'

import css from './SelectField.scss'

export interface IOption {
  value: string
  label: string
}

interface ISelectProps {
  id: string
  overrideValue?: string
  options: IOption[]
  disabled?: boolean
  onSelectOption?: (value: string) => void
  required?: boolean
}

const SelectField = (props: ISelectProps & FormikProps<any>) => {
  const getCurrentValue = () => {
    const target = props.options.find((o: IOption) => {
      return o.value === props.values[props.id]
    })

    if (target) {
      return target.value
    }

    return ''
  }

  return (
    <div className={`${css.selectFieldContainer} ${props.disabled ? css.disabled : ''} select-field-container`}>
      <select
        name={props.id}
        onChange={(e: any) => {
          props.onSelectOption?.(e.target.value)
          props.setFieldValue(props.id, e.target.value)
        }}
        style={{ display: 'block' }}
        disabled={props.disabled ?? false}
        required={props.required}
        value={props.overrideValue ? props.overrideValue : getCurrentValue()}
      >
        {props.options.map((option: IOption, key: number) => {
          return (
            <option key={key} label={option.label} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      {props.touched[props.id] && props.errors[props.id] && (
        <div className={css.formError}>
          <i>{props.errors[props.id]}</i>
        </div>
      )}
    </div>
  )
}

export default SelectField
