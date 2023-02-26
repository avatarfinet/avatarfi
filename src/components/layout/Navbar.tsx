import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { TickerMarque } from '@/components'
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ProfileIcon, StockIcon } from '../ui'

export default function Navbar() {
  const location = useRouter()
  const clientLoc = location.pathname
  const { colorMode, toggleColorMode } = useColorMode()
  const shadowColor = useColorModeValue(
    'rgb(125, 125, 125, 0.2)',
    'rgb(250, 250, 250, 0.1)'
  )
  const itemBgColor = useColorModeValue('gray.100', 'whiteAlpha.200')
  const initalColor = colorMode === 'dark' ? 'white' : 'black'
  const auth = useSelector((state: RootState) => state.auth)

  const isLoggedIn = !!auth.id
  const isAdmin = auth.role === 'admin'

  const MapOptions = useMemo(() => {
    const navOptions = ({ size }: { size: number }) => {
      let result: any[] = [
        {
          name: 'home',
          path: '/',
          icon: (
            <StockIcon
              w={size}
              fill={clientLoc === `/` ? 'blue.300' : initalColor}
            />
          ),
        },
      ]
      if (!isLoggedIn) {
        result[4] = {
          path: '/signup',
          icon: <Heading size={'xs'}>Signup</Heading>,
        }
        result[5] = {
          path: '/login',
          icon: <Heading size={'xs'}>Login</Heading>,
        }
      } else {
        result[2] = {
          name: 'profile',
          path: '/profile',
          icon: (
            <ProfileIcon
              w={size}
              fill={clientLoc === `/profile` ? 'blue.300' : initalColor}
            />
          ),
        }
        if (isAdmin)
          result[3] = {
            name: 'panel',
            path: '/panel',
            icon: <Image w={size} aria-label="Panel" src="keypad.svg" />,
          }
      }
      return result
    }

    return navOptions({ size: 6 }).map((x, index) => (
      <Link key={index} href={x.path}>
        <Flex
          flexDirection={'column'}
          align="center"
          color={clientLoc === x.path ? 'blue.300' : initalColor}
          fontWeight={550}
          /* bg={`rgba(255, 255, 255, ${clientLoc === x.path ? '0.3' : '0.08'})`} */
          bg={itemBgColor}
          p={1.5}
          borderRadius="1rem"
        >
          {x.icon}
          {!!x.name && <Text fontSize="xs">{x.name}</Text>}
        </Flex>
      </Link>
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientLoc, isAdmin, isLoggedIn, colorMode])

  return (
    <Stack
      boxShadow={`0 0 10px ${shadowColor}`}
      borderBottom={'1px solid'}
      borderColor={'whiteAlpha.400'}
    >
      <HStack spacing={5} p={2} justify={'center'}>
        <Link href={'/'}>
          <Image w={50} src={'avatarfi-logo.svg'} alt="Avatarfi Logo" />
        </Link>
        <Button size={'sm'} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        {MapOptions}
      </HStack>
      <TickerMarque />
    </Stack>
  )
}
