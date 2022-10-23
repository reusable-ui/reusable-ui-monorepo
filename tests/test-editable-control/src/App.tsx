import {
    default as React,
    useEffect,
    useRef,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    EditableControl,
} from '@reusable-ui/editable-control'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



const handleAnimationStart = (event: React.AnimationEvent<HTMLButtonElement>) => {
    if (!event.animationName.startsWith('edit-')) return;
    console.log('start: ', event.animationName, new Date().getTime(), event.currentTarget.classList.toString());
};
const handleAnimationEnd = (event: React.AnimationEvent<HTMLButtonElement>) => {
    if (!event.animationName.startsWith('edit-')) return;
    console.log('end: ', event.animationName, new Date().getTime(), event.currentTarget.classList.toString());
};
const handleAnimationCancel = (event: AnimationEvent) => {
    if (!event.animationName.startsWith('edit-')) return;
    console.log('!!! CANCEL !!!: ', event.animationName, new Date().getTime(), (event.currentTarget as HTMLButtonElement)?.classList?.toString());
};



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const editRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const editElm = editRef.current;
        if (!editElm) return;
        
        editElm.addEventListener('animationcancel', handleAnimationCancel);
        
        return () => {
            editElm.removeEventListener('animationcancel', handleAnimationCancel);
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
                    <EditableControl theme='primary' enableValidation={true} tag='input' {...{type: 'email', placeholder: 'your@email.com'}}
                        elmRef={editRef}
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                </article>
            </div>
        </>
    );
}

export default App;
