import {
    default as React,
} from 'react';
// import logo from './logo.svg';
import './App.css';
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
import '@cssfn/cssfn-dom' // side effect for cssfn
import {
    // Link,
    Outlet,
} from 'react-router-dom'
import {
    Link,
} from '@reusable-ui/react-router-compat-link'



function App() {
    return (
        <>
            <div className="App">
                <Navbar theme='primary' expanded={undefined}>{({
                    basicVariantProps,
                    navbarExpanded,
                    menuExpanded,
                    handleClickAsToggleMenu,
                }) => <>
                    <img className='logo' src='/images/test-logo.png' alt='logo' style={{maxInlineSize: '4rem'}} />
                    {!navbarExpanded && <HamburgerMenuButton {...basicVariantProps} className='toggler' active={menuExpanded} onClick={handleClickAsToggleMenu} />}
                    <Collapse className='list' mainClass={navbarExpanded ? '' : undefined} expanded={menuExpanded}>
                        <Nav tag='ul' role='' {...basicVariantProps} orientation={navbarExpanded ? 'inline' : 'block'} listStyle='flat'>
                            <NavItem>
                                <Link to='/'>Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/expenses'>Expenses</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/invoices'>Invoices</Link>
                            </NavItem>
                            <NavItem enabled={false}>
                                <Link to='/expenses'>Disabled</Link>
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
                <hr />
                <Outlet />
            </div>
        </>
    );
}

export default App;
