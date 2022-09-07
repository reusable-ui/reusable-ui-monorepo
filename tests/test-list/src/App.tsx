import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    List,
    ListItem,
} from '@reusable-ui/list'
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
                
                <List theme='primary'>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem active={true} actionCtrl={true} href='https://www.google.com'>
                        A fourth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={true}>
                        A fifth item
                    </ListItem>
                </List>
                <List theme='primary' actionCtrl={true}>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem active={true} href='https://www.google.com'>
                        A fourth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={false}>
                        A fifth item
                    </ListItem>
                </List>
            </div>
        </>
    );
}

export default App;
