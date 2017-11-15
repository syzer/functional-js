const stockPricesYesterday = [10, 7, 5, 8, 11, 9] // 5 , 11
const stockPricesYesterday2 = [10, 7, 5, 8, 11, 0, 9] // 0 , 9
const stockPricesYesterday3 = [10, 7, 5, 8, 11, 9, 0] // 5 , 11

// getMaxProfit(stockPricesYesterday);
// returns 6 (buying for $5 and selling for $11)

const getMaxProfit = (arr) => arr.reduce((acc, curr) => {
  if (acc.low > curr) {
    acc.low = curr
  }
  if (acc.high < curr) {
    acc.high = curr
  }
  return {
    low: acc.low,
    high: acc.high,
    earn: acc.high - acc.low
  }
}, {
  low: arr[0],
  high: arr[1],
  earn: arr[1] - arr[0],
})

getMaxProfit(stockPricesYesterday3)
