module.exports = (product) => {
  const priceArray = []
  const { ourPrice, salePrice, mapEnforced, map } = product
  if (mapEnforced && map) {
    const numMap = parseFloat(map)
    return numMap
  }
  // if (price) {
  //   priceArray.push(price)
  // }
  if (ourPrice) {
    priceArray.push(ourPrice)
  }
  if (salePrice) {
    priceArray.push(salePrice)
  }
  const smallestPrice = Math.min(...priceArray)
  return smallestPrice
}
