import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Control,
} from '@reusable-ui/control'
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
                <Control theme='primary' tag='button'>
                    test native button
                </Control>
                <br />
                <Control theme='primary' tag='div' role='button'>
                    test polifill button
                </Control>
                <br />
                <Control theme='primary' tag='input' {...{defaultValue: 'test native input'}} />
                <br />
                <Control theme='primary' tag='div' role='textbox' assertiveFocusable={true}>
                    test polifill input
                </Control>
            </div>
        </>
    );
}

export default App;
