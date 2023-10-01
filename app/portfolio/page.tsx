'use client'

import { AvatarSpinner } from '@/components'
import { ProtfolioAssets } from '@/components/map/ProtfolioAssets'
import { Results } from '@/components/Results'
import { getUserFields } from '@/lib'
import { useAppSelector, useGetGeckoMarketsQuery } from '@/lib/store'
import { Stack, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export type Prices = { [key: string]: { usd: number; image: string } }

export default function Protfolio() {
  const id = useAppSelector((state) => state.auth.id)
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
    getUserFields({ id, fields: ['portfolio'] }).then(async (res) => {
      const portfolio = (await res.json())?.portfolio ?? []
      setPortfolio(portfolio)
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
        <Stack spacing={5}>
          <Heading>Under Construction...</Heading>
          <AvatarSpinner />
        </Stack>
      )}
    </Stack>
  )
}
