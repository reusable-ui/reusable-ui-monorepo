import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Button,
} from '@reusable-ui/button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import Basic from '@reusable-ui/basic';



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [pressed, setPressed] = useState(false);
    const handleTogglePressed = () => {
        setPressed(!pressed);
    };
    
    const [active, setActive] = useState<boolean>(false);
    
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
                    <Button theme='primary' active={active}>
                        test &lt;Button&gt;
                    </Button>
                    <Button theme='primary' active={active} mild={true}>
                        test &lt;Button&gt;
                    </Button>
                    <Button theme='primary' active={active} outlined={true}>
                        test &lt;Button&gt;
                    </Button>
                    <p>
                        Lorem ipsum <Button theme='primary' buttonStyle='link'>
                            test link
                        </Button> dolor sit
                    </p>
                    <p>
                        Lorem ipsum <Button theme='primary' buttonStyle='link' focused={true}>
                            test link
                        </Button> dolor sit
                    </p>
                    <hr style={{width: '100%'}} />
                    <Button theme='primary' buttonStyle='regular'>
                        test regular
                    </Button>
                    <Button theme='primary' buttonStyle='ghost'>
                        test ghost
                    </Button>
                    <Button theme='primary' buttonStyle='link'>
                        test link
                    </Button>
                    <Basic theme='danger' mild={false}>
                        <Button theme='primary' buttonStyle='regular'>
                            test regular
                        </Button>
                        <Button theme='primary' buttonStyle='ghost'>
                            test ghost
                        </Button>
                        <Button theme='primary' buttonStyle='link'>
                            test link
                        </Button>
                    </Basic>
                    <Basic theme='danger' mild={true}>
                        <Button theme='primary' buttonStyle='regular'>
                            test regular
                        </Button>
                        <Button theme='primary' buttonStyle='ghost'>
                            test ghost
                        </Button>
                        <Button theme='primary' buttonStyle='link'>
                            test link
                        </Button>
                    </Basic>
                    <hr style={{width: '100%'}} />
                    <Button theme='primary' buttonStyle='regular' gradient={true}>
                        test regular
                    </Button>
                    <Button theme='primary' buttonStyle='ghost' gradient={true}>
                        test ghost
                    </Button>
                    <Button theme='primary' buttonStyle='link' gradient={true}>
                        test link
                    </Button>
                    <Basic theme='danger' mild={false}>
                        <Button theme='primary' buttonStyle='regular' gradient={true}>
                            test regular
                        </Button>
                        <Button theme='primary' buttonStyle='ghost' gradient={true}>
                            test ghost
                        </Button>
                        <Button theme='primary' buttonStyle='link' gradient={true}>
                            test link
                        </Button>
                    </Basic>
                    <Basic theme='danger' mild={true}>
                        <Button theme='primary' buttonStyle='regular' gradient={true}>
                            test regular
                        </Button>
                        <Button theme='primary' buttonStyle='ghost' gradient={true}>
                            test ghost
                        </Button>
                        <Button theme='primary' buttonStyle='link' gradient={true}>
                            test link
                        </Button>
                    </Basic>
                    <hr style={{width: '100%'}} />
                    <Button theme='primary' buttonStyle='regular' gradient={true} outlined={true}>
                        test regular
                    </Button>
                    <Button theme='primary' buttonStyle='ghost' gradient={true} outlined={true}>
                        test ghost
                    </Button>
                    <Button theme='primary' buttonStyle='link' gradient={true} outlined={true}>
                        test link
                    </Button>
                    <Basic theme='danger' mild={false}>
                        <Button theme='primary' buttonStyle='regular' gradient={true} outlined={true}>
                            test regular
                        </Button>
                        <Button theme='primary' buttonStyle='ghost' gradient={true} outlined={true}>
                            test ghost
                        </Button>
                        <Button theme='primary' buttonStyle='link' gradient={true} outlined={true}>
                            test link
                        </Button>
                    </Basic>
                    <Basic theme='danger' mild={true}>
                        <Button theme='primary' buttonStyle='regular' gradient={true} outlined={true}>
                            test regular
                        </Button>
                        <Button theme='primary' buttonStyle='ghost' gradient={true} outlined={true}>
                            test ghost
                        </Button>
                        <Button theme='primary' buttonStyle='link' gradient={true} outlined={true}>
                            test link
                        </Button>
                    </Basic>
                    <hr style={{width: '100%'}} />
                </article>
                <hr />
                <article className='actions'>
                    <Button theme='primary' onClick={() => console.log('native clicked!')}>
                        test native button
                    </Button>
                    <Button theme='primary' onClick={() => console.log('styled clicked!')} tag='div'>
                        test styled button
                    </Button>
                </article>
                <hr />
                <input type='checkbox' checked={active} onChange={(e) => setActive(e.target.checked)} />
            </div>
        </>
    );
}

export default App;
