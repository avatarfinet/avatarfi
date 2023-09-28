import { useAppSelector, useGetGeckoMarketsQuery } from '@/lib/store'
import { SlideFade, Wrap } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import Market from '../mapItems/Market'
import { AvatarSpinner } from '../ui'

export default function Markets() {
  const dispatch = useDispatch()
  const { sortBy, desc, perPage, page } = useAppSelector(
    (state) => state.comp.indicatorSortPorps
  )
  const editingTrackedGeckoCoins = useAppSelector(
    (state) => state.comp.editingTrackedGeckoCoins
  )
  const selectedGeckoCoins = useAppSelector(
    (state) => state.comp.selectedGeckoCoins
  )
  const trackedGeckoCoins = useAppSelector(
    (state) => state.user.trackedGeckoCoins
  )
  const geckoMarkets = useGetGeckoMarketsQuery({
    ids: trackedGeckoCoins,
    perPage,
    page,
  })

  return (
    <>
      <SlideFade unmountOnExit in={geckoMarkets.isLoading}>
        <AvatarSpinner />
      </SlideFade>
      <SlideFade unmountOnExit in={!geckoMarkets.isLoading}>
        <Wrap spacing={3} align={'center'} justify={'center'} p={3}>
          {(geckoMarkets.data ?? [])
            .slice() // For Strict Mode Only
            .sort((a, b) =>
              /* @ts-ignore */
              desc ? b?.[sortBy] - a?.[sortBy] : a?.[sortBy] - b?.[sortBy]
            )
            .map((i, index) => (
              <Market
                selected={selectedGeckoCoins.includes(i.id)}
                dispatch={dispatch}
                key={index}
                data={i}
                editing={editingTrackedGeckoCoins}
              />
            ))}
        </Wrap>
      </SlideFade>
    </>
  )
}
