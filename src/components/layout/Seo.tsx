import Head from 'next/head'

const { description, title, siteTitle /* twitter */ } = {
  title: 'App',
  siteTitle: 'Avatarfi',
  description: 'Avatarfi | Monitor | Crypto | Analytics',
  /* twitter: 'https://mobile.twitter.com/uniposorg', */
}

export default function SEO() {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta property="og:image" content={'/avatar-logo-solid.png'} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      {/* <meta property="twitter:creator" content={twitter} /> */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  )
}
