import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    EditableActionControl,
} from '@reusable-ui/editable-action-control'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const handleClick: React.EventHandler<React.MouseEvent> = (event) => {
        console.log(event);
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
                    <EditableActionControl theme='primary' enableValidation={true} onClick={handleClick}>
                        Test &lt;EditableActionControl&gt;
                    </EditableActionControl>
                </article>
            </div>
        </>
    );
}

export default App;
