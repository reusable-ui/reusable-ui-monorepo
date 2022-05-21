import {
    default as React,
    // FC,
    // ReactElement,
    // useReducer,
    // useRef,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    colors,
    cssVals,
    
    themes,
    themesText,
    
    defineBackg,
    defineForeg,
    defineTheme,
} from '@nodestrap/colors'
import { Styles } from '@cssfn/cssfn-react'



Object.assign(globalThis, {
    colors,
    cssVals,
    
    themes,
    themesText,
    
    defineBackg,
    defineForeg,
    defineTheme,
})



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
    return (
        <div className="App">
            <article>
                <p>
                    Loaded stylesheets:
                </p>
                <div className='stylesheet-view'>
                    <Styles />
                </div>
            </article>
            <article className='actions'>
                <button onClick={handleTriggerRerender}>
                    Trigger re-render whole app
                </button>
            </article>
        </div>
    );
}

export default App;
