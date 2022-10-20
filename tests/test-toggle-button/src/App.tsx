import {
    default as React,
    useEffect,
    useRef,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ToggleButton,
} from '@reusable-ui/toggle-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



const handleAnimationStart = (event: React.AnimationEvent<HTMLButtonElement>) => {
    console.log('start: ', event.animationName, new Date().getTime(), event.currentTarget.classList.toString());
};
const handleAnimationEnd = (event: React.AnimationEvent<HTMLButtonElement>) => {
    console.log('end: ', event.animationName, new Date().getTime(), event.currentTarget.classList.toString());
};
const handleAnimationCancel = (event: AnimationEvent) => {
    console.log('cancel: ', event.animationName, new Date().getTime(), (event.currentTarget as HTMLButtonElement)?.classList?.toString());
};



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [isPressed, setPressed] = useState<boolean>(false);
    
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const toggleButtonElm = toggleButtonRef.current;
        if (!toggleButtonElm) return;
        
        toggleButtonElm.addEventListener('animationcancel', handleAnimationCancel);
    }, []);
    
    
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
                    <ToggleButton theme='primary' active={isPressed} onActiveChange={(event) => {
                        console.log('onActiveChange', event.active);
                        setPressed(event.active);
                    }} focused={false} arrived={false}>
                        test &lt;Button&gt;
                    </ToggleButton>
                    <ToggleButton elmRef={toggleButtonRef} theme='danger' focused={false} arrived={false}
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    autoFocus={true}>
                        test &lt;Button&gt;
                    </ToggleButton>
                    <ToggleButton theme='danger' mild={true} focused={false} arrived={false}>
                        test &lt;Button&gt;
                    </ToggleButton>
                    <ToggleButton theme='danger' outlined={true} focused={false} arrived={false}>
                        test &lt;Button&gt;
                    </ToggleButton>
                </article>
            </div>
        </>
    );
}

export default App;
