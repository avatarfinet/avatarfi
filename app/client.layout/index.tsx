'use client'

import Link from 'next/link'
import { Button, Layout, Space, Image } from 'antd'
import { TickerMarque } from '@/components'
import { useAppSelector } from '@/lib/store'
import {
  StockOutlined,
  UserOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const layoutStyle: React.CSSProperties = {
  height: '100vh',
  width: '100vw',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'inherit',
  height: 'max-content',
  padding: '10px 30px 10px 30px',
  boxShadow: '0 0 10px 0 rgba(0,0,0,.1)',
  justifyContent: 'space-between',
}

const contentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  padding: 50,
}

const footerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 5,
  padding: 20,
  boxShadow: '0 0 10px 0 rgba(0,0,0,.1)',
  justifyContent: 'center',
}

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout style={layoutStyle}>
      <Navbar />
      <Layout.Content style={contentStyle}>{/* {children} */}</Layout.Content>
      {/* <Footer /> */}
    </Layout>
  )
}

function Navbar() {
  const clientLoc = usePathname()
  const auth = useAppSelector((state) => state.auth)

  const isLoggedIn = !!auth.id
  const isAdmin = auth.role === 'admin'

  const MapOptions = useMemo(() => {
    const navOptions = ({ size }: { size: number }) => {
      let result: any[] = [
        {
          name: 'markets',
          path: '/',
          icon: <StockOutlined />,
        },
      ]
      if (!isLoggedIn) {
        result[4] = {
          path: '/signup',
          name: 'Signup',
        }
        result[5] = {
          path: '/login',
          name: 'Login',
        }
      } else {
        result[3] = {
          name: 'profile',
          path: '/profile',
          icon: <UserOutlined />,
        }
        result[2] = {
          name: 'portfolio',
          path: '/portfolio',
          icon: <PieChartOutlined />,
        }
        if (isAdmin)
          result[4] = {
            name: 'panel',
            path: '/panel',
            icon: <Image width={size} preview={false} src="keypad.svg" />,
          }
      }
      return result
    }

    return navOptions({ size: 20 }).map((x, index) => (
      <Button key={index} icon={x.icon} href={x.path} size="small">
        {x.name}
      </Button>
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientLoc, isAdmin, isLoggedIn])

  return (
    <Layout.Header style={headerStyle}>
      <Space wrap size={10} className="jc-sb">
        <Link href={'/'}>
          <Image
            src={'avatarfi-logo.svg'}
            width={50}
            preview={false}
            alt="Avatarfi Logo"
          />
        </Link>
        <Button size={'small'} onClick={() => {}}>
          {true ? 'Dark' : 'Light'}
        </Button>
        <Space wrap size={10}>
          {MapOptions}
        </Space>
      </Space>
      <TickerMarque />
    </Layout.Header>
  )
}

function Footer() {
  return (
    <Layout.Footer style={footerStyle}>
      <Space
        style={{
          padding: 3,
          border: '1px solid',
          borderRadius: 10,
        }}
      >
        <Link
          href="https://t.me/avatar_finance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            <b>Telegram </b>@avatar_finance
          </p>
        </Link>
        <Link
          href="https://t.me/avatar_finance_tr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            <b>Telegram Tr </b>@avatar_finance_tr
          </p>
        </Link>
      </Space>
    </Layout.Footer>
  )
}
