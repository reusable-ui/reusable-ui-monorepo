import {
    default as React,
    useState,
    useRef,
    useCallback,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    ButtonIcon
} from '@reusable-ui/button-icon'
import {
    DropdownListButton,
    DropdownListExpandedChangeEvent,
    ListItem,
} from '@reusable-ui/dropdown-list-button'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const handleExpandedChange = useCallback((event: DropdownListExpandedChangeEvent) => {
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
                <DropdownListButton theme='primary' onExpandedChange={handleExpandedChange} buttonChildren='Show menu'>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem>
                        A second item
                    </ListItem>
                    <ListItem theme='success' actionCtrl={false}>
                        A third item
                        <hr />
                        <ButtonIcon theme='primary' tabIndex={1}>Click</ButtonIcon>
                        <ButtonIcon theme='success' tabIndex={0}>Click</ButtonIcon>
                        <ButtonIcon theme='warning' tabIndex={2}>Click</ButtonIcon>
                    </ListItem>
                    <ListItem active={true}>
                        A fourth item
                    </ListItem>
                    <ListItem theme='danger'>
                        A fifth item
                    </ListItem>
                </DropdownListButton>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
