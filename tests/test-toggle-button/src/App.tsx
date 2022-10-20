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
    console.log('!!! CANCEL !!!: ', event.animationName, new Date().getTime(), (event.currentTarget as HTMLButtonElement)?.classList?.toString());
};



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [isPressed, setPressed] = useState<boolean>(false);
    
    const toggleButton1Ref = useRef<HTMLButtonElement>(null);
    const toggleButton2Ref = useRef<HTMLButtonElement>(null);
    const toggleButton3Ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const toggleButton1Elm = toggleButton1Ref.current;
        if (!toggleButton1Elm) return;
        
        toggleButton1Elm.addEventListener('animationcancel', handleAnimationCancel);
        
        return () => {
            toggleButton1Elm.removeEventListener('animationcancel', handleAnimationCancel);
        };
    }, []);
    useEffect(() => {
        const toggleButton2Elm = toggleButton2Ref.current;
        if (!toggleButton2Elm) return;
        
        toggleButton2Elm.addEventListener('animationcancel', handleAnimationCancel);
        
        return () => {
            toggleButton2Elm.removeEventListener('animationcancel', handleAnimationCancel);
        };
    }, []);
    useEffect(() => {
        const toggleButton3Elm = toggleButton3Ref.current;
        if (!toggleButton3Elm) return;
        
        toggleButton3Elm.addEventListener('animationcancel', handleAnimationCancel);
        
        return () => {
            toggleButton3Elm.removeEventListener('animationcancel', handleAnimationCancel);
        };
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
                    <ToggleButton elmRef={toggleButton1Ref} theme='danger' focused={false} arrived={false}
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        test &lt;Button&gt;
                    </ToggleButton>
                    <ToggleButton elmRef={toggleButton2Ref} theme='danger' mild={true} focused={false} arrived={false}
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        test &lt;Button&gt;
                    </ToggleButton>
                    <ToggleButton elmRef={toggleButton3Ref} theme='danger' outlined={true} focused={false} arrived={false}
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        test &lt;Button&gt;
                    </ToggleButton>
                </article>
            </div>
        </>
    );
}

export default App;
