import {
    default as React,
    useState,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Modal,
} from '@reusable-ui/modal'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const btnRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    
    
    
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
                <button ref={btnRef} onClick={() => setShowModal(!showModal)}>
                    I'm here
                </button>
                <Modal theme='primary' active={showModal} onActiveChange={(event) => setShowModal(event.newActive)}>
                    <div tabIndex={-1}>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                </Modal>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
