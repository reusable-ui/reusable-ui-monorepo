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
            <div>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
                <ol className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ol>
                <ul className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </div>
            <br />
            <Content>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
                <ol className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ol>
                <ul className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </Content>
            <Content theme='primary'>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
                <ol className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ol>
                <ul className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </Content>
            <br />
            <Content theme='primary' mild={false}>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
                <ol className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ol>
                <ul className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </Content>
            <br />
            <Content theme='primary' outlined={true}>
                <blockquote>
                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while. That's because they were able to connect experiences they've had and synthesize new things.
                </blockquote>
                <ol className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ol>
                <ul className='pList'>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </Content>
        </div>
    );
}

export default App;
