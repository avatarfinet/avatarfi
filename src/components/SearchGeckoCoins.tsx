import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import {
  geckoApi,
  setComp,
  setUser,
  useGetGeckoCoinsListQuery,
  useGetGeckoSearchQuery,
  usePatchUserTrackedGeckoCoinsMutation,
} from '@/store'
import { CWindowedSelect } from './ui'
import Indicator from './mapItems/Indicator'
import Link from 'next/link'

export default function SearchGeckoCoins() {
  const dispatch = useDispatch()
  const [optSearch, setOptSearch] = useState('0')
  const [isActive, setIsActive] = useState(false)
  const { id } = useSelector((state: RootState) => state.auth)
  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.05)',
    'rgb(250, 250, 250, 0.05)'
  )
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

  const combinedIsLoading =
    trackedGeckoCoinsResult.isLoading || geckoCoins.isLoading
  return (
    <Stack
      justify={'center'}
      p={3}
      spacing={2}
      boxShadow={`0px 0px 4px 4px ${shadowColor}`}
      border={'1px solid'}
      borderColor={'whiteAlpha.400'}
      borderRadius={10}
    >
      {combinedIsLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading size={'xs'}>{`Search Gecko Coin's`}</Heading>
          <CWindowedSelect
            isMulti
            placeholder="Gecko search..."
            value={geckoSearchValue}
            onInputChange={(e) => setOptSearch(e.charAt(0).toUpperCase())}
            onMenuClose={() => setOptSearch('0')}
            onChange={(e: any) => {
              setIsActive(true)
              dispatch(setComp({ geckoSearchValue: e }))
            }}
            options={(geckoCoins.data?.[optSearch] ?? []).map((x: any) => ({
              label: `${x.symbol.toUpperCase()} / ${x.name}`,
              value: x.id,
            }))}
          />
          {geckoSearchResults.isLoading ? (
            <Spinner alignSelf={'center'} />
          ) : (
            isActive && (
              <>
                <Stack justify={'center'}>
                  <Divider />
                  <HStack justify={'space-between'}>
                    <Heading size={'xs'}>Results</Heading>
                    {!!id ? (
                      <Button
                        isLoading={trackedGeckoCoinsResult.isLoading}
                        size={'xs'}
                        onClick={() => {
                          patchTrackedGeckoCoins({
                            id,
                            selectedGeckoCoins: geckoSearchValue.map(
                              (i: any) => i.value
                            ),
                            type: 'add',
                          }).then((res: any) => {
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
                            setIsActive(false)
                          })
                        }}
                      >
                        Track Results
                      </Button>
                    ) : (
                      <Button size={'xs'} as={Link} href="/login">
                        Login To Track
                      </Button>
                    )}
                  </HStack>
                  <Divider />
                </Stack>
                <Wrap p={1} align={'center'} justify={'center'}>
                  {geckoSearchResults.isSuccess &&
                    geckoSearchResults.data.map((item, index) => (
                      <Indicator key={index} data={item} />
                    ))}
                </Wrap>
              </>
            )
          )}
        </>
      )}
    </Stack>
  )
}
