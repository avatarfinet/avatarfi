import Head from 'next/head'

const { description, title, siteName, keywords } = {
  title: 'App',
  siteName: 'Avatarfi',
  description: 'Web3 | Monitor | Crypto | Analytics | Sort',
  keywords: 'Web3, Crypto, Trade, Monitor, Bridge, Aggregate',
}

const metas = [
  { name: 'type', content: 'website' },
  { name: 'title', content: `${title}` },
  { name: 'site_name', content: `${siteName}` },
  { name: 'image', content: '/avatarfi-logo.svg' },
  { name: 'description', content: `${description}` },
  { name: 'keywords', content: `${keywords}` },
]

export default function SEO() {
  return (
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <title>{`${title} | ${siteName}`}</title>
      {/* NORMAL */}
      {metas.map((i, index) => (
        <meta key={index} name={i.name} content={i.content} />
      ))}
      {/* OG */}
      {metas.map((i, index) => (
        <meta key={index} name={`'og:${i.name}`} content={i.content} />
      ))}
      {/* ICONS */}
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#000000" />
    </Head>
  )
}
