const sum = (list) => list.reduce((a, b) => a + b, 0)
const buyOrders = (orders) => orders.filter((x) => x.isBuy)
const comPaid = (orders) => orders.filter((x) => !x.comPaid)
const sellOrders = (orders) => orders.filter((x) => !x.isBuy)

export const statusWidgetCalc = (portfolio) => {
  const tickers = Object.fromEntries(
    portfolio.map((x) => [x.ticker, { value: x.value, label: x.label }])
  )

  return Object.entries(tickers).map(([ticker, x]) => {
    const tickerPortfolio = portfolio.filter((x) => x.ticker === ticker)
    const totalBuy = sum(buyOrders(tickerPortfolio).map((x) => x.amount))
    const totalSell = sum(sellOrders(tickerPortfolio).map((x) => x.amount))

    const weightedAverage =
      sum(buyOrders(comPaid(tickerPortfolio)).map((x) => x.price * x.amount)) /
      sum(buyOrders(comPaid(tickerPortfolio)).map((x) => x.amount))
    return {
      value: x.value,
      label: x.label,
      ticker,
      amount: totalBuy - totalSell,
      price: weightedAverage,
    }
  })
}

//Live status update
export const portStatusCalc = (rData) => {
  let portfolio = rData.portfolio
  let obj = rData.prices
  var pricesToArr = []
  for (let key in obj) {
    pricesToArr.push(Object.assign(obj[key], { value: key }))
  }
  let currentTotalMap = []
  for (let i of portfolio) {
    for (let j of pricesToArr) {
      if (j.value === i.value && i.isBuy) {
        currentTotalMap.push({
          price: j.usd,
          amount: i.amount,
        })
      }
    }
  }
  let currentTotalDecMap = []
  for (let s of sellOrders(portfolio)) {
    for (let j of pricesToArr) {
      if (j.value === s.value) {
        currentTotalDecMap.push({
          price: j.usd,
          amount: s.amount,
        })
      }
    }
  }

  let fundingCalc = buyOrders(portfolio).reduce(
    (total, item) => total + item.amount * item.price,
    0
  )
  let fundingDec = sellOrders(portfolio).reduce(
    (total, item) => total + item.amount * item.entryPrice,
    0
  )
  let currentCalc = currentTotalMap.reduce(
    (total, item) => total + item.amount * item.price,
    0
  )
  let currentDec = currentTotalDecMap.reduce(
    (total, item) => total + item.amount * item.price,
    0
  )
  let entryCalc = portfolio
    .filter((f) => f.isEntry)
    .reduce((total, item) => total + item.amount * item.price, 0)

  let profitTaken = sellOrders(portfolio).reduce(
    (total, item) =>
      total + (item.amount * item.price - item.amount * item.entryPrice),
    0
  )
  let realizedLp = profitTaken
  let fundingTotal =
    fundingCalc - fundingDec + (profitTaken <= 0 ? -1 * profitTaken : 0)
  let currentTotal = currentCalc - currentDec
  let unRealizedCalc =
    currentTotal - fundingTotal + (profitTaken <= 0 ? -1 * profitTaken : 0)
  let unrealizedLp = unRealizedCalc
  let entryTotal = realizedLp <= 0 ? entryCalc : entryCalc - realizedLp
  return {
    entryCalc: entryCalc,
    entryTotal: entryTotal,
    currentTotal: currentTotal,
    unrealizedLp: unrealizedLp,
    realizedLp: realizedLp,
    fundingTotal: fundingTotal,
  }
}
