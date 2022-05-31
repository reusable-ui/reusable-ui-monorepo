import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ResponsiveProvider,
} from '@reusable-ui/responsives'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    
    
    return (
        <>
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                <ResponsiveProvider
                    fallbacks={['1000px', '800px', '600px', '400px']}
                >{(currentFallback) =>
                    <article className='responsive-test'>
                        <div style={{ width: currentFallback }}>resize me</div>
                    </article>
                }
                </ResponsiveProvider>
            </div>
        </>
    );
}

export default App;
