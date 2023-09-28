import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientProviders from './client.providers'
import RootClientLayout from './client.layout'
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
        <ClientProviders>
          <RootClientLayout>{children}</RootClientLayout>
        </ClientProviders>
      </body>
    </html>
  )
}

export default RootLayout
