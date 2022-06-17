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
                <article className='actions'>
                    <NavButton theme='primary'>
                        <Link to="/invoices">Invoices</Link>
                    </NavButton>
                    <NavButton theme='primary'>
                        <Link to="/expenses">Expenses</Link>
                    </NavButton>
                </article>
                <hr />
                <Outlet />
            </div>
        </>
    );
}

export default App;
