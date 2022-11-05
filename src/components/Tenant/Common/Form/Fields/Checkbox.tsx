import { Field, FieldProps, FormikProps } from 'formik'
import * as React from 'react'

import css from './Checkbox.scss'

interface ICheckboxProps {
  id: string
  children: any
}

const Checkbox = (props: ICheckboxProps & FormikProps<any>) => {
  const { id, children } = props
  return (
    <div className={`${css.formField}`}>
      <div className={css.checkboxContainer}>
        <Field
          name={id}
          render={({ field }: FieldProps) => (
            <input id={id} {...field} type="checkbox" className={`${css.checkboxInput}`} checked={field.value} />
          )}
        />
        <span className={`${css.subtext} ${css.label}`}>{children}</span>
      </div>
      {props.touched[props.id] && props.errors[props.id] && (
        <div className={css.formError}>
          <i>{props.errors[props.id]}</i>
        </div>
      )}
    </div>
  )
}

export default Checkbox
