import TvWidgets from '../components/map/TvWidgets'

import {
  SearchGeckoCoins,
  SortGeckoCoins,
  Indicators,
  EditGeckoTrackedCoins,
} from '@/components'
import { HStack, Stack, Wrap } from '@chakra-ui/react'

export default function Info() {
  return (
    <Stack align={'center'}>
      <HStack flexWrap={'wrap'} justify={'center'} spacing={3}>
        <EditGeckoTrackedCoins />
        <SearchGeckoCoins />
      </HStack>
      <SortGeckoCoins />
      <Indicators />
      {/* <TvWidgets /> */}
    </Stack>
  )
}
