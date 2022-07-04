import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    Masonry,
} from '@reusable-ui/masonry'
// import {
//     Styles,
//     HeadPortal,
// } from '@cssfn/cssfn-react'
import '@cssfn/cssfn-dom'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
    return (
        <>
            {/* <HeadPortal>
                <Styles />
            </HeadPortal> */}
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                
                <Masonry theme='primary' size='sm'>
                    <img src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
					<img src="https://assets.codepen.io/12005/suspension-bridge.jpg" alt="The Clifton Suspension Bridge" />
					<img src="https://assets.codepen.io/12005/sunset.jpg" alt="Sunset and boats" />
					<img src="https://assets.codepen.io/12005/snowy.jpg" alt="a river in the snow" />
					<img src="https://assets.codepen.io/12005/bristol-balloons1.jpg" alt="a single checked balloon" />
					<img src="https://assets.codepen.io/12005/dog-balloon.jpg" alt="a hot air balloon shaped like a dog" />
					<img src="https://assets.codepen.io/12005/abq-balloons.jpg" alt="View from a hot air balloon of other balloons" />
					<img src="https://assets.codepen.io/12005/disney-balloon.jpg" alt="a balloon fairground ride" />
					<img src="https://assets.codepen.io/12005/bristol-harbor.jpg" alt="sunrise over a harbor" />
					<img src="https://assets.codepen.io/12005/bristol-balloons2.jpg" alt="three hot air balloons in a blue sky" />
					<img src="https://assets.codepen.io/12005/toronto.jpg" alt="the Toronto light up sign at night" />
                </Masonry>
            </div>
        </>
    );
}

export default App;
