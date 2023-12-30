// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useMemo,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMountedFlag,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    IconProps,
    Icon,
}                           from '@reusable-ui/icon'            // an icon component
import type {
    // react components:
    ButtonProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    // react components:
    ListItemProps,
    ListItem,
    
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content
import type {
    // react components:
    CardHeaderProps,
    CardFooterProps,
    CardBodyProps,
    
    CardComponentProps,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer

// internal components:
import {
    // react components:
    DialogWithAnswer,
}                           from './DialogWithAnswer.js'
import {
    // react components:
    DialogWithDelay,
}                           from './DialogWithDelay.js'

// internals:
import type {
    // types:
    ModalExpandedChangeWithAnswerEvent,
    ModalBaseProps,
    DialogState,
    
    FieldErrorList,
    
    
    
    // args:
    FieldErrorInfo,
    FetchErrorInfo,
    
    
    
    // dynamic data:
    FieldErrorTitle,
    FieldErrorMessage,
    
    FetchErrorTitle,
    FetchErrorMessage,
    
    
    
    // options:
    ShowMessageOptions,
    
    
    
    // states:
    DialogMessage,
    DialogMessageError,
    DialogMessageFieldError,
    DialogMessageFetchError,
    DialogMessageSuccess,
    DialogMessageNotification,
}                           from './types.js'
import {
    // utilities:
    paragraphify,
    
    isTypeError,
    
    isReactNode,
    isFieldErrorList,
    isError,
}                           from './utilities.js'
import {
    // contexts:
    DialogMessageApi,
    DialogMessageContext,
}                           from './DialogMessageContext.js'



// defaults:
const _fieldErrorTitleDefault           : Exclude<FieldErrorTitle  , Function> = undefined;
const _fieldErrorMessageDefault         : Extract<FieldErrorMessage, Function> = ({fieldErrors}) => {
    const isPlural = (fieldErrors?.length > 1);
    return (
        <p>
            There {isPlural ? 'are some' : 'is an'} invalid field{isPlural ? 's' : ''} that {isPlural ? 'need' : 'needs'} to be fixed:
        </p>
    );
};
const _fieldErrorIconFindDefault        : NonNullable<DialogMessageFieldError<any>['fieldErrorIconFind'       ]> = (fieldError: Element) => (fieldError as HTMLElement).getAttribute?.('data-icon' ) || (((fieldError.parentElement?.previousElementSibling as HTMLElement)?.children?.[0]?.children?.[0] as HTMLElement)?.style?.getPropertyValue?.('--icon-image') || undefined)?.slice?.(1, -1);
const _fieldErrorIconDefault            : NonNullable<DialogMessageFieldError<any>['fieldErrorIcon'           ]> = 'text_fields';
const _fieldErrorLabelFindDefault       : NonNullable<DialogMessageFieldError<any>['fieldErrorLabelFind'      ]> = (fieldError: Element) => (fieldError as HTMLElement).getAttribute?.('aria-label') || (fieldError.children?.[0] as HTMLInputElement)?.placeholder;
const _fieldErrorAutoFocusDefault       : NonNullable<DialogMessageFieldError<any>['fieldErrorAutoFocus'      ]> = true;
const _fieldErrorAutoFocusScrollDefault : NonNullable<DialogMessageFieldError<any>['fieldErrorAutoFocusScroll']> = true;

const _fetchErrorTitleDefault           : Exclude<FetchErrorTitle  , Function> = undefined;
const _fetchErrorMessageDefault         : Extract<FetchErrorMessage, Function> = ({isRequestError, isServerError}) => <>
    <p>
        Oops, there was an error processing the command.
    </p>
    {isRequestError && <p>
        There was a <strong>problem contacting our server</strong>.
        <br />
        Make sure your internet connection is available.
    </p>}
    {isServerError && <p>
        There was a <strong>problem on our server</strong>.
        <br />
        The server may be busy or currently under maintenance.
    </p>}
    {isServerError && <p>
        Please try again in a few minutes.
        <br />
        If the problem still persists, please contact our technical support.
    </p>}
</>;



// react components:
export interface DialogMessageProviderProps {
    // components:
    modalComponent                   ?: React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<any>>>
    
    cardComponent                    ?: CardComponentProps<Element>['cardComponent']
    cardHeaderComponent              ?: React.ReactComponentElement<any, CardHeaderProps<Element>>
    cardBodyComponent                ?: React.ReactComponentElement<any, CardBodyProps<Element>>
    cardFooterComponent              ?: React.ReactComponentElement<any, CardFooterProps<Element>>
    
    closeButtonComponent             ?: React.ReactComponentElement<any, ButtonProps>
    answerButtonComponent            ?: React.ReactComponentElement<any, ButtonProps>
    answerOkButtonComponent          ?: React.ReactComponentElement<any, ButtonProps>
    
    fieldErrorTitleDefault           ?: DialogMessageFieldError<any>['fieldErrorTitle']
    fieldErrorMessageDefault         ?: DialogMessageFieldError<any>['fieldErrorMessage']
    fieldErrorListComponent          ?: React.ReactComponentElement<any, ListProps<Element>>
    fieldErrorListItemComponent      ?: React.ReactComponentElement<any, ListItemProps<Element>>
    fieldErrorIconFindDefault        ?: DialogMessageFieldError<any>['fieldErrorIconFind']
    fieldErrorIconDefault            ?: DialogMessageFieldError<any>['fieldErrorIcon']
    fieldErrorIconComponent          ?: React.ReactComponentElement<any, IconProps<Element>>
    fieldErrorLabelFindDefault       ?: DialogMessageFieldError<any>['fieldErrorLabelFind']
    fieldErrorAutoFocusDefault       ?: DialogMessageFieldError<any>['fieldErrorAutoFocus']
    fieldErrorAutoFocusScrollDefault ?: DialogMessageFieldError<any>['fieldErrorAutoFocusScroll']
    
    fetchErrorTitleDefault           ?: DialogMessageFetchError<any>['fetchErrorTitle']
    fetchErrorMessageDefault         ?: DialogMessageFetchError<any>['fetchErrorMessage']
}
const DialogMessageProvider = (props: React.PropsWithChildren<DialogMessageProviderProps>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        modalComponent,
        
        cardComponent,
        cardHeaderComponent,
        cardBodyComponent,
        cardFooterComponent,
        
        closeButtonComponent,
        answerButtonComponent,
        answerOkButtonComponent,
        
        fieldErrorTitleDefault           = _fieldErrorTitleDefault,
        fieldErrorMessageDefault         = _fieldErrorMessageDefault,
        fieldErrorListComponent          = (<List<Element> listStyle='flat'          /> as React.ReactComponentElement<any, ListProps<Element>>),
        fieldErrorListItemComponent      = (<ListItem<Element>                       /> as React.ReactComponentElement<any, ListItemProps<Element>>),
        fieldErrorIconFindDefault        = _fieldErrorIconFindDefault,
        fieldErrorIconDefault            = _fieldErrorIconDefault,
        fieldErrorIconComponent          = (<Icon<Element> icon={undefined as any}   /> as React.ReactComponentElement<any, IconProps<Element>>),
        fieldErrorLabelFindDefault       = _fieldErrorLabelFindDefault,
        fieldErrorAutoFocusDefault       = _fieldErrorAutoFocusDefault,
        fieldErrorAutoFocusScrollDefault = _fieldErrorAutoFocusScrollDefault,
        
        fetchErrorTitleDefault           = _fetchErrorTitleDefault,
        fetchErrorMessageDefault         = _fetchErrorMessageDefault,
        
        
        
        // children:
        children,
    } = props;
    
    
    
    // states:
    const [dialogs, setDialogs] = useState<DialogState[]>([]);
    const idCounter             = useRef<number>(0);
    const isMounted             = useMountedFlag();
    
    
    
    // stable callbacks:
    const showDialog              = useEvent(async <TData extends keyof any = any >(dialogComponent           : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<TData>>>): Promise<TData|undefined> => {
        // <Dialog> handlers:
        const handleExpandedChange = (event: ModalExpandedChangeWithAnswerEvent<TData>): void => {
            // preserves the original `onExpandedChange` from `dialogComponent`:
            dialogComponent.props.onExpandedChange?.(event);
            
            
            
            // actions:
            dialogState.lastExpandedEvent = event;
            dialogState.expanded          = event.expanded;
            setDialogs((current) => current.slice(0)); // force to re-render
        };
        
        const handleCollapseEnd    = (): void => {
            // preserves the original `onCollapseEnd` from `dialogComponent`:
            dialogComponent.props.onCollapseEnd?.();
            
            
            
            // actions:
            setDialogs((current) => {
                const foundIndex = current.indexOf(dialogState);
                if (foundIndex < 0) return current; // not found
                // return current.toSpliced(foundIndex, 1);
                const copy = current.slice(0);
                copy.splice(foundIndex, 1);
                return copy;
            });
            closeResolved(); // signal that the modal is fully closed
        };
        
        
        
        // show a new <Dialog>:
        const dialogState     : DialogState<TData> = {
            dialogComponent   : React.cloneElement<ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<TData>>>(dialogComponent,
                // props:
                {
                    // identifiers:
                    key              : dialogComponent.key ?? ++idCounter.current,
                    
                    
                    
                    // handlers:
                    onExpandedChange : handleExpandedChange,
                    onCollapseEnd    : handleCollapseEnd,
                },
            ),
            lastExpandedEvent : undefined,
            
            expanded          : true,
        };
        setDialogs((current) => [...current, dialogState]);
        
        
        
        // when <Dialog> closed:
        let   closeResolved   : () => void;
        await new Promise<void>((resolved) => {
              closeResolved   = resolved; // wait until <Dialog> to be closed by user
        });
        return dialogState.lastExpandedEvent?.answer;
    });
    
    const showMessage             = useEvent(async <TData extends keyof any = 'ok'>(dialogMessage             : DialogMessage<TData>                        | React.ReactNode, options?: ShowMessageOptions<TData>): Promise<TData|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessage, 'message')) {
            return await showMessage({ // recursive call
                // contents:
                message : dialogMessage,
                
                
                
                // options:
                ...options, // DialogMessage extends ShowMessageOptions
            });
        } // if
        
        
        
        // show a new message:
        const {
            title   : modalTitle,
            message : modalMessage,
            options : answerOptions,
        ...restModalBaseProps} = dialogMessage;
        
        return showDialog(
            <DialogWithAnswer<Element, TData, ModalExpandedChangeWithAnswerEvent<TData>>
                // other props:
                {...restModalBaseProps}
                
                
                
                // options:
                answerOptions={answerOptions}
                
                
                
                // accessibilities:
                modalTitle={modalTitle}
                modalMessage={modalMessage}
                
                
                
                // components:
                modalComponent={modalComponent}
                
                cardComponent={cardComponent}
                cardHeaderComponent={cardHeaderComponent}
                cardBodyComponent={cardBodyComponent}
                cardFooterComponent={cardFooterComponent}
                
                closeButtonComponent={closeButtonComponent}
                answerButtonComponent={answerButtonComponent}
                answerOkButtonComponent={answerOkButtonComponent}
            />
        );
    });
    
    const showMessageError        = useEvent(async <TData extends keyof any = 'ok'>(dialogMessageError        : DialogMessageError<TData>                   | React.ReactNode, options?: ShowMessageOptions<TData>): Promise<TData|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessageError, 'error')) {
            return await showMessageError({ // recursive call
                // contents:
                error : dialogMessageError,
                
                
                
                // options:
                ...options, // DialogMessageError extends ShowMessageOptions
            });
        } // if
        
        
        
        // defaults:
        const {
            // contents:
            title  = <h1>Error</h1>, // if [title] not defined => defaults to 'Error'
            error,                   // take the [error] as [message]
            
            
            
            // options:
            theme  = 'danger',       // if [theme] not defined => defaults to 'danger'
        ...restShowMessageOptions} = dialogMessageError;
        
        
        
        // show message:
        return await showMessage({
            // contents:
            title,
            message : error,
            
            
            
            // options:
            theme,
            ...restShowMessageOptions,
        });
    });
    const showMessageFieldError   = useEvent(async <TData extends keyof any = 'ok'>(dialogMessageFieldError   : DialogMessageFieldError<TData>              | FieldErrorList , options?: ShowMessageOptions<TData>): Promise<TData|undefined> => {
        // handle overloads:
        if (isFieldErrorList(dialogMessageFieldError, 'fieldErrors')) {
            return await showMessageFieldError({ // recursive call
                // contents:
                fieldErrors : dialogMessageFieldError,
                
                
                
                // options:
                ...options, // DialogMessageFieldError extends ShowMessageOptions
            });
        } // if
        
        
        
        // defaults:
        const {
            // contents:
            fieldErrorTitle           = fieldErrorTitleDefault,
            
            fieldErrors,              // take the [fieldErrors] as a part of [error message]
            fieldErrorMessage         = fieldErrorMessageDefault,
            fieldErrorIconFind        = fieldErrorIconFindDefault,
            fieldErrorIcon            = fieldErrorIconDefault,
            fieldErrorLabelFind       = fieldErrorLabelFindDefault,
            fieldErrorAutoFocus       = fieldErrorAutoFocusDefault,
            fieldErrorAutoFocusScroll = fieldErrorAutoFocusScrollDefault,
            
            
            
            // contexts:
            context,            // take the [context] to be passed into title|message constructor
        ...restShowMessageOptions} = dialogMessageFieldError;
        
        
        
        // conditions:
        if (!fieldErrors?.length) return; // no field error => nothing to show => ignore
        
        
        
        // populate data:
        const fieldErrorInfo : FieldErrorInfo = {
            // data:
            fieldErrors,
            
            
            
            // contexts:
            context,
        };
        
        
        
        // show message:
        let title   : React.ReactNode      = (typeof(fieldErrorTitle  ) === 'function') ? fieldErrorTitle(fieldErrorInfo  ) : fieldErrorTitle;
        if (title   === undefined) title   = _fieldErrorTitleDefault;
        let message : React.ReactNode      = (typeof(fieldErrorMessage) === 'function') ? fieldErrorMessage(fieldErrorInfo) : fieldErrorMessage;
        if (message === undefined) message = _fieldErrorMessageDefault(fieldErrorInfo);
        await showMessageError({
            // contents:
            title,
            error : <>
                {message}
                {/* <List> */}
                {React.cloneElement<ListProps<Element>>(fieldErrorListComponent,
                    // props:
                    undefined,
                    
                    
                    
                    // children:
                    (fieldErrorListComponent.props.children ?? Array.from(fieldErrors).map((fieldError, index) =>
                        React.cloneElement<ListItemProps<Element>>(fieldErrorListItemComponent,
                            // props:
                            {
                                key : fieldErrorListItemComponent.key ?? index,
                            },
                            
                            
                            
                            // children:
                            (fieldErrorListItemComponent.props.children ?? ((): React.ReactNode => {
                                let icon : DialogMessageFieldError<TData>['fieldErrorIcon']|null = fieldErrorIconComponent.props.icon;
                                if (icon === undefined) icon = fieldErrorIconFind(fieldError);
                                if (icon === undefined) icon = fieldErrorIcon;
                                const label = fieldErrorLabelFind(fieldError);
                                return (<>
                                    {!!icon && React.cloneElement<IconProps<Element>>(fieldErrorIconComponent,
                                        // props:
                                        {
                                            // appearances:
                                            icon : icon,
                                        },
                                    )}
                                    {!!icon && !!label && <>
                                        &nbsp;
                                    </>}
                                    {label}
                                </>);
                            })()),
                        )
                    )),
                )}
            </>,
            
            
            
            // options:
            ...restShowMessageOptions,
        });
        if (!isMounted.current) return; // unmounted => abort
        
        
        
        // focus the first fieldError:
        if (fieldErrorAutoFocus) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    const focusableSelector = ':is(button, [href], input, select, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex], iframe):not([tabindex="-1"])';
                    const firstFieldError   = fieldErrors?.[0];
                    const firstFocusableElm = (firstFieldError.matches(focusableSelector) ? firstFieldError : firstFieldError?.querySelector(focusableSelector)) as HTMLElement|null;
                    if (fieldErrorAutoFocusScroll) {
                        firstFieldError.scrollIntoView({
                            block    : 'start',
                            behavior : 'smooth',
                        });
                    } // if
                    firstFocusableElm?.focus?.({ preventScroll: true });
                }); // wait until mouseup|keyup fired of the <TriggerButton> (if any)
            }, 0); // wait until mouseup|keyup fired of the <TriggerButton> (if any)
        } // if
    });
    const showMessageFetchError   = useEvent(async <TData extends keyof any = 'ok'>(dialogMessageFetchError   : DialogMessageFetchError<TData>              | any            , options?: ShowMessageOptions<TData>): Promise<TData|undefined> => {
        // handle overloads:
        if (isError(dialogMessageFetchError, 'fetchError')) {
            return await showMessageFetchError({ // recursive call
                // contents:
                fetchError : dialogMessageFetchError,
                
                
                
                // options:
                ...options, // DialogMessageFetchError extends ShowMessageOptions
            });
        } // if
        dialogMessageFetchError = dialogMessageFetchError as unknown as (DialogMessageFetchError<TData>|false); // for satisfying TS
        
        
        
        // defaults:
        const {
            // contents:
            fetchErrorTitle   = fetchErrorTitleDefault,
            
            fetchError,       // take the [fetchError] as a part of [error message]
            fetchErrorMessage = fetchErrorMessageDefault,
            
            
            
            // contexts:
            context,          // take the [context] to be passed into title|message constructor
        ...restShowMessageOptions} = dialogMessageFetchError;
        
        
        
        // populate data:
        const isRequestError = (  // the request was made but no response was received
            // axios'  error request:
            !!fetchError?.request // the request property must be exist
            ||
            // rtkq's  error request:
            isTypeError(fetchError?.error)
            ||
            // fetch's error request:
            isTypeError(fetchError)
        );
        
        let errorCode = (
            // axios'  error status code:
            fetchError?.response?.status
            ??
            // rtkq's  error status code:
            fetchError?.status
            ??
            // fetch's error status code:
            fetchError?.cause?.status // passing a `Response` object
            ??
            fetchError?.cause         // passing a `Response`'s status code
        );
        if (typeof(errorCode) !== 'number') errorCode = 0; // ignore if the code is not a number
        const isClientError  = (errorCode >= 400) && (errorCode <= 499); // 400-499
        const isServerError  = (errorCode >= 500) && (errorCode <= 599); // 500-599
        
        const fetchErrorInfo : FetchErrorInfo = {
            // data:
            isRequestError,
            isClientError,
            isServerError,
            
            errorCode,
            error : fetchError,
            
            
            
            // contexts:
            context,
        };
        
        
        
        // show message:
        let title   : React.ReactNode      = (typeof(fetchErrorTitle  ) === 'function') ? fetchErrorTitle(fetchErrorInfo  ) : fetchErrorTitle;
        if (title   === undefined) title   = _fetchErrorTitleDefault;
        await showMessageError({
            // contents:
            title,
            error : (
                // axios'  human_readable server error   response:
                // axios'  human_readable server message response:
                // rtkq's  human_readable server error   response:
                // rtkq's  human_readable server message response:
                ((): React.ReactElement|undefined => {
                    const data = (
                        fetchError?.response?.data // axios' response data
                        ??
                        fetchError?.data           // rtkq's response data
                    );
                    
                    
                    
                    // response as json:
                    if (typeof(data) === 'object') {
                        const error   = data?.error;
                        if ((typeof(error)   === 'string') && !!error  ) return paragraphify(error);   // not an empty string => a valid error message
                        
                        const message = data?.message;
                        if ((typeof(message) === 'string') && !!message) return paragraphify(message); // not an empty string => a valid error message
                    }
                    // response as text:
                    else if (typeof(data) === 'string') {
                        if (!!data) return paragraphify(data); // not an empty string => a valid error message
                    } // if
                    
                    
                    
                    return undefined; // unknown response format => skip
                })()
                ??
                // fetch's human_readable server error   response:
                // fetch's human_readable server message response:
                (await (async (): Promise<React.ReactElement|undefined> => {
                    // conditions:
                    const response = fetchError?.cause; // a `Response` object passed on Error('string', Response)
                    if (!(response instanceof Response)) return undefined; // not a `Response` object => skip
                    const contentType = response.headers.get('Content-Type');
                    if (!contentType) return undefined; // no 'Content-Type' defined => skip
                    
                    
                    
                    // response as json:
                    if ((/^application\/json/i).test(contentType)) {
                        try {
                            const data    = await response.json();
                            
                            const error   = data?.error;
                            if ((typeof(error)   === 'string') && !!error  ) return paragraphify(error);   // not an empty string => a valid error message
                            
                            const message = data?.message;
                            if ((typeof(message) === 'string') && !!message) return paragraphify(message); // not an empty string => a valid error message
                        }
                        catch {
                            return undefined; // parse failed => skip
                        } // try
                    }
                    // response as text:
                    else if ((/^text/i).test(contentType)) {
                        try {
                            const text = await response.text();
                            
                            if (!!text) return paragraphify(text); // not an empty string => a valid error message
                        }
                        catch {
                            return undefined; // parse failed => skip
                        } // try
                    } // if
                    
                    
                    
                    return undefined; // unknown response format => skip
                })())
                ??
                // if there is a request/client/server error => assumes as a connection problem:
                ((): React.ReactNode => {
                    let message : React.ReactNode      = (typeof(fetchErrorMessage) === 'function') ? fetchErrorMessage(fetchErrorInfo) : fetchErrorMessage;
                    if (message === undefined) message = _fetchErrorMessageDefault(fetchErrorInfo);
                    return message;
                })()
            ),
            
            
            
            // options:
            ...restShowMessageOptions,
        });
    });
    const showMessageSuccess      = useEvent(async <TData extends keyof any = 'ok'>(dialogMessageSuccess      : DialogMessageSuccess<TData>                 | React.ReactNode, options?: ShowMessageOptions<TData>): Promise<TData|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessageSuccess, 'success')) {
            return await showMessageSuccess({ // recursive call
                // contents:
                success : dialogMessageSuccess,
                
                
                
                // options:
                ...options, // DialogMessageSuccess extends ShowMessageOptions
            });
        } // if
        
        
        
        // defaults:
        const {
            // contents:
            title  = <h1>Success</h1>, // if [title] not defined => defaults to 'Success'
            success,                   // take the [success] as [message]
            
            
            
            // options:
            theme  = 'success',        // if [theme] not defined => defaults to 'success'
        ...restShowMessageOptions} = dialogMessageSuccess;
        
        
        
        // show message:
        return await showMessage({
            // contents:
            title,
            message : success,
            
            
            
            // options:
            theme,
            ...restShowMessageOptions,
        });
    });
    const showMessageNotification = useEvent(async <TData extends keyof any = 'ok'>(dialogMessageNotification : DialogMessageNotification<TData>            | React.ReactNode, options?: ShowMessageOptions<TData>): Promise<TData|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessageNotification, 'notification')) {
            return await showMessageNotification({ // recursive call
                // contents:
                notification : dialogMessageNotification,
                
                
                
                // options:
                ...options, // DialogMessageNotification extends ShowMessageOptions
            });
        } // if
        
        
        
        // defaults:
        const {
            // contents:
            title  = <h1>Notification</h1>, // if [title] not defined => defaults to 'Notification'
            notification,                   // take the [notification] as [message]
            
            
            
            // options:
            theme  = 'primary',             // if [theme] not defined => defaults to 'primary'
        ...restShowMessageOptions} = dialogMessageNotification;
        
        
        
        // show message:
        return await showMessage({
            // contents:
            title,
            message : notification,
            
            
            
            // options:
            theme,
            ...restShowMessageOptions,
        });
    });
    
    
    
    // apis:
    const dialogMessageApi = useMemo<DialogMessageApi>(() => ({
        // dialogs:
        showDialog,              // stable ref
        showMessage,             // stable ref
        showMessageError,        // stable ref
        showMessageFieldError,   // stable ref
        showMessageFetchError,   // stable ref
        showMessageSuccess,      // stable ref
        showMessageNotification, // stable ref
    }), []);
    
    
    
    // jsx:
    return (
        <DialogMessageContext.Provider value={dialogMessageApi}>
            {children}
            
            {dialogs.map(({dialogComponent, expanded}, index) =>
                <DialogWithDelay<Element, any, ModalExpandedChangeWithAnswerEvent<any|'ok'>>
                    // identifiers:
                    key={dialogComponent.key ?? index}
                    
                    
                    
                    // components:
                    modalComponent={
                        React.cloneElement<ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<any>>>(dialogComponent,
                            // props:
                            {
                                // states:
                                expanded : dialogComponent.props.expanded ?? expanded,
                            },
                        )
                    }
                />
            )}
        </DialogMessageContext.Provider>
    );
};
export {
    DialogMessageProvider,
    DialogMessageProvider as default,
}
