import {
    default as React,
    useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
    EmailInput,
    DateInput,
    TextInput,
} from '@reusable-ui/input'
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
                <article className='actions'>
                    <EmailInput theme='primary' enableValidation={true} placeholder='your@email.com' />
                    <DateInput theme='primary' enableValidation={true} placeholder='birth date' />
                    <TextInput theme='primary' autoComplete='given-name'
                        onKeyDownCapture={(event) => {
                            console.log('down: ', event.nativeEvent);
                            
                            
                            
                            const {
                                isTrusted,
                                
                                altKey,
                                ctrlKey,
                                metaKey,
                                
                                code,
                                key,
                            } = event;
                            const inputElm = event.target as (EventTarget & HTMLInputElement);
                            
                            
                            
                            if (!isTrusted)                       return; // ignore events triggered by script
                            if (altKey || ctrlKey || metaKey)     return; // ignore when [alt] [ctrl] [win] key is pressed
                            if (!code || !key)                    return; // ignore autocomplete event
                            if (!code?.startsWith('Key'))         return; // ignore [backspace] [enter] [tab] etc
                            if (key === key?.toLocaleUpperCase()) return; // ignore uppercase
                            
                            
                            
                            event.preventDefault();  // intercept the user's lowercase input & replace with uppercase
                            // event.stopPropagation(); // mute the event to another event listeners
                            
                            // execute the action on next macroTask:
                            setTimeout(() => {
                                const {
                                    value = '',
                                    selectionStart = value.length,
                                    selectionEnd   = value.length,
                                } = inputElm;
                                
                                const newValue = value.slice(0, selectionStart!) + key.toLocaleUpperCase() + value.slice(selectionEnd!);
                                // (inputElm as any)?._valueTracker?.stopTracking?.(); // react *hack*
                                inputElm.value = newValue;
                                
                                
                                
                                const newSelection = selectionStart! + 1;
                                inputElm.setSelectionRange(newSelection, newSelection);
                                
                                
                                
                                // TODO: triggers:
                                // * keydown
                                // * change
                                // * keyup
                                // inputElm.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, composed: true, code: 'KeyX', key: 'X' }))
                            }, 0);
                        }}
                        onKeyUpCapture={(event) => {
                            console.log('up: ', event.nativeEvent);
                            if (event.isTrusted) {
                                event.preventDefault();
                                // event.stopPropagation();
                            }
                        }}
                        onChange={(event) => {
                            console.log('change: ', event, event.target.value);
                        }}
                    />
                    <TextInput theme='primary' autoCapitalize='sentences'
                        onKeyDown={(event) => {
                            console.log('onKeyDown: ', event, (event.target as any).value);
                        }}
                        onKeyUp={(event) => {
                            console.log('onKeyUp: ', event, (event.target as any).value);
                        }}
                        onChange={(event) => {
                            console.log('onChange: ', event, event.target.value);
                        }}
                        onBlur={(event) => {
                            event.preventDefault();
                        }}
                    />
                </article>
            </div>
        </>
    );
}

export default App;
