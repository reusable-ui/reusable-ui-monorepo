import {
    default as React,
    useMemo,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Carousel,
} from '@reusable-ui/carousel'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    const style = useMemo<React.CSSProperties>(() => ({
        maxWidth  : '400px',
        maxHeight : '300px',
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
                <Carousel theme='primary' style={style} infiniteLoop={false}>
                    <img alt='lorem image' src='/images/lorem-img/waves-800x600.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/leaf-800x700.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/building-800x500.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/street-800x800.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/flower-700x400.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/water-500x800.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/wood-700x600.jpg' />
                </Carousel>
                <br />
                <Carousel theme='primary' style={style} infiniteLoop={true}>
                    <img alt='lorem image' src='/images/lorem-img/waves-800x600.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/leaf-800x700.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/building-800x500.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/street-800x800.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/flower-700x400.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/water-500x800.jpg' />
                    <img alt='lorem image' src='/images/lorem-img/wood-700x600.jpg' />
                </Carousel>
            </div>
        </>
    );
}

export default App;
