import { Button, Divider, Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Stack gap={5} align={'center'}>
      <Heading>404 / Page Not Found</Heading>
      <Divider />
      <Button w={250} as={Link} colorScheme="blue" href="/">
        Home
      </Button>
    </Stack>
  )
}
