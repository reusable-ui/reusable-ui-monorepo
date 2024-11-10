import {
    default as React,
    useState,
    useCallback,
    useMemo,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import '@reusable-ui/typos/effects'
import {
    ModalCard, ModalExpandedChangeEvent,
} from '@reusable-ui/modal-card'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { Container } from '@reusable-ui/container';
import { Card, CardBody, CardFooter, CardHeader } from '@reusable-ui/card';
import { Button } from '@reusable-ui/button';
import CloseButton from '@reusable-ui/close-button';
import Check from '@reusable-ui/check';



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleExpandedChange = useCallback((event: ModalExpandedChangeEvent<any>) => {
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
    const [scrollable, setScrollable] = useState<boolean>(true);
    const [wideContent, setWideContent] = useState<boolean>(false);
    const [tallContent, setTallContent] = useState<boolean>(false);
    
    const buttonSaveRef = useRef<HTMLButtonElement|null>(null);
    
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <Container className="App">
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
                <ModalCard expanded={showModal} onExpandedChange={handleExpandedChange} modalCardStyle={(scrollable || undefined) && 'scrollable'} backdropStyle={(isStatic || undefined) && 'static'} theme='primary'
                    onCollapseEnd={() => console.log('collapsed')}
                    onCollapseStart={() => console.log('collapsing')}
                    onExpandStart={() => console.log('expanding')}
                    onExpandEnd={() => console.log('expanded')}
                    
                    autoFocusOn={buttonSaveRef}
                    horzAlign='center'
                    vertAlign='center'
                    
                    
                    // cardComponent={<Card style={{maxInlineSize: '800px', maxBlockSize: '500px'}} />}
                >
                    <CardHeader>
                        <h1>Test Modal Card</h1>
                        <CloseButton onClick={handleClose} size='xs' />
                    </CardHeader>
                    <CardBody>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p><Check theme='primary' checkStyle='switch' active={isStatic} onActiveChange={(e) => setStatic(e.active)}>static</Check></p>
                        <p><Check theme='primary' checkStyle='switch' active={scrollable} onActiveChange={(e) => setScrollable(e.active)}>scrollable</Check></p>
                        <p><Check theme='primary' checkStyle='switch' active={wideContent} onActiveChange={(e) => setWideContent(e.active)}>simulate wide content</Check></p>
                        <p><Check theme='primary' checkStyle='switch' active={tallContent} onActiveChange={(e) => setTallContent(e.active)}>simulate tall content</Check></p>
                        { wideContent &&
                        <p style={{overflowWrap: 'normal', whiteSpace: 'nowrap'}}>Lorem_ipsum_dolor_sit_amet_consectetur_adipisicing_elit._Cupiditate_ad_obcaecati_numquam?_Corporis_quas_consequuntur_consectetur_dolore_illo._Neque_id_quia,_et_vitae_a_excepturi_dignissimos_ab_tempora_temporibus_quo!</p> }
                        { tallContent &&
                        <p>
                            Lorem,<br />ipsum<br />dolor<br />sit<br />amet<br />consectetur<br />adipisicing<br />elit.<br />Quaerat,<br />eaque<br />error<br />commodi<br />laboriosam<br />asperiores<br />iure<br />veniam<br />perferendis<br />consequuntur<br />nihil<br />quibusdam<br />necessitatibus<br />excepturi<br />sequi,<br />beatae<br />eligendi<br />rerum<br />consectetur,<br />debitis<br />expedita.<br />Dolor.
                        </p>}
                    </CardBody>
                    <CardFooter>
                        <Button elmRef={buttonSaveRef} onClick={handleClose}>Save</Button>
                        <Button onClick={handleClose}>Don&apos;t save</Button>
                        <Button onClick={handleClose}>Continue editing</Button>
                    </CardFooter>
                </ModalCard>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </Container>
        </>
    );
}

export default App;
