import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ActionControl,
} from '@reusable-ui/action-control'
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
    const handleTogglePressed: React.EventHandler<React.MouseEvent> = (event) => {
        setPressed(!pressed);
        console.log(event);
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
                    <ActionControl theme='primary' mild={false}>
                        test &lt;ActionControl&gt;
                    </ActionControl>
                    <ActionControl theme='primary' mild={false} pressed={pressed || undefined} onClick={handleTogglePressed}>
                        toggle press
                    </ActionControl>
                </article>
            </div>
        </>
    );
}

export default App;
