import { setIndicatorSortPorps, useAppSelector } from '@/lib/store'
import { Button, Switch, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { Pagination } from './ui'

const { Title, Text } = Typography

export default function SortGeckoCoins() {
  const dispatch = useDispatch()
  const indicatorSortPorps = useAppSelector(
    (state) => state.comp.indicatorSortPorps
  )
  const trackedGeckoCoinsLength = useAppSelector(
    (state) => state.user.trackedGeckoCoins?.length
  )
  const { sortBy, perPage, page, desc } = indicatorSortPorps
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
        <Title level={5} style={{ margin: 0, marginRight: '12px' }}>
          Sort by
        </Title>
        {[
          { title: 'Market Cap', value: 'market_cap' },
          {
            title: '1h Change',
            value: 'price_change_percentage_1h_in_currency',
          },
          {
            title: '24h Change',
            value: 'price_change_percentage_24h_in_currency',
          },
          {
            title: '7dh Change',
            value: 'price_change_percentage_7d_in_currency',
          },
          { title: '24h Volume', value: 'total_volume' },
          { title: 'Max Supply', value: 'max_supply' },
          { title: 'Circ Supply', value: 'total_supply' },
        ].map((i) => (
          <div key={i.value} style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type={sortBy === i.value ? 'primary' : 'default'}
              size={'small'}
              onClick={() =>
                dispatch(
                  setIndicatorSortPorps({
                    sortBy: i.value,
                  })
                )
              }
            >
              {i.title}
            </Button>
            <Title
              level={5}
              style={{ margin: 0, marginLeft: '12px', marginRight: '12px' }}
            >
              |
            </Title>
          </div>
        ))}
        <Text>Reverse</Text>
        <Switch
          checked={!desc}
          onChange={() => dispatch(setIndicatorSortPorps({ desc: !desc }))}
          size="small"
        />
      </div>
      <Pagination
        total={trackedGeckoCoinsLength || 50}
        perPage={perPage}
        page={page}
        setPage={(page) => {
          dispatch(setIndicatorSortPorps({ page: page }))
        }}
        setPerPage={(perPage) => {
          dispatch(
            setIndicatorSortPorps({
              perPage: perPage,
              page: 1,
            })
          )
        }}
      />
    </>
  )
}
