// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
}                           from 'react'

// reusable-ui components:
import {
    // react components:
    type ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page

// internals:
import {
    // types:
    PromiseDialog,
    type CancelablePromiseDialog,
    
    
    
    type ModalBaseProps,
    
    type FieldErrorList,
    
    
    
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



// utilities:
const notNestedError     = Error('The `useDialogMessage()` hook must be nested in `<DialogMessageProvider>`.');
const notNestedErrorFunc = () => new PromiseDialog<any>((resolve, reject): void => {
        reject(
            notNestedError
        );
    },
    {
        onCloseDialog        : () => { throw notNestedError; },
        onCollapseStartEvent : () => { throw notNestedError; },
        onCollapseEndEvent   : () => { throw notNestedError; },
    }
);



// contexts:
export interface DialogMessageApi {
    // dialogs:
    showDialog              <TData extends unknown = unknown>(dialogComponent           : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeEvent<TData>>>): PromiseDialog<TData>
    
    showMessage             <TData extends unknown = 'ok'   >(dialogMessage             : DialogMessage<TData>                                                                      ): PromiseDialog<TData>
    showMessage             <TData extends unknown = 'ok'   >(message                   : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageError        <TData extends unknown = 'ok'   >(dialogMessageError        : DialogMessageError<TData>                                                                 ): PromiseDialog<TData>
    showMessageError        <TData extends unknown = 'ok'   >(error                     : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageFieldError   <TData extends unknown = 'ok'   >(dialogMessageFieldError   : DialogMessageFieldError<TData>                                                            ): CancelablePromiseDialog<TData>
    showMessageFieldError   <TData extends unknown = 'ok'   >(fieldErrors               : FieldErrorList                                       , options?: ShowMessageOptions<TData>): CancelablePromiseDialog<TData>
    
    showMessageFetchError   <TData extends unknown = 'ok'   >(dialogMessageFetchError   : DialogMessageFetchError<TData>                                                            ): PromiseDialog<TData>
    showMessageFetchError   <TData extends unknown = 'ok'   >(fetchError                : any                                                  , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageSuccess      <TData extends unknown = 'ok'   >(dialogMessageSuccess      : DialogMessageSuccess<TData>                                                               ): PromiseDialog<TData>
    showMessageSuccess      <TData extends unknown = 'ok'   >(success                   : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageNotification <TData extends unknown = 'ok'   >(dialogMessageNotification : DialogMessageNotification<TData>                                                          ): PromiseDialog<TData>
    showMessageNotification <TData extends unknown = 'ok'   >(notification              : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
}
export const DialogMessageContext = createContext<DialogMessageApi>({
    // dialogs:
    showDialog              : notNestedErrorFunc,
    showMessage             : notNestedErrorFunc,
    showMessageError        : notNestedErrorFunc,
    showMessageFieldError   : notNestedErrorFunc as unknown as (() => CancelablePromiseDialog<any>),
    showMessageFetchError   : notNestedErrorFunc,
    showMessageSuccess      : notNestedErrorFunc,
    showMessageNotification : notNestedErrorFunc,
});
