// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui components:
import type {
    // react components:
    IconProps,
}                           from '@reusable-ui/icon'            // an icon component
import type {
    // react components:
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import type {
    // react components:
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page
import type {
    // react components:
    ModalBaseProps,
}                           from '@reusable-ui/modal-status'    // overlays a card dialog to the entire site's page



// types:
export interface ModalExpandedChangeWithAnswerEvent<TAnswer extends any = 'ok'>
    extends
        ModalExpandedChangeEvent
{
    answer ?: TAnswer
}
export interface DialogState<TAnswer extends any = any> {
    dialogComponent   : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<TAnswer>>>
    lastExpandedEvent : ModalExpandedChangeWithAnswerEvent<TAnswer>|undefined
    
    expanded          : boolean
}

export type FieldErrorList                               = ArrayLike<Element>|null|undefined
export type AnswerButtonComponentOrChildren              =
    |Required<ButtonComponentProps>['buttonComponent']                                                                  // <Button>
    |React.ReactComponentElement<React.ExoticComponent<{ children?: React.ReactNode }>, { children?: React.ReactNode }> // <React.Fragment>
    |Iterable<React.ReactNode>                                                                                          // Array<React.Node>
export type AnswerOptionList<TAnswer extends any = 'ok'> =
    |Map   <        TAnswer            , AnswerButtonComponentOrChildren> // { answer => TheComponent }
    |Record<Extract<TAnswer, keyof any>, AnswerButtonComponentOrChildren> // { answer :  TheComponent }



// args:
export interface FieldErrorInfo {
    // data:
    fieldErrors    : Exclude<FieldErrorList, null|undefined>
    
    
    
    // contexts:
    context        : any
}
export interface FetchErrorInfo {
    // data:
    isRequestError : boolean
    isClientError  : boolean
    isServerError  : boolean
    
    errorCode      : number
    error          : any
    
    
    
    // contexts:
    context        : any
}



// dynamic data:
export type FieldErrorTitle   = React.ReactNode | ((errorInfo: FieldErrorInfo) => React.ReactNode)
export type FieldErrorMessage = React.ReactNode | ((errorInfo: FieldErrorInfo) => React.ReactNode)

export type FetchErrorTitle   = React.ReactNode | ((errorInfo: FetchErrorInfo) => React.ReactNode)
export type FetchErrorMessage = React.ReactNode | ((errorInfo: FetchErrorInfo) => React.ReactNode)



// options:
export interface ShowMessageOptions<TAnswer extends any = 'ok'>
    extends
        Omit<ModalBaseProps<Element>,
            // contents:
            |'title'   // we redefined `title`   prop
            |'message' // we redefined `message` prop
        >
{
    // contents:
    options                   ?: AnswerOptionList<TAnswer>
}



// states:
export interface DialogMessage<TAnswer extends any = 'ok'>
    extends
        ShowMessageOptions<TAnswer>
{
    // contents:
    title                     ?: React.ReactNode
    message                    : React.ReactNode
}
export interface DialogMessageError<TAnswer extends any = 'ok'>
    extends
        ShowMessageOptions<TAnswer>
{
    // contents:
    title                     ?: React.ReactNode
    error                      : React.ReactNode
}
export interface DialogMessageFieldError<TAnswer extends any = 'ok'>
    extends
        ShowMessageOptions<TAnswer>
{
    // contents:
    fieldErrorTitle           ?: FieldErrorTitle
    
    fieldErrors                : FieldErrorList
    fieldErrorMessage         ?: FieldErrorMessage
    fieldErrorIconFind        ?: (fieldError: Element) => string|null|undefined
    fieldErrorIcon            ?: IconProps<Element>['icon']
    fieldErrorLabelFind       ?: (fieldError: Element) => string|null|undefined
    fieldErrorAutoFocus       ?: boolean
    fieldErrorAutoFocusScroll ?: boolean
    
    
    
    // contexts:
    context                   ?: any
}
export interface DialogMessageFetchError<TAnswer extends any = 'ok'>
    extends
        ShowMessageOptions<TAnswer>
{
    // contents:
    fetchErrorTitle           ?: FetchErrorTitle
    
    fetchError                 : any
    fetchErrorMessage         ?: FetchErrorMessage
    
    
    
    // contexts:
    context                   ?: any
}
export interface DialogMessageSuccess<TAnswer extends any = 'ok'>
    extends
        ShowMessageOptions<TAnswer>
{
    // contents:
    title                     ?: React.ReactNode
    success                    : React.ReactNode
}
export interface DialogMessageNotification<TAnswer extends any = 'ok'>
    extends
        ShowMessageOptions<TAnswer>
{
    // contents:
    title                     ?: React.ReactNode
    notification               : React.ReactNode
}
