'use client'

import { ProtfolioAssets } from '@/components/map/ProtfolioAssets'
import { Results } from '@/components/Results'
import { getUserFields } from '@/lib'
import { useGetGeckoMarketsQuery } from '@/lib/store'
import { Stack, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export type Prices = { [key: string]: { usd: number; image: string } }

/* const portfolio = [
  {
    value: 'benqi',
    label: 'QI',
    ticker: 'QI',
    uid: 'QIkuxxxmnz',
    amount: 2516,
    date: '2021-10-19',
    price: 0,
    isBuy: true,
    entryPrice: 0.1963,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    comRate: '15',
  },
  {
    value: 'benqi',
    label: 'QI',
    ticker: 'QI',
    uid: 'QIkuiapun0',
    amount: 7763,
    date: '2021-10-08',
    price: 0.1288,
    isBuy: false,
    entryPrice: 0.1963,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    comRate: '7',
  },
  {
    value: 'avalanche-2',
    label: 'AVAX',
    ticker: 'AVAX',
    uid: 'AVAXktpseek3',
    amount: 140,
    date: '2021-09-18',
    price: 72,
    isBuy: false,
    entryPrice: 72,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    comRate: '7',
  },
  {
    value: 'onx-finance',
    label: 'Onx.finance',
    ticker: 'ONX',
    uid: 'ONXklc8kh5x',
    amount: 121,
    date: '2021-02-19',
    price: 7.35,
    isBuy: false,
    entryPrice: 4.23,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
  },
  {
    value: 'onx-finance',
    label: 'Onx.finance',
    ticker: 'ONX',
    uid: 'ONXkkp7qp1h',
    amount: 243,
    date: '2021-02-03',
    price: 4.23,
    isBuy: true,
    entryPrice: null,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    isEntry: true,
  },
  {
    value: 'ethereum',
    label: 'Ethereum',
    ticker: 'ETH',
    uid: 'ETHklcbqq6d',
    amount: 0.2303,
    date: '2021-02-19',
    price: 1931.27,
    isBuy: true,
    entryPrice: null,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    isEntry: true,
  },
  {
    value: 'avalanche-2',
    label: 'Avax',
    ticker: 'AVAX',
    uid: 'AVAXklcbqd5q',
    amount: 10.975308642,
    date: '2021-02-19',
    price: 40.5,
    isBuy: true,
    entryPrice: null,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    isEntry: true,
  },
  {
    value: 'avalanche-2',
    label: 'AVAX',
    ticker: 'AVAX',
    uid: 'AVAXktps0cqf',
    amount: 140,
    date: '2021-09-18',
    price: 72,
    isBuy: true,
    entryPrice: 40.5,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    comRate: '7',
    isEntry: false,
  },
  {
    value: 'benqi',
    label: 'QI',
    ticker: 'QI',
    uid: 'QIktpsewn5',
    amount: 24128,
    date: '2021-09-18',
    price: 0.2089,
    isBuy: true,
    entryPrice: null,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    comRate: '7',
    isEntry: true,
  },
  {
    value: 'benqi',
    label: 'QI',
    ticker: 'QI',
    uid: 'QIktrdgsle',
    amount: 27027.027,
    date: '2021-09-19',
    price: 0.185,
    isBuy: true,
    entryPrice: 0.2089,
    comStatus: 'notPaid',
    isHedge: true,
    createdBy: '5ff051e764112773c25b6206',
    comRate: '7',
    isEntry: true,
  },
] */

export default function Protfolio() {
  const id = useSelector((state: RootState) => state.auth.id)
  const [portfolio, setPortfolio] = useState<any[]>([])
  // @ts-ignore
  const uniqueVals = [...new Set(portfolio.map?.((item) => item.value))]

  const geckoMarkets = useGetGeckoMarketsQuery({
    ids: uniqueVals,
  })

  const prices: Prices = geckoMarkets.data?.reduce((map: any, obj) => {
    map[obj.id] = {
      usd: obj.current_price,
      image: obj.image,
    }
    return map
  }, {})

  useEffect(() => {
    getUserFields({ id, fields: ['portfolio'] }).then((res) => {
      setPortfolio(res.data.portfolio)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack>
      {!!portfolio && portfolio.length ? (
        <>
          {' '}
          <Results
            isLoading={geckoMarkets.isFetching}
            portfolio={portfolio}
            prices={prices}
          />
          <ProtfolioAssets
            isLoading={geckoMarkets.isFetching}
            prices={prices}
            portfolio={portfolio}
          />
        </>
      ) : (
        <Heading>Nothing to show</Heading>
      )}
    </Stack>
  )
}
