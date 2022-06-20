import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    EmailInput,
    DateInput,
} from '@reusable-ui/input'
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
                    <EmailInput theme='primary' enableValidation={true} placeholder='your@email.com' />
                    <DateInput theme='primary' enableValidation={true} placeholder='birth date' />
                </article>
            </div>
        </>
    );
}

export default App;
