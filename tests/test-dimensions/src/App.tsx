import {
    default as React,
    useState,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    useElementCssSize,
    useWindowCssSize,
} from '@reusable-ui/dimensions'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    useWindowCssSize({
        varInlineSize : '--windowWidth',
        varBlockSize  : '--windowHeight',
    });
    
    useWindowCssSize({
        varInlineSize : '--windowWide',
    });
    
    const elmRef = useRef<HTMLDivElement>(null);
    useElementCssSize(elmRef, {
        varInlineSize : '--theElmWidth',
        varBlockSize  : '--theElmHeight',
    });
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App" ref={elmRef}>
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
            </div>
        </>
    );
}

export default App;
