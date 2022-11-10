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
                                <Link href='/' legacyBehavior>Home</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </>}</Navbar>
    </div>
  )
}
