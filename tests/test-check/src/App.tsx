import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Check,
} from '@reusable-ui/check'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



const handleChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log('checked = ', event.target.checked);
}



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
                    <Check theme='primary' onChange={handleChange}>
                        test &lt;Check&gt;
                    </Check>
                    <Check theme='success' checkStyle='btn' nude={false}>
                        test &lt;Check&gt;
                    </Check>
                    <Check theme='danger' checkStyle='togglerBtn' nude={false}>
                        test &lt;Check&gt;
                    </Check>
                </article>
            </div>
        </>
    );
}

export default App;
