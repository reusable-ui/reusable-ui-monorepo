import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Button,
} from '@reusable-ui/button'
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
    
    const [active, setActive] = useState<boolean>(false);
    
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
                    <Button theme='primary' active={active}>
                        test &lt;Button&gt;
                    </Button>
                    <Button theme='primary' active={active} mild={true}>
                        test &lt;Button&gt;
                    </Button>
                    <Button theme='primary' active={active} outlined={true}>
                        test &lt;Button&gt;
                    </Button>
                </article>
                <hr />
                <input type='checkbox' checked={active} onChange={(e) => setActive(e.target.checked)} />
            </div>
        </>
    );
}

export default App;
