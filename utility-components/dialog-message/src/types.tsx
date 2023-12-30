// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui components:
import type {
    // react components:
    BasicProps,
}                           from '@reusable-ui/basic'           // a styled basic building block of Reusable-UI components
import type {
    // react components:
    IconProps,
}                           from '@reusable-ui/icon'            // an icon component
import type {
    // react components:
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import type {
    // types:
    AutoFocusableProps,
}                           from '@reusable-ui/auto-focusable'  // a capability of UI to be focused within itself or its content (when expanded), and re-focus back to previous element (when collapsed)
import type {
    // types:
    CollapsibleProps,
    CollapsibleEventProps,
    ControllableCollapsibleProps,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility
import type {
    // react components:
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page



// types:
export interface ModalExpandedChangeWithAnswerEvent<TData extends keyof any = any>
    extends
        ModalExpandedChangeEvent
{
    answer ?: TData
}
export interface ModalBaseProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent = ModalExpandedChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // capabilities:
        AutoFocusableProps,
        
        // states:
        CollapsibleProps<TModalExpandedChangeEvent>,
        CollapsibleEventProps,
        ControllableCollapsibleProps<TModalExpandedChangeEvent>
{
    /* empty */
}
export interface DialogState<TData extends keyof any = any> {
    dialogComponent   : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeWithAnswerEvent<TData>>>
    lastExpandedEvent : ModalExpandedChangeWithAnswerEvent<TData>|undefined
    
    expanded          : boolean
}

export type FieldErrorList                               = ArrayLike<Element>|null|undefined
export type AnswerButtonComponentOrChildren              =
    |Required<ButtonComponentProps>['buttonComponent']                                                                  // <Button>
    |React.ReactComponentElement<React.ExoticComponent<{ children?: React.ReactNode }>, { children?: React.ReactNode }> // <React.Fragment>
    |Iterable<React.ReactNode>                                                                                          // Array<React.Node>
export type AnswerOptionList<TData extends keyof any = 'ok'> =
    |Map   <        TData            , AnswerButtonComponentOrChildren> // { answer => TheComponent }
    |Record<Extract<TData, keyof any>, AnswerButtonComponentOrChildren> // { answer :  TheComponent }



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
export interface ShowMessageOptions<TData extends keyof any = 'ok'>
    extends
        Omit<ModalBaseProps<Element>,
            // contents:
            |'title'   // we redefined `title`   prop
            |'message' // we redefined `message` prop
        >
{
    // contents:
    options                   ?: AnswerOptionList<TData>
}



// states:
export interface DialogMessage<TData extends keyof any = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    message                    : React.ReactNode
}
export interface DialogMessageError<TData extends keyof any = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    error                      : React.ReactNode
}
export interface DialogMessageFieldError<TData extends keyof any = 'ok'>
    extends
        ShowMessageOptions<TData>
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
export interface DialogMessageFetchError<TData extends keyof any = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    fetchErrorTitle           ?: FetchErrorTitle
    
    fetchError                 : any
    fetchErrorMessage         ?: FetchErrorMessage
    
    
    
    // contexts:
    context                   ?: any
}
export interface DialogMessageSuccess<TData extends keyof any = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    success                    : React.ReactNode
}
export interface DialogMessageNotification<TData extends keyof any = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    notification               : React.ReactNode
}
