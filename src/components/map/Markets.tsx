import { useGetGeckoMarketsQuery } from '@/store'
import { SlideFade, Spinner, Wrap } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Market from '../mapItems/Market'
import { AvatarSpinner } from '../ui'

export default function Markets() {
  const dispatch = useDispatch()
  const { sortBy, desc, perPage, page } = useSelector(
    (state: RootState) => state.comp.indicatorSortPorps
  )
  const editingTrackedGeckoCoins = useSelector(
    (state: RootState) => state.comp.editingTrackedGeckoCoins
  )
  const selectedGeckoCoins = useSelector(
    (state: RootState) => state.comp.selectedGeckoCoins
  )
  const trackedGeckoCoins = useSelector(
    (state: RootState) => state.user.trackedGeckoCoins
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
