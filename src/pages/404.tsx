import { Button, Center, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Center gap={3} flex="1">
      <Button as={Link} colorScheme="blue" href="/" variant="outline" size="md">
        Go Home
      </Button>
      <Text fontSize="2xl">404 - Not Found!</Text>
    </Center>
  )
}
