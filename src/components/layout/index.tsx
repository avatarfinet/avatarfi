import { Box, Stack } from '@chakra-ui/react'
import SEO from './Seo'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { useLayoutEffect, useRef, useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navRef = useRef<any>(null)
  const footerRef = useRef<any>(null)
  const [bodyHeight, setBodyHeight] = useState('0px')

  useLayoutEffect(() => {
    setBodyHeight(
      `${
        window.innerHeight -
        (navRef.current?.clientHeight + footerRef.current?.clientHeight)
      }px`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    window.innerHeight,
    navRef.current?.clientHeight,
    footerRef.current?.clientHeight,
  ])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale:1, user-scalable=no"
        />
      </Head>
      <SEO />
      <Box>
        <div ref={navRef}>
          <Navbar />
        </div>
        <Stack align={'center'} overflow="scroll" p={3} minH={bodyHeight}>
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
