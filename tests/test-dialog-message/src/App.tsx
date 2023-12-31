import {
    default as React,
    useState,
    useCallback,
    useMemo,
    useRef,
} from 'react';
// import logo from './logo.svg';
import './App.css';
import '@reusable-ui/typos/effects'
import {
    useDialogMessage,
} from '@reusable-ui/dialog-message'
import {
    Styles,
    HeadPortal,
} from '@cssfn/cssfn-react'
import { Button, Group, Input, Label } from '@reusable-ui/components';
import { CustomDialog } from './CustomDialog';



function App() {
    const { showDialog, showMessage, showMessageError, showMessageFetchError, showMessageFieldError } = useDialogMessage();
    const inputRef = useRef<HTMLInputElement|null>(null);
    
    
    return (
        <>
            <HeadPortal>
                <Styles />
            </HeadPortal>
            <div className="App">
                <button onClick={() => showMessage({
                    theme   : 'primary',
                    title   : <h1>Say Hello</h1>,
                    message : <p>Hello world. This is very <strong>awesome</strong>.</p>,
                }) }>
                    Test dialog 1
                </button>
                <button onClick={() => {
                    const promiseDialog = showMessage<string>({
                        theme   : 'primary',
                        title   : <h1>Say Hello</h1>,
                        message : <p>Hello world. This is very <strong>awesome</strong>.</p>,
                    });
                    
                    promiseDialog.collapseEndEvent().then((event) =>
                        console.log('collapseEndEvent: ', event)
                    );
                    
                    setTimeout(() => {
                        promiseDialog.closeDialog('beuh...', 'timedout');
                    }, 3000);
                }}>
                    Test dialog with TO
                </button>
                <button onClick={() => {
                    const showQuestion = async () => {
                        const answer = await showMessageError<'abort'|'retry'|'ignore'|'again'|symbol>({
                            error: <p>Oops! An error occured. Please try again</p>,
                            options : {
                                abort  : <Button theme='danger'>Abort</Button>,
                                retry  : <Button autoFocus={true} theme='success'>Retry</Button>,
                                ignore : <Button theme='secondary'>Ignore</Button>,
                                again  : <Button theme='warning' onClick={(event) => {
                                    showQuestion();
                                    event.preventDefault();
                                }}>Again</Button>,
                                [Symbol('mehh')] : <Button theme='danger'>Mehh</Button>,
                                [Symbol('bleh')] : <Button theme='success'>Blehh</Button>,
                            },
                        });
                        console.log(answer);
                    };
                    showQuestion();
                }}>
                    Test error dialog
                </button>
                <button onClick={async () => {
                    const answer = await showDialog<'yessMase'>(
                        <CustomDialog theme='primary' />
                    );
                    console.log(answer);
                }}>
                    Test Custom Dialog
                </button>
                <button onClick={async () => {
                    const collapseEndEvent = await showDialog<'yessMase'>(
                        <CustomDialog theme='primary' />
                    ).collapseEndEvent();
                    console.log('collapseEndEvent: ', collapseEndEvent);
                }}>
                    Test Custom Dialog w collapseEndEvent
                </button>
                <button onClick={async () => {
                    const promiseDialog = showMessageFetchError(
                        new TypeError('Uh oh... Something is wrong!', { cause: 404 })
                    );
                    promiseDialog.collapseStartEvent().then( (collapseStartEvent) => console.log('collapseStartEvent: ', collapseStartEvent, Date.now()));
                    promiseDialog.collapseEndEvent().then(   (collapseEndEvent)   => console.log('collapseEndEvent: '  , collapseEndEvent  , Date.now()));
                }}>
                    Test Fetch Error
                </button>
                <Group>
                    <Label className='solid'>Favorite Pet</Label>
                    <Input className='fluid' type='text' theme='primary' outerRef={inputRef} placeholder='Favorite Pet' />
                </Group>
                <button onClick={async () => {
                    const answer = await showMessageFieldError([inputRef.current!]);
                    console.log(answer);
                }}>
                    Test Field Error
                </button>
                <button onClick={async () => {
                    const answer = await showMessageFieldError(inputRef.current!);
                    console.log(answer);
                }}>
                    Test Field Error Singular
                </button>
                <button onClick={async () => {
                    const answer = await showMessageFieldError([]);
                    console.log(answer);
                }}>
                    Test Field Error Empty
                </button>
                <button onClick={async () => {
                    const answer = await showMessageFieldError(null);
                    console.log(answer);
                }}>
                    Test Field Error Empty Singular
                </button>
                <button onClick={async () => {
                    const promiseDialog = showMessageFieldError<string>([inputRef.current!]);
                    
                    promiseDialog.collapseEndEvent().then((event) =>
                        console.log('collapseEndEvent: ', event)
                    );
                    
                    setTimeout(() => {
                        promiseDialog.closeDialog('beuh...', 'timedout');
                    }, 3000);
                }}>
                    Test Field Error w TO
                </button>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore debitis, tempore sapiente possimus ratione velit voluptatibus quidem accusamus odio illo voluptate esse delectus et fugiat voluptatum voluptatem. Fuga, provident.</p>
            </div>
        </>
    );
}

export default App;
