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
                <br />
                <Progress theme='success'>
                    <ProgressBar value='30'>30%</ProgressBar>
                    <ProgressBar value='40' theme='danger' progressBarStyle='striped' running>40%</ProgressBar>
                </Progress>
                <br />
                <Progress theme='danger'>
                    <ProgressBar value='70' progressBarStyle='striped'>30%</ProgressBar>
                </Progress>
                <hr />
                <Progress mild={true} theme='primary'>
                    <ProgressBar value='30'>30%</ProgressBar>
                </Progress>
                <br />
                <Progress mild={true} theme='success'>
                    <ProgressBar value='30'>30%</ProgressBar>
                    <ProgressBar value='40' theme='danger' progressBarStyle='striped' running>40%</ProgressBar>
                </Progress>
                <br />
                <Progress mild={true} theme='danger'>
                    <ProgressBar value='70' progressBarStyle='striped'>30%</ProgressBar>
                </Progress>
            </div>
        </>
    );
}

export default App;
