import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Card,
    CardHeader,
    CardFooter,
    CardBody,
} from '@reusable-ui/card'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    const [enabled, setEnabled] = useState<boolean>(true);
    const [active , setActive ] = useState<boolean>(false);
    
    
    
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
                
                <Card theme='primary' enabled={enabled} active={active}>
                    <CardHeader>
                        Test Card
                    </CardHeader>
                    <CardBody>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aut deserunt nulla iusto quod a est debitis tenetur dolorem? Molestiae unde nulla amet odio eveniet, quis eum libero aperiam natus?
                    </p>
                    <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aut deserunt nulla iusto quod a est debitis tenetur dolorem? Molestiae unde nulla amet odio eveniet, quis eum libero aperiam natus?
                    </p>
                    </CardBody>
                    <CardFooter>
                        Just for fun!
                    </CardFooter>
                </Card>
                
                <hr />
                
                <label htmlFor='chkEnb'><input id='chkEnb' type='checkbox' checked={enabled} onChange={({target: {checked}}) => setEnabled(checked)} /> enabled</label>
                <label htmlFor='chkAct'><input id='chkAct' type='checkbox' checked={active } onChange={({target: {checked}}) =>  setActive(checked)} /> active</label>
            </div>
        </>
    );
}

export default App;
