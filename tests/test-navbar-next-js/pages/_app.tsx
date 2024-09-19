import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@cssfn/cssfn-dom' // side effect for cssfn
import { ensureRendererWorkersReady } from '@cssfn/cssfn'
const _loaded = await ensureRendererWorkersReady();

import {
  Navbar,
} from '@reusable-ui/navbar'
import {
  Nav, NavItem,
} from '@reusable-ui/nav'
import {
  Collapse,
} from '@reusable-ui/collapse'
import {
  HamburgerMenuButton,
} from '@reusable-ui/hamburger-menu-button'
import Link from 'next/link'



export default function App({ Component, pageProps }: AppProps) {
  return <>
    
    <Navbar theme='primary' expanded={undefined} breakpoint='lg'>{({
          basicVariantProps,
          navbarExpanded,
          listExpanded,
          handleClickToToggleList,
      }) => <>
          {!navbarExpanded && <HamburgerMenuButton {...basicVariantProps} className='toggler' active={listExpanded} onClick={handleClickToToggleList} />}
          <Collapse className='list' mainClass={navbarExpanded ? '' : undefined} expanded={listExpanded}>
              <Nav tag='ul' role='' {...basicVariantProps} orientation={navbarExpanded ? 'inline' : 'block'} listStyle='flat'>
                <NavItem>
                    <Link href='/'>Home</Link>
                </NavItem>
                <NavItem>
                    <Link href='/expenses'>Expenses</Link>
                </NavItem>
                <NavItem>
                    <Link href='/invoices'>Invoices</Link>
                </NavItem>
                <NavItem enabled={false}>
                    <Link href='/booh'>Disabled</Link>
                </NavItem>
                <NavItem href='https://github.com/nodestrap' target='_blank'>
                    Menu 3
                </NavItem>
                <NavItem href='https://www.npmjs.com/org/nodestrap' target='_blank'>
                    Menu 4
                </NavItem>
                <NavItem enabled={false} href='https://www.google.com' target='_blank'>
                    Disabled
                </NavItem>
              </Nav>
          </Collapse>
      </>}</Navbar>

    <Component {...pageProps} />
  </>
}
