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
import '@reusable-ui/typos/dist/effects';
import '@cssfn/cssfn-dom'
import { Content } from '@reusable-ui/content'



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
            <br />
            <Content>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
            </Content>
            <Content theme='primary'>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
            </Content>
            <br />
            <Content theme='danger'>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
            </Content>
            <br />
            <Content theme='success'>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
            </Content>
        </div>
    );
}

export default App;
