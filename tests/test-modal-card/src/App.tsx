import {
    default as React,
    useState,
    useCallback,
    useMemo,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ModalCard, ModalExpandedChangeEvent,
} from '@reusable-ui/modal-card'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { CardBody, CardFooter, CardHeader } from '@reusable-ui/card';
import { Button } from '@reusable-ui/button';
import CloseButton from '@reusable-ui/close-button';



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleExpandedChange = useCallback((event: ModalExpandedChangeEvent) => {
        console.log('onExpandedChange', event.expanded, event.actionType);
        setShowModal(event.expanded);
    }, []);
    const modalUiStyle = useMemo<React.CSSProperties>(() => ({
        background: 'white',
    }), []);
    
    
    
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
                <ModalCard expanded={showModal} onExpandedChange={handleExpandedChange} backdropStyle='static' theme='primary'>
                    <CardHeader>
                        Test Modal Card
                        <CloseButton data-modal-action-close />
                    </CardHeader>
                    <CardBody>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    </CardBody>
                    <CardFooter>
                        Goodbye
                        <Button data-modal-action-close>Close</Button>
                    </CardFooter>
                </ModalCard>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
