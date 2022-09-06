import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Content,
} from '@reusable-ui/content'
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
                <Content theme='primary'>
                    <figure>
                        <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                        <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                        <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    </figure>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aut deserunt nulla iusto quod a est debitis tenetur dolorem? Molestiae unde nulla amet odio eveniet, quis eum libero aperiam natus?
                    </p>
                    <img alt='lorem image' src='/images/lorem-image-1.svg' style={{ height: '150px' }} />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo aut deserunt nulla iusto quod a est debitis tenetur dolorem? Molestiae unde nulla amet odio eveniet, quis eum libero aperiam natus?
                    </p>
                </Content>
            </div>
        </>
    );
}

export default App;
