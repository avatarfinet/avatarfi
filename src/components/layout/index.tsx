import { Box, Stack } from '@chakra-ui/react'
import SEO from './Seo'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import PageSpinner from './PageSpinner'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const navRef = useRef<any>(null)
  const footerRef = useRef<any>(null)
  const [bodyHeight, setBodyHeight] = useState('0px')
  const [routeLoading, seRouteLoading] = useState(false)

  useLayoutEffect(() => {
    setBodyHeight(
      `${
        window.innerHeight -
        (navRef.current?.clientHeight + footerRef.current?.clientHeight)
      }px`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerHeight, router.isReady])

  useEffect(() => {
    const handleStart = () => seRouteLoading(true)
    const handleComplete = () => seRouteLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale:1, user-scalable=no"
        />
      </Head>
      <SEO />
      <PageSpinner routeLoading={routeLoading} />
      <Box>
        <div ref={navRef}>
          <Navbar />
        </div>
        <Stack
          align={'center'}
          justify={'center'}
          overflow="scroll"
          p={3}
          minH={bodyHeight}
        >
          {children}
        </Stack>
        <div ref={footerRef}>
          <Footer />
        </div>
      </Box>
    </>
  )
}

export default Layout
