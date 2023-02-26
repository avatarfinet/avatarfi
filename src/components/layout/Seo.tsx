import Head from 'next/head'

const { description, title, siteTitle /* twitter */ } = {
  title: 'App',
  siteTitle: 'Avatarfi',
  description: 'Web3 | Monitor | Crypto | Analytics | Sort',
  /* twitter: 'https://mobile.twitter.com/uniposorg', */
}

export default function SEO() {
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta property="type" content="website" />
      <meta property="site_name" content={siteTitle} />
      <meta property="title" content={title} />
      <meta property="image" content={'/avatarfi-logo.svg'} />
      <meta property="description" content={description} />
      {/* OG */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={'/avatarfi-logo.svg'} />
      <meta property="og:description" content={description} />
      {/* <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} /> */}
    </Head>
  )
}
