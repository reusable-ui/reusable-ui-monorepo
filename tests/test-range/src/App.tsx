import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Range,
} from '@reusable-ui/range'
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
                <article className='actions'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                    <Range theme='primary' nude={false} />
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repudiandae veniam dolorem ex, aliquam aspernatur earum veritatis adipisci aperiam dolore voluptatem reprehenderit repellendus quos eaque a in dicta eveniet. Ex!</p>
                </article>
            </div>
        </>
    );
}

export default App;
