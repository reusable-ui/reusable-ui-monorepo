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
    const [renderRadio1, setRenderRadio1] = useState(true);
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
                    {renderRadio1 && <Radio id='radio1' name='the-value' theme='primary' onChange={handleChange} enableValidation required>
                        test &lt;Radio&gt;
                    </Radio>}
                    <Radio id='radio2' name='the-value' theme='success' checkStyle='button' nude={false} enableValidation required>
                        test &lt;Radio&gt;
                    </Radio>
                    <Radio id='radio3' name='the-value' theme='danger' checkStyle='switch' nude={false} enableValidation required>
                        test &lt;Radio&gt;
                    </Radio>
                    <hr />
                    <label><input type='checkbox' checked={renderRadio1} onChange={({currentTarget: { checked }}) => setRenderRadio1(checked)} /> Render radio1</label>
                </article>
            </div>
        </>
    );
}

export default App;
