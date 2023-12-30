// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
}                           from 'react'

// internals:
import type {
    // types:
    ModalExpandedChangeWithAnswerEvent,
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
const notNestedError = async (): Promise<any|undefined> => {
    throw Error('The `useDialogMessage()` hook must be nested in `<DialogMessageProvider>`.');
};



// contexts:
export interface DialogMessageApi {
    // dialogs:
    showDialog              <TData extends any = any >(dialogComponent           : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<TData>>>): Promise<TData|undefined>
    
    showMessage             <TData extends any = 'ok'>(dialogMessage             : DialogMessage<TData>                                                                                ): Promise<TData|undefined>
    showMessage             <TData extends any = 'ok'>(message                   : React.ReactNode                                                , options?: ShowMessageOptions<TData>): Promise<TData|undefined>
    
    showMessageError        <TData extends any = 'ok'>(dialogMessageError        : DialogMessageError<TData>                                                                           ): Promise<TData|undefined>
    showMessageError        <TData extends any = 'ok'>(error                     : React.ReactNode                                                , options?: ShowMessageOptions<TData>): Promise<TData|undefined>
    
    showMessageFieldError   <TData extends any = 'ok'>(dialogMessageFieldError   : DialogMessageFieldError<TData>                                                                      ): Promise<TData|undefined>
    showMessageFieldError   <TData extends any = 'ok'>(fieldErrors               : FieldErrorList                                                 , options?: ShowMessageOptions<TData>): Promise<TData|undefined>
    
    showMessageFetchError   <TData extends any = 'ok'>(dialogMessageFetchError   : DialogMessageFetchError<TData>                                                                      ): Promise<TData|undefined>
    showMessageFetchError   <TData extends any = 'ok'>(fetchError                : any                                                            , options?: ShowMessageOptions<TData>): Promise<TData|undefined>
    
    showMessageSuccess      <TData extends any = 'ok'>(dialogMessageSuccess      : DialogMessageSuccess<TData>                                                                         ): Promise<TData|undefined>
    showMessageSuccess      <TData extends any = 'ok'>(success                   : React.ReactNode                                                , options?: ShowMessageOptions<TData>): Promise<TData|undefined>
    
    showMessageNotification <TData extends any = 'ok'>(dialogMessageNotification : DialogMessageNotification<TData>                                                                    ): Promise<TData|undefined>
    showMessageNotification <TData extends any = 'ok'>(notification              : React.ReactNode                                                , options?: ShowMessageOptions<TData>): Promise<TData|undefined>
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
