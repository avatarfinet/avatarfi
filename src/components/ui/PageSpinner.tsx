import { Center, ChakraProps, Image } from '@chakra-ui/react'

export default function PageSpinner({ ...props }: ChakraProps) {
  return (
    <Center w={'100vw'} h={'100vh'} {...props}>
      <Image h={300} src={'/avatarfi-spinner.gif'} alt={'avatarfi-spinner'} />
    </Center>
  )
}
