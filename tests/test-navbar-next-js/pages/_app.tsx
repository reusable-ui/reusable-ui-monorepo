import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@cssfn/cssfn-dom' // side effect for cssfn
import { ensureRendererWorkersReady } from '@cssfn/cssfn'
const _loaded = await ensureRendererWorkersReady();



export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
