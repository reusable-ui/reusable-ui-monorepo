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
    EventHandler,
    useMergeEvents,
    useMountedFlag,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    IconProps,
    Icon,
}                           from '@reusable-ui/icon'            // an icon component
import {
    // react components:
    ButtonProps,
    Button,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    // react components:
    CloseButton,
}                           from '@reusable-ui/close-button'    // a close button component
import {
    // react components:
    ListItemProps,
    ListItem,
    
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content
import {
    // react components:
    CardHeaderProps,
    CardHeader,
    
    CardFooterProps,
    CardFooter,
    
    CardBodyProps,
    CardBody,
    
    CardProps,
    Card,
    
    CardComponentProps,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer
import type {
    // react components:
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page
import {
    // react components:
    ModalStatusProps,
    ModalStatus,
}                           from '@reusable-ui/modal-status'    // overlays a card dialog to the entire site's page

// internal components:
import {
    // react components:
    ButtonWithAnswer,
}                           from './ButtonWithAnswer.js'

// internals:
import type {
    // types:
    FieldErrorList,
    AnswerButtonComponentOrChildren,
    AnswerOptionList,
    
    
    
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
const _fieldErrorTitleDefault     : Exclude<FieldErrorTitle  , Function> = undefined;
const _fieldErrorMessageDefault   : Extract<FieldErrorMessage, Function> = ({fieldErrors}) => {
    const isPlural = (fieldErrors?.length > 1);
    return (
        <p>
            There {isPlural ? 'are some' : 'is an'} invalid field{isPlural ? 's' : ''} that {isPlural ? 'need' : 'needs'} to be fixed:
        </p>
    );
};
const _fieldErrorIconFindDefault  : NonNullable<DialogMessageFieldError<any>['fieldErrorIconFind' ]> = (fieldError: Element) => ((fieldError.parentElement?.previousElementSibling as HTMLElement)?.children?.[0]?.children?.[0] as HTMLElement)?.style?.getPropertyValue?.('--icon-image')?.slice?.(1, -1);
const _fieldErrorIconDefault      : NonNullable<DialogMessageFieldError<any>['fieldErrorIcon'     ]> = 'text_fields';
const _fieldErrorLabelFindDefault : NonNullable<DialogMessageFieldError<any>['fieldErrorLabelFind']> = (fieldError: Element) => (fieldError as HTMLElement).getAttribute?.('aria-label') || (fieldError.children?.[0] as HTMLInputElement)?.placeholder;
const _fieldErrorFocusDefault     : NonNullable<DialogMessageFieldError<any>['fieldErrorFocus'    ]> = true;

const _fetchErrorTitleDefault     : Exclude<FetchErrorTitle  , Function> = undefined;
const _fetchErrorMessageDefault   : Extract<FetchErrorMessage, Function> = ({isRequestError, isServerError}) => <>
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
    modalStatusComponent         ?: React.ReactComponentElement<any, ModalStatusProps<Element>>
    
    cardComponent                ?: CardComponentProps<Element>['cardComponent']
    cardHeaderComponent          ?: React.ReactComponentElement<any, CardHeaderProps<Element>>
    cardBodyComponent            ?: React.ReactComponentElement<any, CardBodyProps<Element>>
    cardFooterComponent          ?: React.ReactComponentElement<any, CardFooterProps<Element>>
    
    closeButtonComponent         ?: React.ReactComponentElement<any, ButtonProps>
    answerButtonComponent        ?: React.ReactComponentElement<any, ButtonProps>
    answerOkButtonComponent      ?: React.ReactComponentElement<any, ButtonProps>
    
    fieldErrorTitleDefault       ?: DialogMessageFieldError<any>['fieldErrorTitle']
    fieldErrorMessageDefault     ?: DialogMessageFieldError<any>['fieldErrorMessage']
    fieldErrorListComponent      ?: React.ReactComponentElement<any, ListProps<Element>>
    fieldErrorListItemComponent  ?: React.ReactComponentElement<any, ListItemProps<Element>>
    fieldErrorIconFindDefault    ?: DialogMessageFieldError<any>['fieldErrorIconFind']
    fieldErrorIconDefault        ?: DialogMessageFieldError<any>['fieldErrorIcon']
    fieldErrorIconComponent      ?: React.ReactComponentElement<any, IconProps<Element>>
    fieldErrorLabelFindDefault   ?: DialogMessageFieldError<any>['fieldErrorLabelFind']
    fieldErrorFocusDefault       ?: DialogMessageFieldError<any>['fieldErrorFocus']
    
    fetchErrorTitleDefault       ?: DialogMessageFetchError<any>['fetchErrorTitle']
    fetchErrorMessageDefault     ?: DialogMessageFetchError<any>['fetchErrorMessage']
}
const DialogMessageProvider = (props: React.PropsWithChildren<DialogMessageProviderProps>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        modalStatusComponent        = (<ModalStatus modalCardStyle='scrollable' /> as React.ReactComponentElement<any, ModalStatusProps<Element>>),
        
        cardComponent               = (<Card<Element>                           /> as React.ReactComponentElement<any, CardProps<Element>>),
        cardHeaderComponent         = (<CardHeader<Element>                     /> as React.ReactComponentElement<any, CardHeaderProps<Element>>),
        cardBodyComponent           = (<CardBody<Element>                       /> as React.ReactComponentElement<any, CardBodyProps<Element>>),
        cardFooterComponent         = (<CardFooter<Element>                     /> as React.ReactComponentElement<any, CardFooterProps<Element>>),
        
        closeButtonComponent        = (<CloseButton                             /> as React.ReactComponentElement<any, ButtonProps>),
        answerButtonComponent       = (<Button                                  /> as React.ReactComponentElement<any, ButtonProps>),
        answerOkButtonComponent     = React.cloneElement<ButtonProps>(answerButtonComponent,
            // props:
            {
                // accessibilities:
                autoFocus : answerButtonComponent.props.autoFocus ?? true,
            },
            
            
            
            // children:
            answerButtonComponent.props.children ?? 'Okay',
        ),
        
        fieldErrorTitleDefault      = _fieldErrorTitleDefault,
        fieldErrorMessageDefault    = _fieldErrorMessageDefault,
        fieldErrorListComponent     = (<List<Element> listStyle='flat'          /> as React.ReactComponentElement<any, ListProps<Element>>),
        fieldErrorListItemComponent = (<ListItem<Element>                       /> as React.ReactComponentElement<any, ListItemProps<Element>>),
        fieldErrorIconFindDefault   = _fieldErrorIconFindDefault,
        fieldErrorIconDefault       = _fieldErrorIconDefault,
        fieldErrorIconComponent     = (<Icon<Element> icon={undefined as any}   /> as React.ReactComponentElement<any, IconProps<Element>>),
        fieldErrorLabelFindDefault  = _fieldErrorLabelFindDefault,
        fieldErrorFocusDefault      = _fieldErrorFocusDefault,
        
        fetchErrorTitleDefault      = _fetchErrorTitleDefault,
        fetchErrorMessageDefault    = _fetchErrorMessageDefault,
        
        
        
        // children:
        children,
    } = props;
    
    
    
    // states:
    const [dialogMessage, setDialogMessage] = useState<DialogMessage<any>|false>(false);
    const signalsDialogMessageClosed        = useRef<((answer: any|undefined) => void)[]>([]);
    const isMounted                         = useMountedFlag();
    const answerRef                         = useRef<any|undefined>(undefined);
    
    
    
    // stable callbacks:
    const showMessage             = useEvent(async <TAnswer extends any = 'ok'>(dialogMessage             : React.SetStateAction<DialogMessage<TAnswer>|false> | React.ReactNode, options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessage, 'message')) {
            return await showMessage({ // recursive call
                // contents:
                message : dialogMessage,
                
                
                
                // options:
                ...options, // DialogMessage extends ShowMessageOptions
            });
        } // if
        
        
        
        // simulate an answer if the <ModalStatus> was already opened:
        if (isExpanded) {
            // notify the <ModalStatus> is closed by user:
            for (const signalDialogMessageClosed of signalsDialogMessageClosed.current) {
                signalDialogMessageClosed(/* answer: */ undefined /* (not answered) */);
            } // for
            signalsDialogMessageClosed.current.splice(0); // clear
        } // if
        
        
        
        // show|hide message:
        setDialogMessage(dialogMessage);
        
        
        
        // when message closed:
        return new Promise<TAnswer|undefined>((resolved) => {
            signalsDialogMessageClosed.current.push(resolved); // wait until <ModalStatus> to be closed by user
        });
    });
    
    const showMessageError        = useEvent(async <TAnswer extends any = 'ok'>(dialogMessageError        : DialogMessageError<TAnswer>|false                  | React.ReactNode, options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessageError, 'error')) {
            return await showMessageError({ // recursive call
                // contents:
                error : dialogMessageError,
                
                
                
                // options:
                ...options, // DialogMessageError extends ShowMessageOptions
            });
        } // if
        
        
        
        // hide message if `false`:
        if (dialogMessageError === false) return await showMessage(false);
        
        
        
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
    const showMessageFieldError   = useEvent(async <TAnswer extends any = 'ok'>(dialogMessageFieldError   : DialogMessageFieldError<TAnswer>|false             | FieldErrorList , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined> => {
        // handle overloads:
        if (isFieldErrorList(dialogMessageFieldError, 'fieldErrors')) {
            return await showMessageFieldError({ // recursive call
                // contents:
                fieldErrors : dialogMessageFieldError,
                
                
                
                // options:
                ...options, // DialogMessageFieldError extends ShowMessageOptions
            });
        } // if
        
        
        
        // hide message if `false`:
        if (dialogMessageFieldError === false) return await showMessageError(false);
        
        
        
        // defaults:
        const {
            // contents:
            fieldErrorTitle     = fieldErrorTitleDefault,
            
            fieldErrors,        // take the [fieldErrors] as a part of [error message]
            fieldErrorMessage   = fieldErrorMessageDefault,
            fieldErrorIconFind  = fieldErrorIconFindDefault,
            fieldErrorIcon      = fieldErrorIconDefault,
            fieldErrorLabelFind = fieldErrorLabelFindDefault,
            fieldErrorFocus     = fieldErrorFocusDefault,
            
            
            
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
                                let icon : DialogMessageFieldError<TAnswer>['fieldErrorIcon']|null = fieldErrorIconComponent.props.icon;
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
        if (fieldErrorFocus) {
            const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), iframe';
            const firstFieldError   = fieldErrors?.[0];
            const firstFocusableElm = (firstFieldError.matches(focusableSelector) ? firstFieldError : firstFieldError?.querySelector(focusableSelector)) as HTMLElement|null;
            firstFieldError.scrollIntoView({
                block    : 'start',
                behavior : 'smooth',
            });
            firstFocusableElm?.focus?.({ preventScroll: true });
        } // if
    });
    const showMessageFetchError   = useEvent(async <TAnswer extends any = 'ok'>(dialogMessageFetchError   : DialogMessageFetchError<TAnswer>|false             | any            , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined> => {
        // handle overloads:
        if (isError(dialogMessageFetchError, 'fetchError')) {
            return await showMessageFetchError({ // recursive call
                // contents:
                fetchError : dialogMessageFetchError,
                
                
                
                // options:
                ...options, // DialogMessageFetchError extends ShowMessageOptions
            });
        } // if
        dialogMessageFetchError = dialogMessageFetchError as unknown as (DialogMessageFetchError<TAnswer>|false); // for satisfying TS
        
        
        
        // hide message if `false`:
        if (dialogMessageFetchError === false) return await showMessageError(false);
        
        
        
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
    const showMessageSuccess      = useEvent(async <TAnswer extends any = 'ok'>(dialogMessageSuccess      : DialogMessageSuccess<TAnswer>|false                | React.ReactNode, options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessageSuccess, 'success')) {
            return await showMessageSuccess({ // recursive call
                // contents:
                success : dialogMessageSuccess,
                
                
                
                // options:
                ...options, // DialogMessageSuccess extends ShowMessageOptions
            });
        } // if
        
        
        
        // hide message if `false`:
        if (dialogMessageSuccess === false) return await showMessage(false);
        
        
        
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
    const showMessageNotification = useEvent(async <TAnswer extends any = 'ok'>(dialogMessageNotification : DialogMessageNotification<TAnswer>|false           | React.ReactNode, options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined> => {
        // handle overloads:
        if (isReactNode(dialogMessageNotification, 'notification')) {
            return await showMessageNotification({ // recursive call
                // contents:
                notification : dialogMessageNotification,
                
                
                
                // options:
                ...options, // DialogMessageNotification extends ShowMessageOptions
            });
        } // if
        
        
        
        // hide message if `false`:
        if (dialogMessageNotification === false) return await showMessage(false);
        
        
        
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
    
    
    
    // cache:
    const prevDialogMessage       = useRef<DialogMessage<any>|false>(dialogMessage);
    if (dialogMessage !== false) prevDialogMessage.current = dialogMessage;
    
    
    
    // handlers:
    const handleCloseDialogMessage          = useEvent((): void => {
        setDialogMessage(false); // close the <ModalStatus>
    });
    const closeButtonHandleClick            = useMergeEvents(
        // preserves the original `onClick` from `closeButtonComponent`:
        closeButtonComponent.props.onClick,
        
        
        
        // actions:
        handleCloseDialogMessage, // click [x] button => close the <ModalStatus> *without* answer
    );
    const answerButtonHandleClick           = useEvent((answer: any): void => {
        // actions:
        answerRef.current = answer;
        handleCloseDialogMessage(); // click [answer] button => close the <ModalStatus> with answer
    });
    
    const handleModalExpandedChangeInternal = useEvent<EventHandler<ModalExpandedChangeEvent>>(({expanded}) => {
        // conditions:
        if (expanded) return; // only interested of collapsed event
        
        
        
        // actions:
        handleCloseDialogMessage(); // escape_key|click_on_backdrop => close the <ModalStatus> *without* answer
    });
    const handleModalExpandedChange         = useMergeEvents(
        // preserves the original `onExpandedChange` from `modalStatusComponent`:
        modalStatusComponent.props.onExpandedChange,
        
        
        
        // actions:
        handleModalExpandedChangeInternal,
    );
    
    const handleClosedDialogMessageInternal = useEvent((): void => {
        // clear the prevDialogMessage *after* the <ModalStatus> is fully hidden:
        prevDialogMessage.current = false;
        
        
        
        // take & clear the answer:
        const answer = answerRef.current; // take
        answerRef.current = undefined;    // clear
        
        
        
        // notify the <ModalStatus> is closed by user:
        for (const signalDialogMessageClosed of signalsDialogMessageClosed.current) {
            signalDialogMessageClosed(answer);
        } // for
        signalsDialogMessageClosed.current.splice(0); // clear
    });
    const handleClosedDialogMessage         = useMergeEvents(
        // preserves the original `onCollapseEnd` from `modalStatusComponent`:
        modalStatusComponent.props.onCollapseEnd,
        
        
        
        // actions:
        handleClosedDialogMessageInternal,
    );
    
    
    
    // apis:
    const dialogMessageApi = useMemo<DialogMessageApi>(() => ({
        // dialogs:
        showMessage,             // stable ref
        showMessageError,        // stable ref
        showMessageFieldError,   // stable ref
        showMessageFetchError,   // stable ref
        showMessageSuccess,      // stable ref
        showMessageNotification, // stable ref
    }), []);
    
    
    
    // refs:
    const autoFocusButtonRef = useRef<HTMLButtonElement|null>(null);
    
    
    
    // jsx:
    const {
        // contents:
        title,   // take
        message, // take
        options, // take
    ...restModalBaseProps} = prevDialogMessage.current || {};
    const answerOptions : Extract<AnswerOptionList<any>, Map<any, any>> = (
        (!options || !((options instanceof Map) ? options.size : Object.keys(options).length))
        ? new Map<'ok', AnswerButtonComponentOrChildren>([
            ['ok', answerOkButtonComponent],
        ])
        : (options instanceof Map)
            ? options
            : new Map<string|number|symbol, AnswerButtonComponentOrChildren>(Object.entries(options))
    );
    const isExpanded = (dialogMessage !== false);
    let hasAutoFocusButton = false;
    const cardFooterChildren : React.ReactNode = (
        cardFooterComponent.props.children ?? Array.from(answerOptions).map(([answer, answerComponent], index) => {
            // components:
            const answerButtonComponentWithChildren : React.ReactComponentElement<any, ButtonProps> = (
                (
                    !React.isValidElement<ButtonProps>(answerComponent) // NOT a <SomeElement> => treat as children
                    ||
                    (answerComponent.type === React.Fragment)           // a <React.Fragment>  => treat as children
                )
                ? React.cloneElement<ButtonProps>(answerButtonComponent,
                    // props:
                    undefined,
                    
                    
                    
                    // children:
                    answerButtonComponent.props.children ?? answerComponent,
                )
                : answerComponent                                       // a <SomeElement> => treat as <Button>
            );
            
            
            
            // props:
            const answerButtonComponentWithChildrenProps = answerButtonComponentWithChildren.props;
            
            
            
            // jsx:
            return (
                <ButtonWithAnswer<any>
                    // other props:
                    {...answerButtonComponentWithChildrenProps} // steals all answerButtonComponentWithChildren's props, so the <Owner> can recognize the <ButtonWithAnswer> as <TheirChild>
                    
                    
                    
                    // identifiers:
                    key={answerButtonComponentWithChildren.key ?? index}
                    
                    
                    
                    // refs:
                    autoFocusRef={((): React.Ref<HTMLButtonElement>|undefined => {
                        // conditions:
                        if (hasAutoFocusButton) return undefined; // the autoFocus feature has already taken by another <Button>
                        if (!answerButtonComponentWithChildrenProps.autoFocus) return undefined; // no autoFocus feature activated
                        hasAutoFocusButton = true; // mark autoFocus feature as taken
                        
                        
                        
                        return autoFocusButtonRef;
                    })()}
                    
                    
                    
                    // contents:
                    answer={answer}
                    
                    
                    
                    // components:
                    buttonComponent={
                        // clone answerButtonComponentWithChildren element with (almost) blank props:
                        <answerButtonComponentWithChildren.type
                            // identifiers:
                            key={answerButtonComponentWithChildren.key}
                            
                            
                            
                            //#region restore conflicting props
                            {...{
                                ...(('autoFocusRef'    in answerButtonComponentWithChildrenProps) ? { autoFocusRef    : answerButtonComponentWithChildrenProps.autoFocusRef    } : undefined),
                                ...(('answer'          in answerButtonComponentWithChildrenProps) ? { answer          : answerButtonComponentWithChildrenProps.answer          } : undefined),
                                ...(('buttonComponent' in answerButtonComponentWithChildrenProps) ? { buttonComponent : answerButtonComponentWithChildrenProps.buttonComponent } : undefined),
                                ...(('onAnswer'        in answerButtonComponentWithChildrenProps) ? { onAnswer        : answerButtonComponentWithChildrenProps.onAnswer        } : undefined),
                            }}
                            //#endregion restore conflicting props
                        />
                    }
                    
                    
                    
                    // handlers:
                    onAnswer={answerButtonHandleClick}
                />
            );
        })
    );
    return (
        <DialogMessageContext.Provider value={dialogMessageApi}>
            {children}
            
            {React.cloneElement<ModalStatusProps<Element>>(modalStatusComponent,
                // props:
                {
                    // other props:
                    ...restModalBaseProps,
                    ...modalStatusComponent.props, // overwrites restModalBaseProps (if any conflics)
                    
                    
                    
                    // behaviors:
                    lazy             : modalStatusComponent.props.lazy          ?? true,
                    
                    
                    
                    // components:
                    cardComponent    : modalStatusComponent.props.cardComponent ?? cardComponent,
                    
                    
                    
                    // auto focusable:
                    autoFocusOn      : modalStatusComponent.props.autoFocusOn   ?? (hasAutoFocusButton ? autoFocusButtonRef : undefined),
                    
                    
                    
                    // handlers:
                    onExpandedChange : handleModalExpandedChange,
                    onCollapseEnd    : handleClosedDialogMessage,
                },
                
                
                
                // children:
                (modalStatusComponent.props.children ?? (isExpanded && <>
                    {React.cloneElement<CardHeaderProps<Element>>(cardHeaderComponent,
                        // props:
                        undefined,
                        
                        
                        
                        // children:
                        cardHeaderComponent.props.children ?? <>
                            {title}
                            {React.cloneElement<ButtonProps>(closeButtonComponent,
                                // props:
                                {
                                    // handlers:
                                    onClick : closeButtonHandleClick,
                                },
                            )}
                        </>,
                    )}
                    {React.cloneElement<CardBodyProps<Element>>(cardBodyComponent,
                        // props:
                        undefined,
                        
                        
                        
                        // children:
                        cardBodyComponent.props.children ?? message,
                    )}
                    {React.cloneElement<CardFooterProps<Element>>(cardFooterComponent,
                        // props:
                        undefined,
                        
                        
                        
                        // children:
                        cardFooterChildren,
                    )}
                </>)),
            )}
        </DialogMessageContext.Provider>
    );
};
export {
    DialogMessageProvider,
    DialogMessageProvider as default,
}