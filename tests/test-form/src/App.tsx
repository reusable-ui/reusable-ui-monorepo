import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Form,
} from '@reusable-ui/form'
import {
    EditableTextControl,
} from '@reusable-ui/editable-text-control'
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
                <Form classes={['actions']}>
                    <EditableTextControl theme='primary' enableValidation={true} tag='input' {...{type: 'email', placeholder: 'your@email.com'}} />
                    <EditableTextControl theme='primary' enableValidation={true} tag='input' {...{type: 'number', min: 17, max: 99, placeholder: 'age: 17-99'}} />
                </Form>
            </div>
        </>
    );
}

export default App;
