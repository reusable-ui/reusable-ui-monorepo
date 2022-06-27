import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ToggleButton,
} from '@reusable-ui/toggle-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
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
                    <ToggleButton theme='primary'>
                        test &lt;Button&gt;
                    </ToggleButton>
                    <ToggleButton theme='danger'>
                        test &lt;Button&gt;
                    </ToggleButton>
                </article>
            </div>
        </>
    );
}

export default App;
