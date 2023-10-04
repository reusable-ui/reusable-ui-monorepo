import {
    default as React,
    useState,
    useMemo,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ResponsiveChildrenHandler,
    Fallbacks,
    ResponsiveProvider,
} from '@reusable-ui/responsives'
import {
    // react helper hooks:
    useEvent,
}                           from '@reusable-ui/core'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    // handlers:
    const handleResponsiveChildren = useEvent<ResponsiveChildrenHandler<string>>((currentFallback) =>
        <>
            <article className='responsive-test'>
                <ResponsiveLayout width={currentFallback} />
            </article>
            <article className='responsive-test'>
                <ResponsiveLayout width={currentFallback} />
            </article>
        </>
    );
    const fallbacks = useMemo<Fallbacks<string>>(() => ['1000px', '800px', '600px', '400px'], []);
    
    return (
        <>
            <div className="App">
                <article className='actions'>
                    <button onClick={handleTriggerRerender}>
                        Trigger re-render whole app
                    </button>
                </article>
                <ResponsiveProvider
                    fallbacks={fallbacks}
                >
                    {handleResponsiveChildren}
                </ResponsiveProvider>
            </div>
        </>
    );
}

interface ResponsiveLayoutProps {
    width: string
}
function ResponsiveLayout({ width }: ResponsiveLayoutProps): JSX.Element | null {
    // console.log(`render <ResponsiveLayout width='${width}'>`);
    return (
        <div style={{ width: width }}>resize me</div>
    );
}

export default App;
