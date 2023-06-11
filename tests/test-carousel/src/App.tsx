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
                <Carousel theme='primary' style={style} infiniteLoop={true} scrollIndex={value} scrollMargin={0.25} onScrollIndexChange={({scrollIndex}) => {
                    // console.log('Carousel_2 set to: ', scrollIndex);
                    setValue(scrollIndex);
                }}>
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
