import {
    default as React,
    useState,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    DropdownList,
    ListItem,
} from '@reusable-ui/dropdown-list'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const btnRef = useRef<HTMLButtonElement>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    

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
                <button ref={btnRef} onClick={() => setShowDropdown(!showDropdown)}>
                    I'm here
                </button>
                <DropdownList targetRef={btnRef} theme='primary' active={showDropdown} onActiveChange={(event) => setShowDropdown(event.newActive)}>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem active={true}>
                        A fourth item
                    </ListItem>
                    <ListItem theme='danger'>
                        A fifth item
                    </ListItem>
                </DropdownList>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
