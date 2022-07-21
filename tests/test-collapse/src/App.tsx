import {
    default as React,
    useState,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Collapse,
} from '@reusable-ui/collapse'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [showCollapse, setShowCollapse] = useState<boolean>(false);
    

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
                <button onClick={() => setShowCollapse(!showCollapse)}>
                    I'm here
                </button>
                <Collapse active={showCollapse}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam totam tempore suscipit, molestiae libero eum nulla debitis, quos quam pariatur voluptas laudantium autem iusto maiores! Et consequuntur ratione delectus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam totam tempore suscipit, molestiae libero eum nulla debitis, quos quam pariatur voluptas laudantium autem iusto maiores! Et consequuntur ratione delectus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam totam tempore suscipit, molestiae libero eum nulla debitis, quos quam pariatur voluptas laudantium autem iusto maiores! Et consequuntur ratione delectus.</p>
                </Collapse>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
