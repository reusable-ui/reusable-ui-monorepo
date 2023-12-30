// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
}                           from 'react'

// reusable-ui components:
import type {
    // react components:
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page

// internals:
import type {
    // types:
    PromiseDialog,
    
    
    
    ModalBaseProps,
    
    FieldErrorList,
    
    
    
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



// utilities:
const notNestedError = (): PromiseDialog<any> => {
    throw Error('The `useDialogMessage()` hook must be nested in `<DialogMessageProvider>`.');
};



// contexts:
export interface DialogMessageApi {
    // dialogs:
    showDialog              <TData extends any = any >(dialogComponent           : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeEvent<TData>>>): PromiseDialog<TData>
    
    showMessage             <TData extends any = 'ok'>(dialogMessage             : DialogMessage<TData>                                                                      ): PromiseDialog<TData>
    showMessage             <TData extends any = 'ok'>(message                   : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageError        <TData extends any = 'ok'>(dialogMessageError        : DialogMessageError<TData>                                                                 ): PromiseDialog<TData>
    showMessageError        <TData extends any = 'ok'>(error                     : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageFieldError   <TData extends any = 'ok'>(dialogMessageFieldError   : DialogMessageFieldError<TData>                                                            ): PromiseDialog<TData>
    showMessageFieldError   <TData extends any = 'ok'>(fieldErrors               : FieldErrorList                                       , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageFetchError   <TData extends any = 'ok'>(dialogMessageFetchError   : DialogMessageFetchError<TData>                                                            ): PromiseDialog<TData>
    showMessageFetchError   <TData extends any = 'ok'>(fetchError                : any                                                  , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageSuccess      <TData extends any = 'ok'>(dialogMessageSuccess      : DialogMessageSuccess<TData>                                                               ): PromiseDialog<TData>
    showMessageSuccess      <TData extends any = 'ok'>(success                   : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
    
    showMessageNotification <TData extends any = 'ok'>(dialogMessageNotification : DialogMessageNotification<TData>                                                          ): PromiseDialog<TData>
    showMessageNotification <TData extends any = 'ok'>(notification              : React.ReactNode                                      , options?: ShowMessageOptions<TData>): PromiseDialog<TData>
}
export const DialogMessageContext = createContext<DialogMessageApi>({
    // dialogs:
    showDialog              : notNestedError,
    showMessage             : notNestedError,
    showMessageError        : notNestedError,
    showMessageFieldError   : notNestedError,
    showMessageFetchError   : notNestedError,
    showMessageSuccess      : notNestedError,
    showMessageNotification : notNestedError,
});
