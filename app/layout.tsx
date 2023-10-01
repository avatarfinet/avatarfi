import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Stack, Box } from '@chakra-ui/react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Providers from './providers'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

const { description, title, applicationName, images } = {
  title: 'App',
  applicationName: 'Avatarfi',
  description: 'Web3 | Monitor | Crypto | Analytics | Sort',
  images: [
    {
      url: '/avatarfinet/media/main/avatarfi-logo.png',
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://raw.githubusercontent.com'),
  title,
  applicationName,
  description: 'Web3 | Monitor | Crypto | Analytics | Sort',
  openGraph: {
    type: 'website',
    title,
    siteName: applicationName,
    description,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title: applicationName,
    description,
    images,
  },
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box>
            <Navbar />
            <Stack
              align={'center'}
              justify={'center'}
              overflow="scroll"
              p={3}
              minH={'calc(100vh - 100px)'}
            >
              {children}
            </Stack>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
