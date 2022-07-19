import {
    default as React,
    useState,
    useCallback,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Modal, ModalActiveChangeEvent,
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
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleActiveChange = useCallback((event: ModalActiveChangeEvent) => {
        console.log('onActiveChange', event.newActive, event.actionType);
        setShowModal(event.newActive);
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <button onClick={() => setShowModal(!showModal)}>
                    Show modal
                </button>
                <p>
                    Modal is {showModal ? 'shown' : 'hidden'}
                </p>
                <Modal theme='primary' active={showModal} onActiveChange={handleActiveChange}>
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
