import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Divider,
  Typography,
  Row,
  Col,
  Select,
  Spin,
  message,
} from 'antd'
import {
  setComp,
  setUser,
  useGetGeckoCoinsListQuery,
  useGetGeckoSearchQuery,
  usePatchUserTrackedGeckoCoinsMutation,
} from '@/lib/store'
import { AvatarSpinner, CWindowedSelect } from './ui'
import Market from './mapItems/Market'

const { Title } = Typography
const { Option } = Select

export default function SearchGeckoCoins() {
  const dispatch = useDispatch()
  const [optSearch, setOptSearch] = useState('0')
  const [isActive, setIsActive] = useState(false)
  const { id } = useSelector((state: RootState) => state.auth)
  const geckoSearchValue = useSelector(
    (state: RootState) => state.comp.geckoSearchValue
  )
  const geckoCoins = useGetGeckoCoinsListQuery({})

  const [patchTrackedGeckoCoins, trackedGeckoCoinsResult] =
    usePatchUserTrackedGeckoCoinsMutation()
  const geckoSearchResults = useGetGeckoSearchQuery(
    { ids: geckoSearchValue.map((i: any) => i.value) },
    {
      skip: !geckoSearchValue.length,
    }
  )

  const TrackResults = () => (
    <Button
      icon={<AvatarSpinner />}
      loading={trackedGeckoCoinsResult.isLoading}
      size={'small'}
      onClick={() => {
        setIsActive(false)
        patchTrackedGeckoCoins({
          id,
          selectedGeckoCoins: geckoSearchValue.map((i: any) => i.value),
          type: 'add',
        })
          .then((res: any) => {
            dispatch(
              setUser({
                trackedGeckoCoins: res.data,
              })
            )
            dispatch(
              setComp({
                geckoSearchValue: [],
              })
            )
          })
          .catch((err: any) => {
            message.error('Failed to track results')
          })
      }}
    >
      Track Results
    </Button>
  )

  const combinedIsLoading =
    trackedGeckoCoinsResult.isLoading || geckoCoins.isLoading
  return (
    <Row justify={'center'} align={'middle'} gutter={16}>
      <Col span={24}>
        <Spin spinning={combinedIsLoading}>
          <Title level={5}>{`Search Gecko Coin's`}</Title>
          <CWindowedSelect
            isMulti
            placeholder="Gecko search..."
            value={geckoSearchValue}
            onInputChange={(e) => setOptSearch(e.charAt(0).toUpperCase())}
            onMenuClose={() => setOptSearch('0')}
            onChange={(e: any) => {
              setIsActive(true)
              dispatch(setComp({ geckoSearchValue: e }))
              !e.length && setIsActive(false)
            }}
            options={(geckoCoins.data?.[optSearch] ?? []).map((x: any) => ({
              label: `${x.symbol.toUpperCase()} / ${x.name}`,
              value: x.id,
            }))}
          />
          <Spin spinning={geckoSearchResults.isLoading}>
            {!geckoSearchResults.isLoading && isActive && (
              <>
                u
                <Divider />
                <Row justify={'space-between'} align={'middle'}>
                  <Title level={5}>Results</Title>
                  {!!id ? (
                    <TrackResults />
                  ) : (
                    <Button size={'small'} href="/login">
                      Login To Track
                    </Button>
                  )}
                </Row>
                <Divider />
                <Row justify={'center'} align={'middle'} gutter={16}>
                  {(geckoSearchResults.data || []).map((item, index) => (
                    <Col key={index}>
                      <Market data={item} />
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Spin>
        </Spin>
      </Col>
    </Row>
  )
}
