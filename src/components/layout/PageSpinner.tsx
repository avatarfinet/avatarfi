import { themeColors } from '@/utils/theme'
import { Image, Slide, useColorModeValue } from '@chakra-ui/react'

export default function PageSpinner({
  routeLoading,
}: {
  routeLoading: boolean
}) {
  const bgColor = useColorModeValue(themeColors.bg.light, themeColors.bg.dark)
  return (
    <Slide
      in={routeLoading}
      direction={'top'}
      style={{
        transitionDuration: '0.5s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        width: '100vw',
        height: '100vh',
        backgroundColor: bgColor,
      }}
    >
      <Image h={300} src={'/avatarfi-spinner.gif'} alt={'avatarfi-spinner'} />
    </Slide>
  )
}
