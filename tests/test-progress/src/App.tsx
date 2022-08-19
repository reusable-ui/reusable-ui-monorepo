import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Progress, ProgressBar
} from '@reusable-ui/progress'
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
                <Progress theme='primary'>
                    <ProgressBar value='30'>30%</ProgressBar>
                </Progress>
                <Progress theme='success'>
                    <ProgressBar value='30'>30%</ProgressBar>
                    <ProgressBar value='40' running>40%</ProgressBar>
                </Progress>
            </div>
        </>
    );
}

export default App;
