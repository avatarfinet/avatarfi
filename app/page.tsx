'use client'

import {
  SearchGeckoCoins,
  SortGeckoCoins,
  Markets,
  EditGeckoTrackedCoins,
} from '@/components'
import { Space } from 'antd'

export default function Info() {
  return (
    <Space align={'center'}>
      <Space wrap align={'center'} size={3}>
        <EditGeckoTrackedCoins />
        <SearchGeckoCoins />
      </Space>
      <SortGeckoCoins />
      <Markets />
    </Space>
  )
}
