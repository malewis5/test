import * as React from 'react'

import { ICatalogConfig } from '../../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Catalog/Catalog'
import {
  ICatalogNavigationItem,
  ICatalogNavigationItemValue,
  IFilterItem,
} from '../../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Catalog/Navigation/Navigation'
import { has } from '../../../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/lodash'
import Accordion from '../../../../Common/Accordion/Accordion'
import PrimaryButton from '../../../../Common/Button/PrimaryButton'
import Loading from '../../../../Common/Loading/Loading'
import css from './Navigation.scss'

export interface IProps {
  attributes: ICatalogNavigationItem[]
  originalAttributes?: ICatalogNavigationItem[]
  category: any
  configuration: ICatalogConfig
  attributeLimit?: number
  filtersList?: IFilterItem[]
  productsLoading?: boolean
  onCloseModal?: () => void
}

interface IState {
  filterAttributes: ICatalogNavigationItem[]
  activeSearch: string
}

export default class CatalogNavigation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      filterAttributes: this.props.attributes ?? [],
      activeSearch: '',
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.attributes !== this.props.attributes) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => ({
        filterAttributes: this.props.attributes ?? [],
      }))
    }
  }

  public onSearchButtonClick = () => {
    const { activeSearch } = this.state
    const { attributes } = this.props
    const searchData: ICatalogNavigationItem[] = []
    if (attributes.length) {
      attributes.map((item) => {
        if (
          item.label.toLowerCase().includes(activeSearch.toLowerCase()) ||
          this.checkForChildren(item?.values, activeSearch)
        ) {
          searchData.push(item)
        }
      })
    }

    this.setState({
      filterAttributes: searchData,
    })
  }

  public checkForChildren = (data: any, activeSearch: string) => {
    let result = false
    data.map((item: any) => {
      if (item.value.toLowerCase().includes(activeSearch.toLowerCase())) {
        result = true
      }
    })
    return result
  }

  public onAttributeClickEvent = (query: string, checked: boolean, filter: ICatalogNavigationItemValue) => {
    const { configuration, category } = this.props

    if (checked) {
      this.onClearFilter(filter?.code, filter.value)
    } else if (configuration.events?.onAttributeFilterClick) {
      configuration.events.onAttributeFilterClick(query, category)
    }
  }

  public getURLAttributeFilter = (query: string): string => {
    const { configuration, category } = this.props
    if (configuration.events?.getURLAttributeFilter) {
      return configuration.events.getURLAttributeFilter(query, category)
    }
    return ''
  }

  public checkForValue = (filtersList: any, selectedItem: string) => {
    let checked = false
    filtersList.forEach((item: any) => {
      if (item.value === `"${selectedItem}"`) {
        checked = true
      }
    })
    return checked
  }

  public filterItems = (items: ICatalogNavigationItemValue[]) => {
    return items
  }

  public onClearFilter = (key: string | undefined, value?: string) => {
    const { category } = this.props
    const onRemoveFilter: any = has(this.props, ['configuration', 'events', 'onRemoveFilter'])
    if (onRemoveFilter) {
      onRemoveFilter(key, category, value)
    }
  }

  public onCloseModal = () => {
    if (this.props.onCloseModal) {
      this.props.onCloseModal()
    }
  }

  public renderAttrFilter = (attributeCategory: ICatalogNavigationItem, topLevelIndex: number) => {
    const filteredItems: ICatalogNavigationItemValue[] = this.filterItems(attributeCategory.values)

    return (
      <div key={topLevelIndex} className={css.marginMe}>
        <Accordion
          buttonStyles={{ backgroundColor: 'white', border: '#ebebeb 1px solid', borderRadius: '3px' }}
          title={attributeCategory.label}
          itemCount={filteredItems.length}
        >
          <div className={css.categoryItemBody}>
            {filteredItems.map((item: ICatalogNavigationItemValue) => {
              const query = `${attributeCategory.code}=${item.value}`
              const checked = this.checkForValue(this.props?.filtersList, item.value)
              return (
                <div className={css.categoryItems} key={item.value}>
                  <div>
                    <input
                      id={item.value}
                      onChange={() => this.onAttributeClickEvent(query, checked, item)}
                      type="checkbox"
                      checked={checked}
                      disabled={this.props.productsLoading}
                    />
                    <label htmlFor={item.value}>
                      {item.value} {item.count ? `(${item.count})` : ''}
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        </Accordion>
      </div>
    )
  }

  public renderAttributesItem = (attributesCategory: ICatalogNavigationItem[]) => {
    if (attributesCategory.length === 0) {
      return <div>Not found...</div>
    }
    return attributesCategory.map((attributeCategory: ICatalogNavigationItem, topLevelIndex: number) => {
      return this.renderAttrFilter(attributeCategory, topLevelIndex)
    })
  }

  public getLargestSetOfAttributes = ({
    originalAttributes,
    attributes,
  }: {
    originalAttributes?: ICatalogNavigationItem[]
    attributes: ICatalogNavigationItem[]
  }): ICatalogNavigationItem[] => {
    let originalAttributesCount = 0
    let attributesCount = 0
    let result: ICatalogNavigationItem[] = attributes

    originalAttributes?.forEach((originalAttribute) => {
      originalAttributesCount += originalAttribute?.values?.length
    })

    attributes?.forEach((attribute) => {
      attributesCount += attribute?.values?.length
    })

    if (originalAttributes && originalAttributesCount > attributesCount) {
      result = originalAttributes
    }

    return result
  }

  public render() {
    const { filtersList, originalAttributes, attributes, productsLoading } = this.props
    const activeFiltersCount = filtersList?.length ?? 0
    const largestSetOfAttributes: ICatalogNavigationItem[] = this.getLargestSetOfAttributes({
      originalAttributes,
      attributes,
    })

    let attributesLists = <div>No attribute filters to render...</div>

    if (largestSetOfAttributes.length > 0) {
      attributesLists = <div className={`${css.categories}`}>{this.renderAttributesItem(largestSetOfAttributes)}</div>
    }

    return (
      <div className={`${css.catalogNavigation}`}>
        <div className="hidden-lg hidden-md hidden-sm">
          {productsLoading && <Loading label="Loading Filters. Please Wait…" />}
        </div>

        <div className={css.categoryTopHeader}>Filter By:</div>

        {attributesLists}

        <div className={css.clearFiltersButton}>
          <button
            onClick={() => {
              if (activeFiltersCount) {
                this.onClearFilter('all')
              }
            }}
            disabled={activeFiltersCount === 0}
          >
            Clear All ({activeFiltersCount})
          </button>
          <PrimaryButton additionalClass="hidden-lg hidden-md hidden-sm" type="button" onClick={this.onCloseModal}>
            Apply
          </PrimaryButton>
        </div>
      </div>
    )
  }
}
