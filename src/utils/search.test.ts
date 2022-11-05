import { removeValueFromQueryObject } from './search'

describe('removeValueFromQueryObject', () => {
  it('removes a key from a multiple filter with inclusive ones applied', () => {
    const key = 'brand_attribute'
    const value = 'Dansko'
    const testObject = {
      filter: ['(color_uFilter:"Blue" OR color_uFilter:"Black Floral")', '(brand_attribute_uFilter:"Dansko")'],
      q: 'shoe',
    }

    const expectedResult = {
      filter: ['(color_uFilter:"Blue"%20OR%20color_uFilter:"Black Floral")'],
      q: 'shoe',
    }

    const resultObject = removeValueFromQueryObject(testObject, key, value)

    expect(resultObject).toEqual(expectedResult)
  })

  it('removes a key one of the inclusive filters applied but not match partial strings', () => {
    const key = 'color'
    const value = 'Black'
    const testObject = {
      filter: [
        '(color_uFilter:"Black" OR color_uFilter:"Blue" OR color_uFilter:"Black Floral")',
        '(brand_attribute_uFilter:"Dansko")',
      ],
      q: 'shoe',
    }

    const expectedResult = {
      filter: ['(color_uFilter:"Blue"%20OR%20color_uFilter:"Black Floral")', '(brand_attribute_uFilter:"Dansko")'],
      q: 'shoe',
    }

    const resultObject = removeValueFromQueryObject(testObject, key, value)

    expect(resultObject).toEqual(expectedResult)
  })

  it('removes a key one of the inclusive filters applied', () => {
    const key = 'color'
    const value = 'Blue'
    const testObject = {
      filter: ['(color_uFilter:"Blue" OR color_uFilter:"Black Floral")', '(brand_attribute_uFilter:"Dansko")'],
      q: 'shoe',
    }

    const expectedResult = {
      filter: ['(color_uFilter:"Black Floral")', '(brand_attribute_uFilter:"Dansko")'],
      q: 'shoe',
    }

    const resultObject = removeValueFromQueryObject(testObject, key, value)

    expect(resultObject).toEqual(expectedResult)
  })

  it('removes a key from a multiple filter applied', () => {
    const key = 'brand_attribute'
    const value = 'Dansko'
    const testObject = {
      filter: ['(color_uFilter:"Blue")', '(brand_attribute_uFilter:"Dansko")'],
      q: 'shoe',
    }

    const expectedResult = {
      filter: ['(color_uFilter:"Blue")'],
      q: 'shoe',
    }

    const resultObject = removeValueFromQueryObject(testObject, key, value)

    expect(resultObject).toEqual(expectedResult)
  })

  it('removes a key from a single filter applied', () => {
    const key = 'brand_attribute'
    const value = 'Dansko'
    const testObject = {
      filter: '(brand_attribute_uFilter:"Dansko")',
      q: 'shoe',
    }

    const expectedResult = {
      q: 'shoe',
    }

    const resultObject = removeValueFromQueryObject(testObject, key, value)

    expect(resultObject).toEqual(expectedResult)
  })
})
