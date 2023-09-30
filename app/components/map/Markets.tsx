import { useAppSelector, useGetGeckoMarketsQuery } from '@/lib/store'
import { Spin, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { AvatarSpinner } from '../ui'
import Market from '../mapItems/Market'

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

  // Replace Chakra-UI Wrap with Ant Design Space
  return (
    <>
      <Spin spinning={geckoMarkets.isLoading} indicator={<AvatarSpinner />}>
        <Space size={3} align={'center'} style={{ padding: 3 }}>
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
        </Space>
      </Spin>
    </>
  )
}
