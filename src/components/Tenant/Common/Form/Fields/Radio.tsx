import { FormikProps } from 'formik'
import * as React from 'react'

import css from './Radio.scss'

interface IRadioProps {
  id: string
  name?: string
  value: string | boolean
  children: any
  defaultSelected?: boolean
  onChange?: any
}

const Radio = (props: IRadioProps & FormikProps<any>) => {
  return (
    <div>
      <div className={css.checkboxContainer}>
        <input
          defaultChecked={props.defaultSelected}
          id={props.id}
          name={props.name ?? props.id}
          type="radio"
          className={`${css.checkboxInput}`}
          onChange={() => {
            if (props.onChange) {
              props.onChange(props.value)
            }
            props.setFieldValue(props.id, props.value)
          }}
        />
        <label htmlFor={props.id} className={`${css.subtext} ${css.label}`}>
          {props.children}
        </label>
      </div>
      {props.touched[props.id] && props.errors[props.id] && (
        <div className={css.formError}>
          <i>{props.errors[props.id]}</i>
        </div>
      )}
    </div>
  )
}

export default Radio
