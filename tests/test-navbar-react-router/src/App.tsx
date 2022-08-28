import {
    default as React,
    useState,
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
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    return (
        <>
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                <Navbar theme='primary' expanded={undefined}>{({
                    colorSystemProps,
                    navbarExpanded,
                    menuExpanded,
                    handleClickAsToggleMenu,
                }) => <>
                    <img className='logo' src='/images/test-logo.png' alt='logo' style={{maxInlineSize: '4rem'}} />
                    {!navbarExpanded && <HamburgerMenuButton {...colorSystemProps} className='toggler' active={menuExpanded} onClick={handleClickAsToggleMenu} />}
                    <Collapse className='list' mainClass={navbarExpanded ? '' : undefined} expanded={menuExpanded}>
                        <Nav tag='ul' role='' {...colorSystemProps} orientation={navbarExpanded ? 'inline' : 'block'} listStyle='flat'>
                            <NavItem>
                                <Link to='/'>Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/expenses'>Expenses</Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/invoices'>Invoices</Link>
                            </NavItem>
                            <NavItem href='https://github.com/nodestrap' target='_blank'>
                                Menu 3
                            </NavItem>
                            <NavItem href='https://www.npmjs.com/org/nodestrap' target='_blank'>
                                Menu 4
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
