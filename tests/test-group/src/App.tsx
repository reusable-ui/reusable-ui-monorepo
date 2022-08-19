import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Group,
} from '@reusable-ui/group'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { Button } from '@reusable-ui/button';
import { Check } from '@reusable-ui/check';



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
                <Group theme='primary'>
                    <Button theme='primary'>Pizza</Button>
                    <Button theme='warning'>Salad</Button>
                    <Check nude={false} checkStyle='switch' theme='danger'>Spicy</Check>
                </Group>
            </div>
        </>
    );
}

export default App;
