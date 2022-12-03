import {
    default as React,
    useState,
    useCallback,
    useMemo,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ModalSide, ModalExpandedChangeEvent,
} from '@reusable-ui/modal-side'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { CardBody, CardFooter, CardHeader } from '@reusable-ui/card';
import { Button } from '@reusable-ui/button';
import CloseButton from '@reusable-ui/close-button';
import Check from '@reusable-ui/check';
import Basic from '@reusable-ui/basic';



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
    const handleClose = useCallback((event: React.MouseEvent) => {
        setShowModal(false);
    }, []);
    const modalUiStyle = useMemo<React.CSSProperties>(() => ({
        background: 'white',
    }), []);
    
    const [isStatic, setStatic] = useState<boolean>(false);
    const [wideContent, setWideContent] = useState<boolean>(false);
    const [tallContent, setTallContent] = useState<boolean>(false);
    
    const containerRef = useRef<HTMLElement>(null);
    const [inContainer, setInContainer] = useState(false);
    
    
    
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
                <p>
                    <input type='checkbox' checked={inContainer} onChange={(e) => setInContainer(e.target.checked)} /> Inside container
                </p>
                <button onClick={() => setShowModal(!showModal)}>
                    Show modal
                </button>
                <p>
                    Modal is {showModal ? 'shown' : 'hidden'}
                </p>
                <ModalSide expanded={showModal} onExpandedChange={handleExpandedChange} modalSideStyle='inlineStart' backdropStyle={(isStatic || undefined) && 'static'} theme='primary' modalViewport={inContainer ? containerRef : null}>
                    <CardHeader>
                        Test Modal Card
                        <CloseButton onClick={handleClose} size='xs' />
                    </CardHeader>
                    <CardBody>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p><Check theme='primary' checkStyle='switch' active={isStatic} onActiveChange={(e) => setStatic(e.active)}>static</Check></p>
                        <p><Check theme='primary' checkStyle='switch' active={wideContent} onActiveChange={(e) => setWideContent(e.active)}>simulate wide content</Check></p>
                        <p><Check theme='primary' checkStyle='switch' active={tallContent} onActiveChange={(e) => setTallContent(e.active)}>simulate tall content</Check></p>
                        { wideContent &&
                        <p>Lorem_ipsum_dolor_sit_amet_consectetur_adipisicing_elit._Cupiditate_ad_obcaecati_numquam?_Corporis_quas_consequuntur_consectetur_dolore_illo._Neque_id_quia,_et_vitae_a_excepturi_dignissimos_ab_tempora_temporibus_quo!</p> }
                        { tallContent &&
                        <p>
                            Lorem,<br />ipsum<br />dolor<br />sit<br />amet<br />consectetur<br />adipisicing<br />elit.<br />Quaerat,<br />eaque<br />error<br />commodi<br />laboriosam<br />asperiores<br />iure<br />veniam<br />perferendis<br />consequuntur<br />nihil<br />quibusdam<br />necessitatibus<br />excepturi<br />sequi,<br />beatae<br />eligendi<br />rerum<br />consectetur,<br />debitis<br />expedita.<br />Dolor.
                        </p>}
                    </CardBody>
                    <CardFooter>
                        Goodbye
                        <Button onClick={handleClose}>Close</Button>
                    </CardFooter>
                </ModalSide>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <Basic elmRef={containerRef} theme='primary' size='lg' mild={true} style={{margin: '2rem', minHeight: '50vh'}}>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit consectetur natus eaque quidem a, magnam alias? Quisquam earum sit similique porro autem necessitatibus quae. Quia velit aliquam animi debitis praesentium.
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit consectetur natus eaque quidem a, magnam alias? Quisquam earum sit similique porro autem necessitatibus quae. Quia velit aliquam animi debitis praesentium.
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit consectetur natus eaque quidem a, magnam alias? Quisquam earum sit similique porro autem necessitatibus quae. Quia velit aliquam animi debitis praesentium.
                    </p>
                </Basic>
            </div>
        </>
    );
}

export default App;
