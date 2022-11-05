export const splitMultiFilter = (queryFilter: string): string[] => {
  let parsedFilter: string = queryFilter.replace(/^\(+/, '')
  if (parsedFilter.substr(-1) === ')') {
    parsedFilter = parsedFilter.substr(0, parsedFilter.length - 1)
  }
  const multipleFilters: string[] = parsedFilter.split(' OR ')

  return multipleFilters
}

export const removeValueFromFilterArray = (filter: string[], key?: string, value?: string): string[] => {
  let queryObjectFilter = filter.map((queryFilter: string) => {
    return removeValueFromFilterString(queryFilter, key, value).replace(/\+/g, '%2B')
  })

  // Cleaning the filters to prevent empty `filter=` sentences in the url
  queryObjectFilter = queryObjectFilter.filter((element: string) => {
    return element !== null && element !== ''
  })

  return queryObjectFilter
}

export const removeValueFromFilterString = (filter: string, key?: string, value?: string): string => {
  let _queryObjectFilter: string[] = splitMultiFilter(filter)
  let queryObjectFilter = ''

  // If there is only one filter in this category
  if (_queryObjectFilter.length === 1 && key) {
    const queryValue = _queryObjectFilter[0].split(/:(.+)/)[1]
    // If the value/key is in the only filter, we remove the entire filter category
    if (value && queryValue === `"${value}"`) {
      return ''
    }

    return `(${_queryObjectFilter[0]})`
  } else {
    // If there are multiple values, we filter those who are not in the selected filter to be removed
    _queryObjectFilter = _queryObjectFilter.map((query: string) => {
      const queryValue = query.split(/:(.+)/)[1]
      if (value && queryValue === `"${value}"`) {
        return ''
      }
      return query
    })

    // Cleaning the filters to prevent white spaces
    _queryObjectFilter = _queryObjectFilter.filter((element: string) => {
      return element !== null && element !== ''
    })

    // Join everything again with `OR` and wrapping it in `()`
    queryObjectFilter = _queryObjectFilter.length ? `(${_queryObjectFilter.join('%20OR%20')})` : ''
  }

  return queryObjectFilter
}

export const buildInclusiveFilter = (queryObjectFilter: string[]): string[] => {
  const filterObject: { [x: string]: string[] } = {}
  const inclusiveFilters: string[] = []

  queryObjectFilter.forEach((filter: string) => {
    // removes the previosly added `()` to allow OR searchs
    let parsedFilter = filter.replace(/^\(+/, '').replace(/\+/g, '%2B')

    if (parsedFilter.substr(-1) === ')') {
      parsedFilter = parsedFilter.substr(0, parsedFilter.length - 1)
    }
    const [filterKey] = parsedFilter.split(':')

    if (filterObject[filterKey]) {
      filterObject[filterKey].push(parsedFilter)
    } else {
      filterObject[filterKey] = [parsedFilter]
    }
  })

  Object.keys(filterObject).forEach((filterKey: string) => {
    inclusiveFilters.push(filterObject[filterKey].join('%20OR%20'))
  })

  // adds the `()` to allow OR searchs
  return inclusiveFilters.map((filter: string) => `(${filter})`)
}

export const removeValueFromQueryObject = (queryObject: any, key: string, value?: string): any => {
  if (queryObject?.filter) {
    if (key !== 'all') {
      if (Array.isArray(queryObject.filter)) {
        queryObject.filter = removeValueFromFilterArray(queryObject.filter, key, value)
      } else if (typeof queryObject.filter === 'string') {
        const queryObjectFilter = removeValueFromFilterString(queryObject.filter, key, value).replace(/\+/g, '%2B')

        if (!queryObjectFilter) {
          delete queryObject?.filter
        } else {
          queryObject.filter = queryObjectFilter
        }
      }
    } else {
      delete queryObject?.filter
    }
  }

  return queryObject
}

// the unbxd API cannot handle the plus sign so we must encode it first
export const encodeSpecialChars = (queryObject: any): any => {
  if (queryObject?.filter) {
    if (Array.isArray(queryObject.filter)) {
      queryObject.filter = queryObject.filter.map((f: string) => f.replace(/\+/g, '%2B'))
    } else {
      queryObject.filter = queryObject.filter.replace(/\+/g, '%2B')
    }
  }
  return queryObject
}
