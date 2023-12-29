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
    showDialog              <TAnswer extends any = 'ok'>(dialogComponent           : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<TAnswer>>>): Promise<TAnswer|undefined>
    
    showMessage             <TAnswer extends any = 'ok'>(dialogMessage             : DialogMessage<TAnswer>                                                                                ): Promise<TAnswer|undefined>
    showMessage             <TAnswer extends any = 'ok'>(message                   : React.ReactNode                                                , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined>
    
    showMessageError        <TAnswer extends any = 'ok'>(dialogMessageError        : DialogMessageError<TAnswer>                                                                           ): Promise<TAnswer|undefined>
    showMessageError        <TAnswer extends any = 'ok'>(error                     : React.ReactNode                                                , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined>
    
    showMessageFieldError   <TAnswer extends any = 'ok'>(dialogMessageFieldError   : DialogMessageFieldError<TAnswer>                                                                      ): Promise<TAnswer|undefined>
    showMessageFieldError   <TAnswer extends any = 'ok'>(fieldErrors               : FieldErrorList                                                 , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined>
    
    showMessageFetchError   <TAnswer extends any = 'ok'>(dialogMessageFetchError   : DialogMessageFetchError<TAnswer>                                                                      ): Promise<TAnswer|undefined>
    showMessageFetchError   <TAnswer extends any = 'ok'>(fetchError                : any                                                            , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined>
    
    showMessageSuccess      <TAnswer extends any = 'ok'>(dialogMessageSuccess      : DialogMessageSuccess<TAnswer>                                                                         ): Promise<TAnswer|undefined>
    showMessageSuccess      <TAnswer extends any = 'ok'>(success                   : React.ReactNode                                                , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined>
    
    showMessageNotification <TAnswer extends any = 'ok'>(dialogMessageNotification : DialogMessageNotification<TAnswer>                                                                    ): Promise<TAnswer|undefined>
    showMessageNotification <TAnswer extends any = 'ok'>(notification              : React.ReactNode                                                , options?: ShowMessageOptions<TAnswer>): Promise<TAnswer|undefined>
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
