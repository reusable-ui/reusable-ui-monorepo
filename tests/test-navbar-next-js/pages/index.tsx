import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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



export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar theme='primary' expanded={undefined}>{({
                    basicVariantProps,
                    navbarExpanded,
                    menuExpanded,
                    handleClickAsToggleMenu,
                }) => <>
                    {!navbarExpanded && <HamburgerMenuButton {...basicVariantProps} className='toggler' active={menuExpanded} onClick={handleClickAsToggleMenu} />}
                    <Collapse className='list' mainClass={navbarExpanded ? '' : undefined} expanded={menuExpanded}>
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
    </div>
  )
}
