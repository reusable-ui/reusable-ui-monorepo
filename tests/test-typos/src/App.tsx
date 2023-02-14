import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
// import {
//     typos,
//     typoValues,
//     cssTypoConfig,
// } from '@reusable-ui/typos'
import '@reusable-ui/typos';
import '@cssfn/cssfn-dom'



// Object.assign(globalThis, {
//     typos,
//     typoValues,
//     cssTypoConfig,
// });



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
    return (
        <div className="App">
            <article className='actions'>
                <button onClick={handleTriggerRerender}>
                    Trigger re-render whole app
                </button>
                <p>
                    Hello world!
                </p>
                <code>some-code</code>
            </article>
        </div>
    );
}

export default App;
