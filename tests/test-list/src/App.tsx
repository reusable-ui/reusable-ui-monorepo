// import './libs/cssfn-preload'
import '@cssfn/cssfn-dom'

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



function App() {
    const [value, setValue] = useState(0);
    const handleTriggerRerender = () => {
        setValue(value + 1);
    };
    const [enabled, setEnabled] = useState<boolean>(true);
    const [active , setActive ] = useState<boolean>(false);
    const [localEnabled, setLocalEnabled] = useState<boolean>(true);
    const [localActive , setLocalActive ] = useState<boolean>(false);
    
    
    
    return (
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
                <>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                </>
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
            
            <label htmlFor='chkEnb'><input id='chkEnb' type='checkbox' checked={enabled} onChange={({target: {checked}}) => setEnabled(checked)} /> enabled</label>
            <label htmlFor='chkAct'><input id='chkAct' type='checkbox' checked={active } onChange={({target: {checked}}) =>  setActive(checked)} /> active</label>
            
            <label htmlFor='lChkEnb'><input id='lChkEnb' type='checkbox' checked={localEnabled} onChange={({target: {checked}}) => setLocalEnabled(checked)} /> local enabled</label>
            <label htmlFor='lChkAct'><input id='lChkAct' type='checkbox' checked={localActive } onChange={({target: {checked}}) =>  setLocalActive(checked)} /> local active</label>
            
            <hr />
            
            <List theme='primary' enabled={enabled} active={active}>
                <ListItem enabled={localEnabled} active={localActive}>
                    A first item
                </ListItem>
                <>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                </>
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
                <>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                </>
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
                <>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                </>
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
                <>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                </>
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
                <>
                    <ListItem tag='span' role='presentation'>
                        A second item
                    </ListItem>
                    <ListItem theme='success'>
                        A third item
                    </ListItem>
                </>
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
    );
}

export default App;
