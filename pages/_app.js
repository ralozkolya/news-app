import { useEffect } from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'

import Navbar from '../components/navbar'
import store from '../redux/store'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap')
  }, [])

  return (
    <Provider store={store}>
      <Head>
        <title>News App</title>
        <meta name="description" content="Technical assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container">
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

export default MyApp
