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
                
                <hr />
                
                <List theme='primary' mild={false}>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem>
                        A fourth item
                    </ListItem>
                    <ListItem active={true} actionCtrl={true} href='https://www.google.com'>
                        A fifth item
                    </ListItem>
                    <ListItem actionCtrl={true}>
                        A sixth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={true}>
                        A seventh item
                    </ListItem>
                </List>
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
                    <ListItem>
                        A fourth item
                    </ListItem>
                    <ListItem active={true} actionCtrl={true} href='https://www.google.com'>
                        A fifth item
                    </ListItem>
                    <ListItem actionCtrl={true}>
                        A sixth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={true}>
                        A seventh item
                    </ListItem>
                </List>
                <List theme='primary' outlined={true}>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem>
                        A fourth item
                    </ListItem>
                    <ListItem active={true} actionCtrl={true} href='https://www.google.com'>
                        A fifth item
                    </ListItem>
                    <ListItem actionCtrl={true}>
                        A sixth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={true}>
                        A seventh item
                    </ListItem>
                </List>
                
                <hr />
                
                <List theme='primary' actionCtrl={true} mild={false}>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem actionCtrl={false}>
                        A fourth item
                    </ListItem>
                    <ListItem active={true} href='https://www.google.com'>
                        A fifth item
                    </ListItem>
                    <ListItem>
                        A sixth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={false}>
                        A seventh item
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
                    <ListItem actionCtrl={false}>
                        A fourth item
                    </ListItem>
                    <ListItem active={true} href='https://www.google.com'>
                        A fifth item
                    </ListItem>
                    <ListItem>
                        A sixth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={false}>
                        A seventh item
                    </ListItem>
                </List>
                <List theme='primary' actionCtrl={true} outlined={true}>
                    <ListItem>
                        A first item
                    </ListItem>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                    <ListItem actionCtrl={false}>
                        A fourth item
                    </ListItem>
                    <ListItem active={true} href='https://www.google.com'>
                        A fifth item
                    </ListItem>
                    <ListItem>
                        A sixth item
                    </ListItem>
                    <ListItem theme='danger' actionCtrl={false}>
                        A seventh item
                    </ListItem>
                </List>
            </div>
        </>
    );
}

export default App;
