'use client'

import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ConfigProvider } from 'antd'
import theme from '@/lib/themeConfig'

export default function AntDesignProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={{ ...theme }}>{children}</ConfigProvider>
    </StyledComponentsRegistry>
  )
}
