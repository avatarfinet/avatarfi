'use client'

import AntDesignProvider from './AntDesignProvider'
import AppProvider from './appContext'
import ReduxProvider from '@/lib/store/ReduxProvider'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <AntDesignProvider>
        <AppProvider>{children}</AppProvider>
      </AntDesignProvider>
    </ReduxProvider>
  )
}

export * from './appContext'
