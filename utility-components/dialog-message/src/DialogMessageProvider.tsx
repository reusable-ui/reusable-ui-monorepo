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
import type {
    // react components:
    ModalActionType,
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page

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
import {
    // types:
    PromiseDialog,
    CancelablePromiseDialog,
    
    
    
    type ModalBaseProps,
    type DialogState,
    
    type FieldErrorList,
    
    
    
    // args:
    type FieldErrorInfo,
    type FetchErrorInfo,
    
    
    
    // dynamic data:
    type FieldErrorTitle,
    type FieldErrorMessage,
    
    type FetchErrorTitle,
    type FetchErrorMessage,
    
    
    
    // options:
    type ShowMessageOptions,
    
    
    
    // states:
    type DialogMessage,
    type DialogMessageError,
    type DialogMessageFieldError,
    type DialogMessageFetchError,
    type DialogMessageSuccess,
    type DialogMessageNotification,
}                           from './types.js'
import {
    // utilities:
    isReactNode,
    isFieldErrorList,
    isError,
    
    isFetchRequestError,
    getFetchErrorCode,
    getFetchErrorMessage,
}                           from './utilities.js'
import {
    // contexts:
    DialogMessageApi,
    DialogMessageContext,
}                           from './DialogMessageContext.js'



// defaults:
const _fieldErrorTitleDefault           : Exclude<FieldErrorTitle  , Function> = undefined;
const _fieldErrorMessageDefault         : Extract<FieldErrorMessage, Function> = ({fieldErrors}) => {
    const isPlural = (
        (fieldErrors instanceof Element)
        ? 1
        : (fieldErrors?.length > 1)
    );
    return (
        <p>
            There {isPlural ? 'are some' : 'is an'} invalid field{isPlural ? 's' : ''} that {isPlural ? 'need' : 'needs'} to be fixed:
        </p>
    );
};
const _fieldErrorIconFindDefault        : NonNullable<DialogMessageFieldError<any>['fieldErrorIconFind'       ]> = (fieldError: Element) => (
    (fieldError as HTMLElement).getAttribute?.('data-icon')
    ||
    ((): string|undefined => {
        let propValue = ((fieldError.parentElement?.previousElementSibling as HTMLElement)?.children?.[0]?.children?.[0] as HTMLElement)?.style?.getPropertyValue?.('--icon-image');
        if (!propValue) return undefined;
        if ((propValue.length >= 2) && ['"', "'"].includes(propValue[0]) && (propValue[0] === propValue[propValue.length - 1])) propValue = propValue.slice?.(1, -1); // remove quote character at the first & last value
        if (propValue.startsWith('url(') && propValue.endsWith(')')) {
            propValue = propValue.slice(4, -1); // remove 'url(' & ')'
            // remove quote character at the first & last value of the url("/blah/foo.svg"):
            if ((propValue.length >= 2) && ['"', "'"].includes(propValue[0]) && (propValue[0] === propValue[propValue.length - 1])) propValue = propValue.slice?.(1, -1);
            propValue = decodeURI(propValue);
            const lastSlash = propValue.lastIndexOf('/');
            if (lastSlash < 0) return propValue;
            propValue = propValue.slice(lastSlash + 1);
            const lastExt = propValue.lastIndexOf('.');
            if (lastExt < 0) return propValue;
            return propValue.slice(0, lastExt);
        } // if
        return propValue;
    })()
    ||
    undefined
);
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



// utilities:
const createPromiseDialog           = <TData extends unknown = unknown>(closeDialog: ((data: TData|undefined) => void), promiseCollapseStart: Promise<void>, promiseCollapseEnd: Promise<void>, getLastExpandedEvent: (() => ModalExpandedChangeEvent<TData>)): PromiseDialog<TData> => {
    const dataPromise = (
        promiseCollapseEnd
        .then(() =>                     // wait until `lastExpandedEvent` is updated
            getLastExpandedEvent().data // now get `lastExpandedEvent` and get `data`
        )
    );
    
    
    
    return new PromiseDialog<TData>((resolve, reject) => {
            dataPromise
            .then(resolve)
            .catch(reject);
        },
        {
            onCloseDialog        : closeDialog,
            onCollapseStartEvent : async (): Promise<ModalExpandedChangeEvent<TData>> => {
                await promiseCollapseStart;     // wait until `lastExpandedEvent` is updated
                return getLastExpandedEvent();  // now get `lastExpandedEvent`
            },
            onCollapseEndEvent   : async (): Promise<ModalExpandedChangeEvent<TData>> => {
                await promiseCollapseEnd;       // wait until `lastExpandedEvent` is updated
                return getLastExpandedEvent();  // now get `lastExpandedEvent`
            },
        }
    );
};
const createCanceledPromiseDialog   = <TData extends unknown = unknown>(): CancelablePromiseDialog<TData> => {
    return new CancelablePromiseDialog<TData>((resolve) => {
            resolve(undefined); // immediately resolved as canceled
        },
        {
            onCloseDialog        : () => {}, // noop
            onCollapseStartEvent : () => Promise.resolve<undefined>(undefined), // immediately resolved as canceled
            onCollapseEndEvent   : () => Promise.resolve<undefined>(undefined), // immediately resolved as canceled
        }
    );
};



// react components:
export interface DialogMessageProviderProps {
    // components:
    modalComponent                   ?: React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeEvent<any>>>
    
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
    const [dialogs, setDialogs] = useState<DialogState<any>[]>([]);
    const idCounter             = useRef<number>(0);
    const isMounted             = useMountedFlag();
    
    
    
    // stable callbacks:
    const showDialog              = useEvent(<TData extends unknown = unknown>(dialogComponent           : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeEvent<TData>>>): PromiseDialog<TData> => {
        // <Dialog> handlers:
        const handleExpandedChange = (event: ModalExpandedChangeEvent<TData>): void => {
            // preserves the original `onExpandedChange` from `dialogComponent`:
            dialogComponent.props.onExpandedChange?.(event);
            
            
            
            // actions:
            dialogState.lastExpandedEvent = event;
            dialogState.expanded          = event.expanded;
            setDialogs((current) => current.slice(0)); // force to re-render
        };
        const handleCloseDialog    = (data: TData|undefined, actionType?: ModalActionType): void => {
            // conditions:
            if (!dialogState.expanded) return; // already closed => noting to do
            
            
            
            // actions:
            handleExpandedChange({
                actionType : actionType ?? '',
                expanded   : false,
                data       : data,
            });
        };
        
        const handleCollapseStart  = (): void => {
            // preserves the original `onCollapseStart` from `dialogComponent`:
            dialogComponent.props.onCollapseStart?.();
            
            
            
            // actions:
            signalCollapseStart(); // signal that the modal is starting_to_close
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
            signalCollapseEnd(); // signal that the modal is fully_closed
        };
        
        
        
        // show a new <Dialog>:
        const dialogState     : DialogState<TData> = {
            dialogComponent   : React.cloneElement<ModalBaseProps<Element, ModalExpandedChangeEvent<TData>>>(dialogComponent,
                // props:
                {
                    // identifiers:
                    key              : dialogComponent.key ?? ++idCounter.current,
                    
                    
                    
                    // handlers:
                    onExpandedChange : handleExpandedChange,
                    onCollapseStart  : handleCollapseStart,
                    onCollapseEnd    : handleCollapseEnd,
                },
            ),
            lastExpandedEvent : undefined,
            
            expanded          : true,
        };
        setDialogs((current) => [...current, dialogState]);
        
        
        
        // when <Dialog> closed:
        let   signalCollapseStart  : () => void;
        let   signalCollapseEnd    : () => void;
        const promiseCollapseStart = new Promise<void>((resolved) => {
              signalCollapseStart  = resolved; // wait until <Dialog> to be starting_to_close by user
        });
        const promiseCollapseEnd   = new Promise<void>((resolved) => {
              signalCollapseEnd    = resolved; // wait until <Dialog> to be fully_closed by user
        });
        const getLastExpandedEvent = () => dialogState.lastExpandedEvent!; // the `lastExpandedEvent` is guaranteed to be set (not undefined) after `promiseCollapseStart`|`promiseCollapseEnd` resolved
        // return dialogState.lastExpandedEvent?.data;
        return createPromiseDialog(
            handleCloseDialog,
            promiseCollapseStart,
            promiseCollapseEnd,
            getLastExpandedEvent,
        );
    });
    
    const showMessage             = useEvent(<TData extends unknown = 'ok'   >(dialogMessage             : DialogMessage<TData>                | React.ReactNode, options?: ShowMessageOptions<TData>): PromiseDialog<TData> => {
        // handle overloads:
        if (isReactNode(dialogMessage, 'message')) {
            return showMessage<TData>({ // recursive call
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
        
        return showDialog<TData>(
            <DialogWithAnswer<Element, TData, ModalExpandedChangeEvent<TData>>
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
    
    const showMessageError        = useEvent(<TData extends unknown = 'ok'   >(dialogMessageError        : DialogMessageError<TData>           | React.ReactNode, options?: ShowMessageOptions<TData>): PromiseDialog<TData> => {
        // handle overloads:
        if (isReactNode(dialogMessageError, 'error')) {
            return showMessageError<TData>({ // recursive call
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
        return showMessage<TData>({
            // contents:
            title,
            message : error,
            
            
            
            // options:
            theme,
            ...restShowMessageOptions,
        });
    });
    const showMessageFieldError   = useEvent(<TData extends unknown = 'ok'   >(dialogMessageFieldError   : DialogMessageFieldError<TData>      | FieldErrorList , options?: ShowMessageOptions<TData>): CancelablePromiseDialog<TData> => {
        // handle overloads:
        if (isFieldErrorList(dialogMessageFieldError, 'fieldErrors')) {
            return showMessageFieldError<TData>({ // recursive call
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
            
            fieldErrors               : fieldErrorsRaw, // take the [fieldErrors] as a part of [error message]
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
        const fieldErrors = (fieldErrorsRaw instanceof Element) ? [fieldErrorsRaw] : fieldErrorsRaw;
        if (!fieldErrors?.length) return createCanceledPromiseDialog(); // no field error => nothing to show => ignore
        
        
        
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
        const promiseDialog = showMessageError<TData>({
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
        try {
            return new CancelablePromiseDialog<TData>((resolve, reject) => {
                    promiseDialog
                    .then(resolve)
                    .catch(reject);
                },
                {
                    onCloseDialog        : promiseDialog.closeDialog,
                    onCollapseStartEvent : promiseDialog.collapseStartEvent,
                    onCollapseEndEvent   : promiseDialog.collapseEndEvent,
                }
            );
        }
        finally {
            promiseDialog.then((): void => {
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
        } // try
    });
    const showMessageFetchError   = useEvent(<TData extends unknown = 'ok'   >(dialogMessageFetchError   : DialogMessageFetchError<TData>      | any            , options?: ShowMessageOptions<TData>): PromiseDialog<TData> => {
        // handle overloads:
        if (isError(dialogMessageFetchError, 'fetchError')) {
            return showMessageFetchError<TData>({ // recursive call
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
        const isRequestError = isFetchRequestError(fetchError); // the request was made but no response was received
        
        let errorCode = getFetchErrorCode(fetchError);
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
        let title : React.ReactNode    = (typeof(fetchErrorTitle  ) === 'function') ? fetchErrorTitle(fetchErrorInfo  ) : fetchErrorTitle;
        if (title === undefined) title = _fetchErrorTitleDefault;
        
        const promiseEvents = (async (): Promise<Pick<PromiseDialog<TData>, 'closeDialog'|'collapseStartEvent'|'collapseEndEvent'>> => {
            const promiseDialog = showMessageError<TData>({
                // contents:
                title,
                error : (
                    (await getFetchErrorMessage(fetchError))
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
            return {
                closeDialog        : promiseDialog.closeDialog,
                collapseStartEvent : promiseDialog.collapseStartEvent,
                collapseEndEvent   : promiseDialog.collapseEndEvent,
            };
        })();
        const closeDialog          = async (data: TData|undefined, actionType?: ModalActionType): Promise<void> => {
            (await promiseEvents).closeDialog(data, actionType);
        };
        let   lastExpandedEvent    : ModalExpandedChangeEvent<TData>|undefined = undefined;
        const promiseCollapseStart = promiseEvents.then(async ({collapseStartEvent}): Promise<void> => {
            const event = await collapseStartEvent(); // wait until <Dialog> to be starting_to_close by user
            lastExpandedEvent = event;
        });
        const promiseCollapseEnd   = promiseEvents.then(async ({collapseEndEvent  }): Promise<void> => {
            const event = await collapseEndEvent();   // wait until <Dialog> to be fully_closed by user
            lastExpandedEvent = event;
        });
        const getLastExpandedEvent = () => lastExpandedEvent!; // the `lastExpandedEvent` is guaranteed to be set (not undefined) after `promiseCollapseStart`|`promiseCollapseEnd` resolved
        return createPromiseDialog(
            closeDialog,
            promiseCollapseStart,
            promiseCollapseEnd,
            getLastExpandedEvent,
        );
    });
    const showMessageSuccess      = useEvent(<TData extends unknown = 'ok'   >(dialogMessageSuccess      : DialogMessageSuccess<TData>         | React.ReactNode, options?: ShowMessageOptions<TData>): PromiseDialog<TData> => {
        // handle overloads:
        if (isReactNode(dialogMessageSuccess, 'success')) {
            return showMessageSuccess<TData>({ // recursive call
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
        return showMessage<TData>({
            // contents:
            title,
            message : success,
            
            
            
            // options:
            theme,
            ...restShowMessageOptions,
        });
    });
    const showMessageNotification = useEvent(<TData extends unknown = 'ok'   >(dialogMessageNotification : DialogMessageNotification<TData>    | React.ReactNode, options?: ShowMessageOptions<TData>): PromiseDialog<TData> => {
        // handle overloads:
        if (isReactNode(dialogMessageNotification, 'notification')) {
            return showMessageNotification<TData>({ // recursive call
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
        return showMessage<TData>({
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
                <DialogWithDelay<Element, any, ModalExpandedChangeEvent<any>>
                    // identifiers:
                    key={dialogComponent.key ?? index}
                    
                    
                    
                    // components:
                    modalComponent={
                        React.cloneElement<ModalBaseProps<Element, ModalExpandedChangeEvent<any>>>(dialogComponent,
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
