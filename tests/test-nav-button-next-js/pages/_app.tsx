import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import {
  NavButton,
} from '@reusable-ui/nav-button'
import {
  Styles,
  HeadPortal,
} from '@cssfn/cssfn-react'
import Head from 'next/head'
import '@cssfn/cssfn-dom'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <HeadPortal>
          <Styles />
      </HeadPortal> */}
      <NavButton theme='primary'>
          <Link href="/invoices">Invoices</Link>
      </NavButton>
      <NavButton theme='primary'>
          <Link href="/expenses">Expenses</Link>
      </NavButton>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
