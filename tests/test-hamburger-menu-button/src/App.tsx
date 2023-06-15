import {
    default as React,
    useEffect,
    useRef,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    HamburgerMenuButton,
} from '@reusable-ui/hamburger-menu-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    const hamburgerRef = useRef<HTMLButtonElement|null>(null);
    useEffect(() => {
        const hamburgerElm = hamburgerRef.current;
        if (!hamburgerElm) return;
        
        
        
        const handleAnimationStart = (event: AnimationEvent) => {
            if (!event.animationName.match(/active|passive|press|release/i)) return;
            console.log('anim start: ', event.animationName);
        };
        const handleAnimationEnd = (event: AnimationEvent) => {
            if (!event.animationName.match(/active|passive|press|release/i)) return;
            console.log('anim end: ', event.animationName);
        };
        const handleAnimationCancel = (event: AnimationEvent) => {
            if (!event.animationName.match(/active|passive|press|release/i)) return;
            console.log('anim CANCEL: ', event.animationName);
        };
        
        hamburgerElm.addEventListener('animationstart', handleAnimationStart);
        hamburgerElm.addEventListener('animationend', handleAnimationEnd);
        hamburgerElm.addEventListener('animationcancel', handleAnimationCancel);
        
        
        
        return () => {
            hamburgerElm.removeEventListener('animationstart', handleAnimationStart);
            hamburgerElm.removeEventListener('animationend', handleAnimationEnd);
            hamburgerElm.removeEventListener('animationcancel', handleAnimationCancel);
        };
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
                <article className='actions'>
                    <HamburgerMenuButton elmRef={hamburgerRef} theme='primary' />
                    <HamburgerMenuButton theme='danger' />
                    <HamburgerMenuButton theme='success' mild={true} />
                    <HamburgerMenuButton theme='danger' outlined={true} />
                </article>
            </div>
        </>
    );
}

export default App;
