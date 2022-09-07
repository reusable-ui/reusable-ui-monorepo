import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    NavButton,
} from '@reusable-ui/nav-button'
import {
    Nav, NavItem,
} from '@reusable-ui/nav'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import {
    Link as OriLink,
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
                <article className='actions'>
                    <NavButton theme='primary'>
                        <Link to="/invoices">Invoices</Link>
                    </NavButton>
                    <NavButton theme='primary' tag='button'>
                        <Link to="/expenses">Expenses</Link>
                    </NavButton>
                </article>
                <article>
                    <Nav>
                        <NavItem theme='secondary'>
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem theme='primary'>
                            <Link to="/invoices">Invoices</Link>
                        </NavItem>
                        <NavItem theme='success' tag='div'>
                            <Link to="/expenses">Expenses</Link>
                        </NavItem>
                    </Nav>
                </article>
                <article>
                    <Link to="/invoices">Invoices</Link> | <Link to="/expenses">Expenses</Link>
                    <br />
                    <OriLink to="/invoices">Invoices</OriLink> | <OriLink to="/expenses">Expenses</OriLink>
                </article>
                <hr />
                <Outlet />
            </div>
        </>
    );
}

export default App;
