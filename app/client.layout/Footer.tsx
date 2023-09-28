import { HStack, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'

export default function Footer() {
  const bgColor = useColorModeValue(
    'rgb(125, 125, 125, 0.2)',
    'rgb(250, 250, 250, 0.1)'
  )
  return (
    <HStack
      fontSize={10}
      spacing={5}
      boxShadow={`0 0 10px ${bgColor}`}
      borderTop={'1px solid'}
      borderColor={'whiteAlpha.400'}
      p={4}
      justify={'center'}
    >
      <Stack
        p={3}
        boxShadow={`0 0 10px ${bgColor}`}
        border={'1px solid'}
        borderColor={'whiteAlpha.400'}
        borderRadius={10}
      >
        <Link
          href="https://t.me/avatar_finance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text>
            <b>Telegram </b>@avatar_finance
          </Text>
        </Link>
        <Link
          href="https://t.me/avatar_finance_tr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text>
            <b>Telegram Tr </b>@avatar_finance_tr
          </Text>
        </Link>
      </Stack>
      <Image
        p={1}
        borderRadius={30}
        backgroundColor={'green.100'}
        h={46}
        src={'coingecko.svg'}
        alt="Gecko Logo"
      />
    </HStack>
  )
}
