import { find } from '@peakactivity/merce-shared-frontend-components'
import * as React from 'react'

import css from './Sort.scss'

type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>

export enum IProductSortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface IProductsSortOption {
  direction?: IProductSortDirection
  label: string
  value: string
  field?: string
}
export interface IProps {
  productSortConfiguration?: {
    options: IProductsSortOption[]
    active: string
  }
  shownItems: number
  query: any
  maxItems: number
  onChange: (option: IProductsSortOption) => void
  searchMetaData?: any
}

export default class Filters extends React.Component<IProps, any> {
  public renderFilterOptions = () => {
    const { productSortConfiguration } = this.props
    if (!productSortConfiguration) {
      return <option />
    }
    return productSortConfiguration.options.map((filter: IProductsSortOption, index: number) => {
      return (
        <option key={index} value={filter.value}>
          {filter.label}
        </option>
      )
    })
  }

  public getActiveSortOptionFromMetadata = (metadata: any): any => {
    if (!metadata.queryParams.sort) {
      return 'default'
    }
    if (metadata.queryParams.sort.indexOf('highestFinalPrice') !== -1) {
      return 'price_highest'
    } else if (metadata.queryParams.sort.indexOf('lowestFinalPrice') !== -1) {
      return 'price_lowest'
    }
    return metadata.queryParams.sort.replace(/asc|desc/g, '').trim()
  }

  public onSortChange = (evt: SelectChangeEvent) => {
    const { productSortConfiguration } = this.props
    if (productSortConfiguration) {
      const targetOption: IProductsSortOption | undefined = find(productSortConfiguration.options, {
        value: evt.target.value,
      })
      if (targetOption) {
        this.props.onChange(targetOption)
      }
    }
  }

  public renderFiltersRowContainer = () => {
    const { productSortConfiguration, searchMetaData } = this.props

    return (
      <div className={css.filterRow}>
        <div className={css.filterWrap}>
          <div className={css.flex}>
            <span className={css.filterSelectLabel}>Sort by:</span>
            <span className={css.filterSelectContainer}>
              <label className="is-hidden" htmlFor="sortBy">
                :
              </label>
              <select
                className={css.sortBy}
                id="sortBy"
                onChange={this.onSortChange}
                value={
                  searchMetaData?.queryParams?.sort?.length > 1
                    ? this.getActiveSortOptionFromMetadata(searchMetaData)
                    : productSortConfiguration
                    ? productSortConfiguration.active
                    : ''
                }
              >
                {this.renderFilterOptions()}
              </select>
            </span>
          </div>
        </div>
      </div>
    )
  }
  public render() {
    return <div className="hidden-xs">{this.renderFiltersRowContainer()}</div>
  }
}
