import {
  SearchGeckoCoins,
  SortGeckoCoins,
  Markets,
  EditGeckoTrackedCoins,
} from '@/components'
import { HStack, Stack, Wrap } from '@chakra-ui/react'

export default function Info() {
  return (
    <Stack align={'center'}>
      <HStack flexWrap={'wrap'} justify={'center'} gap={3}>
        <EditGeckoTrackedCoins />
        <SearchGeckoCoins />
      </HStack>
      <SortGeckoCoins />
      <Markets />
    </Stack>
  )
}
