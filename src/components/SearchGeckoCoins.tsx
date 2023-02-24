import { useRef, useState } from 'react'
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
import { setComp, setUser, useGetGeckoCoinsListQuery } from '@/store'
import { CWindowedSelect } from './ui'
import Indicator from './mapItems/Indicator'
import {
  getGeckoMarketSearch,
  patchUserField,
  PATCH_ADD_USER_TRACKED_GECKO_COINS,
} from '@/lib'
import isEmpty from 'is-empty'
import Link from 'next/link'

export default function SearchGeckoCoins() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [resultIsLoading, setResultIsLoading] = useState(false)
  const { id } = useSelector((state: RootState) => state.auth)
  const { geckoSearchValue, geckoSearchResult } = useSelector(
    (state: RootState) => state.comp
  )
  const geckoCoins = useGetGeckoCoinsListQuery({})
  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.05)',
    'rgb(250, 250, 250, 0.05)'
  )

  const [optSearch, setOptSearch] = useState('0')

  const combinedIsLoading = isLoading || geckoCoins.isLoading
  return (
    <Stack
      w={'max-content'}
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
              dispatch(setComp({ geckoSearchValue: e }))
              !isEmpty(e)
                ? (setResultIsLoading(true),
                  getGeckoMarketSearch(e.map((i: any) => i.value)).then(
                    (res) => {
                      dispatch(setComp({ geckoSearchResult: res.data }))
                      setResultIsLoading(false)
                    }
                  ))
                : dispatch(setComp({ geckoSearchResult: [] }))
            }}
            options={(geckoCoins.data?.[optSearch] ?? []).map((x: any) => ({
              label: `${x.symbol.toUpperCase()} / ${x.name}`,
              value: x.id,
            }))}
          />
          {resultIsLoading ? (
            <Spinner alignSelf={'center'} />
          ) : (
            !isEmpty(geckoSearchResult) && (
              <>
                <Stack justify={'center'}>
                  <Divider />
                  <HStack justify={'space-between'}>
                    <Heading size={'xs'}>Results</Heading>
                    {!!id ? (
                      <Button
                        size={'xs'}
                        onClick={() => {
                          setIsLoading(true)
                          patchUserField({
                            id,
                            actionType: PATCH_ADD_USER_TRACKED_GECKO_COINS,
                            field: 'trackedGeckoCoins',
                            value: geckoSearchValue.map((i: any) => i.value),
                          }).then((res) => {
                            dispatch(
                              setUser({
                                trackedGeckoCoins: res.data.trackedGeckoCoins,
                              })
                            )
                            dispatch(
                              setComp({
                                geckoSearchValue: [],
                                geckoSearchResult: [],
                              })
                            )
                            setIsLoading(false)
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
                  {geckoSearchResult.map((item, index) => (
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
