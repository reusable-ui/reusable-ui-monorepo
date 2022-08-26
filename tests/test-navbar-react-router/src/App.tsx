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
    HamburgerMenuButton,
} from '@reusable-ui/hamburger-menu-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
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
    
    const [pressed, setPressed] = useState(false);
    const handleTogglePressed = () => {
        setPressed(!pressed);
    };
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                <Navbar>{({
                    colorSystemProps,
                    navbarExpanded,
                    menuExpanded,
                    handleClickAsToggleMenu,
                }) => <>
                    <img {...colorSystemProps} className='logo' src='/test-logo.png' alt='logo' />
                    {!navbarExpanded && <HamburgerMenuButton {...colorSystemProps} className='toggler' active={menuExpanded} onClick={handleClickAsToggleMenu} />}
                    <Nav orientation={navbarExpanded ? 'inline' : 'block'}>
                        <NavItem>
                            <Link to='/'>Menu 1</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/docs'>Menu 2</Link>
                        </NavItem>
                        <NavItem href='https://github.com/nodestrap' target='_blank'>
                            Menu 3
                        </NavItem>
                        <NavItem href='https://www.npmjs.com/org/nodestrap' target='_blank'>
                            Menu 4
                        </NavItem>
                    </Nav>
                </>}</Navbar>
                <hr />
                <Outlet />
            </div>
        </>
    );
}

export default App;
