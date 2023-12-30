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
import { Button } from '@reusable-ui/components';
import { CustomDialog } from './CustomDialog';



function App() {
    const { showDialog, showMessage, showMessageError } = useDialogMessage();
    
    
    
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
                    const event = await showDialog<'yessMase'>(
                        <CustomDialog theme='primary' />
                    ).event();
                    console.log('event: ', event);
                }}>
                    Test Custom Dialog w unwrap
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
