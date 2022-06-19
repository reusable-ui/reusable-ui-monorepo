import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    CloseButton,
} from '@reusable-ui/close-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



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
                    <CloseButton theme='primary' />
                    <CloseButton theme='primary' />
                    <CloseButton theme='primary' pressed={pressed || undefined} onClick={handleTogglePressed} />
                </article>
            </div>
        </>
    );
}

export default App;
