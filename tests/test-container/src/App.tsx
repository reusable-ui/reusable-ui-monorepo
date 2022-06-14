import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Container,
} from '@reusable-ui/container'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
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
                <Container classes={['container']} theme='primary'>
                    <section style={{ background: '#FFC0CB' }}>
                        The first child
                    </section>
                    <section style={{ background: '#FFFF00' }} className='fill'>
                        The second child applied <code>{`className='fill'`}</code>
                    </section>
                    <section style={{ background: '#90EE90' }}>
                        The third child
                    </section>
                    <section style={{ background: '#E9967A' }} className='fill'>
                        The fourth child applied <code>{`className='fill'`}</code>
                    </section>
                    <section style={{ background: '#D2B48C' }}>
                        The fifth child
                    </section>
                </Container>
                <hr />
                <Container classes={['container']} theme='primary'>
                    <section style={{ background: '#FFC0CB' }}>
                        The first child
                    </section>
                    <section style={{ background: '#FFFF00' }} className='fill-self'>
                        The second child applied <code>{`className='fill-self'`}</code>
                    </section>
                    <section style={{ background: '#90EE90' }}>
                        The third child
                    </section>
                    <section style={{ background: '#E9967A' }} className='fill-self'>
                        The fourth child applied <code>{`className='fill-self'`}</code>
                    </section>
                    <section style={{ background: '#D2B48C' }}>
                        The fifth child
                    </section>
                </Container>
            </div>
        </>
    );
}

export default App;
