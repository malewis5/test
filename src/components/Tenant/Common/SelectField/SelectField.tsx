import { find } from '@peakactivity/merce-shared-frontend-components'
import * as React from 'react'

import css from './SelectField.scss'

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>

export interface ISelectOption {
  label: string
  value: string
}
export interface IProps {
  selectFieldConfiguration?: {
    options: ISelectOption[]
    active: string
  }
  label?: string
  style?: any
  onChange: (option: ISelectOption) => void
}

export default class SelectField extends React.Component<IProps, any> {
  public renderFilterOptions = () => {
    const { selectFieldConfiguration } = this.props
    if (!selectFieldConfiguration) {
      // return <option />
      return <option key="1-select">Select Size</option>
    }
    return selectFieldConfiguration.options.map((filter: ISelectOption, index: number) => {
      return (
        <option key={index} value={filter.value}>
          {filter.label}
        </option>
      )
    })
  }

  public onHandleChange = (evt: SelectChangeEvent) => {
    const { selectFieldConfiguration } = this.props
    if (selectFieldConfiguration) {
      const targetOption: ISelectOption | undefined = find(selectFieldConfiguration.options, {
        value: evt.target.value,
      })
      if (targetOption) {
        this.props.onChange(targetOption)
      }
    }
  }

  public render() {
    const { selectFieldConfiguration, label, style } = this.props
    return (
      <div className={css.selectWrap}>
        {label && <span>{label}:</span>}
        <select
          className={css.selectFields}
          style={style}
          id="sortBy"
          onChange={this.onHandleChange}
          value={selectFieldConfiguration?.active ?? ''}
        >
          {this.renderFilterOptions()}
        </select>
      </div>
    )
  }
}
