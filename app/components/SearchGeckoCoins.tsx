import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Divider,
  SlideFade,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import {
  setComp,
  setUser,
  useGetGeckoCoinsListQuery,
  useGetGeckoSearchQuery,
  usePatchUserTrackedGeckoCoinsMutation,
} from '@/lib/store'
import { AvatarSpinner, CWindowedSelect } from './ui'
import Market from './mapItems/Market'
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

  const TrackResults = () => (
    <Button
      spinner={<AvatarSpinner />}
      isLoading={trackedGeckoCoinsResult.isLoading}
      size={'xs'}
      onClick={() => {
        setIsActive(false)
        patchTrackedGeckoCoins({
          id,
          selectedGeckoCoins: geckoSearchValue.map((i: any) => i.value),
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
        })
      }}
    >
      Track Results
    </Button>
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
      <SlideFade unmountOnExit in={combinedIsLoading}>
        <AvatarSpinner />
      </SlideFade>
      <SlideFade unmountOnExit in={!combinedIsLoading}>
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
            !e.length && setIsActive(false)
          }}
          options={(geckoCoins.data?.[optSearch] ?? []).map((x: any) => ({
            label: `${x.symbol.toUpperCase()} / ${x.name}`,
            value: x.id,
          }))}
        />
        <SlideFade unmountOnExit in={geckoSearchResults.isLoading}>
          <AvatarSpinner />
        </SlideFade>
        <SlideFade unmountOnExit in={!geckoSearchResults.isLoading && isActive}>
          <Stack>
            <Divider />
            <HStack justify={'space-between'}>
              <Heading size={'xs'}>Results</Heading>
              {!!id ? (
                <TrackResults />
              ) : (
                <Button size={'xs'} as={Link} href="/login">
                  Login To Track
                </Button>
              )}
            </HStack>
            <Divider />
          </Stack>
          <Wrap align={'center'} justify={'center'} spacing={3} pt={3}>
            {(geckoSearchResults.data || []).map((item, index) => (
              <Market key={index} data={item} />
            ))}
          </Wrap>
        </SlideFade>
      </SlideFade>
    </Stack>
  )
}
