import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Radio,
} from '@reusable-ui/radio'
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
                    <Radio name='the-value' theme='primary' onChange={handleChange}>
                        test &lt;Radio&gt;
                    </Radio>
                    <Radio name='the-value' theme='success' checkStyle='button' nude={false}>
                        test &lt;Radio&gt;
                    </Radio>
                    <Radio name='the-value' theme='danger' checkStyle='switch' nude={false}>
                        test &lt;Radio&gt;
                    </Radio>
                </article>
            </div>
        </>
    );
}

export default App;
