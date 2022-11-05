import React from 'react'

export interface ITextFieldProps {
  id: string
  placeholder?: string
  disabled?: boolean
  type?: string
  label?: string
  hidden?: boolean
  min?: string
  max?: string
  maxLength?: string
  overrideValue?: string
  onChange?: (event: React.BaseSyntheticEvent) => void
  onBlur?: () => void
  autoComplete?: string
}
