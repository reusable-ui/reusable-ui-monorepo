import {
    default as React,
    useState,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Badge,
} from '@reusable-ui/badge'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { ExcitedChangeEvent, EventHandler, useEvent } from '@reusable-ui/core'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const btnRef = useRef<HTMLButtonElement>(null);
    
    const [excited, setExcited] = useState(false);
    const handleExcitedChange = useEvent<EventHandler<ExcitedChangeEvent>>((event) => {
        setExcited(event.excited);
    });
    
    
    
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <button ref={btnRef} onClick={() => setExcited(true)}>
                    I'm here
                </button>
                <Badge
                    theme='danger'
                    
                    expanded={true}
                    
                    floatingOn={btnRef}
                    floatingPlacement='right-start'
                    floatingOffset={-10}
                    floatingShift={-10}
                    
                    excited={excited}
                    onExcitedChange={handleExcitedChange}
                >
                    new!
                </Badge>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
