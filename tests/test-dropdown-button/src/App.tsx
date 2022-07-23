import {
    default as React,
    useCallback,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    DropdownButton,
} from '@reusable-ui/dropdown-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { DropdownExpandedChangeEvent } from '@reusable-ui/dropdown';



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const handleExpandedChange = useCallback((event: DropdownExpandedChangeEvent) => {
        console.log('onExpandedChange', event.expanded, event.actionType);
        setShowDropdown(event.expanded);
    }, []);
    
    
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
                <DropdownButton theme='primary' expanded={showDropdown} onExpandedChange={handleExpandedChange} buttonChildren='Show menu'>
                    <div tabIndex={-1}>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                </DropdownButton>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
