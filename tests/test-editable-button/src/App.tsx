import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    EditableButton,
} from '@reusable-ui/editable-button'
import {
    ButtonIcon,
} from '@reusable-ui/button-icon'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [isValid, setIsValid] = useState<boolean>(false);
    
    
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
                    <input type='checkbox' checked={isValid} onChange={({target: {checked}}) => setIsValid(checked)} />
                    <hr />
                    <EditableButton theme='primary' enableValidation={true} isValid={isValid}>
                        test 1
                    </EditableButton>
                    <EditableButton theme='primary' enableValidation={true} isValid={isValid} buttonComponent={<ButtonIcon icon='face' iconPosition='end' />}>
                        test 2
                    </EditableButton>
                </article>
            </div>
        </>
    );
}

export default App;
