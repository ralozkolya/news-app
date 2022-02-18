import { useEffect } from 'react'
import Head from 'next/head'

import Navbar from '../components/navbar'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return (
    <>
      <Head>
        <title>News App</title>
        <meta name="description" content="Technical assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
