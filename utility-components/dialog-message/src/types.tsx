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
    ModalActionType,
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page



// types:
export interface PromiseDialogBaseOptions<TData extends unknown = unknown> {
    onCloseDialog: (data: TData|undefined, actionType?: ModalActionType) => void
}
export class PromiseDialogBase<TData extends unknown = unknown>
    extends
        Promise<TData|undefined>
{
    readonly #options: PromiseDialogBaseOptions<TData>
    constructor(executor: (resolve: (value: TData|undefined | PromiseLike<TData|undefined>) => void, reject: (reason?: unknown) => void) => void, options: PromiseDialogBaseOptions<TData>) {
        super(executor);
        this.#options = options;
    }
    
    
    
    closeDialog(data: TData|undefined, actionType?: ModalActionType) : void {
        this.#options.onCloseDialog(data, actionType);
    }
}

export interface PromiseDialogOptions<TData extends unknown = unknown>
    extends
        PromiseDialogBaseOptions<TData>
{
    onCollapseStartEvent() : Promise<ModalExpandedChangeEvent<TData>>
    onCollapseEndEvent()   : Promise<ModalExpandedChangeEvent<TData>>
}
export class PromiseDialog<TData extends unknown = unknown>
    extends
        PromiseDialogBase<TData>
{
    readonly #options: PromiseDialogOptions<TData>
    constructor(executor: (resolve: (value: TData|undefined | PromiseLike<TData|undefined>) => void, reject: (reason?: unknown) => void) => void, options: PromiseDialogOptions<TData>) {
        super(executor, options);
        this.#options = options;
    }
    
    
    
    collapseStartEvent() : Promise<ModalExpandedChangeEvent<TData>> {
        return this.#options.onCollapseStartEvent();
    }
    collapseEndEvent()   : Promise<ModalExpandedChangeEvent<TData>> {
        return this.#options.onCollapseEndEvent();
    }
}

export interface CancelablePromiseDialogOptions<TData extends unknown = unknown>
    extends
        PromiseDialogBaseOptions<TData>
{
    onCollapseStartEvent() : Promise<ModalExpandedChangeEvent<TData>|undefined>
    onCollapseEndEvent()   : Promise<ModalExpandedChangeEvent<TData>|undefined>
}
export class CancelablePromiseDialog<TData extends unknown = unknown>
    extends
        PromiseDialogBase<TData>
{
    readonly #options: CancelablePromiseDialogOptions<TData>
    constructor(executor: (resolve: (value: TData|undefined | PromiseLike<TData|undefined>) => void, reject: (reason?: unknown) => void) => void, options: CancelablePromiseDialogOptions<TData>) {
        super(executor, options);
        this.#options = options;
    }
    
    
    
    collapseStartEvent() : Promise<ModalExpandedChangeEvent<TData>|undefined> {
        return this.#options.onCollapseStartEvent();
    }
    collapseEndEvent()   : Promise<ModalExpandedChangeEvent<TData>|undefined> {
        return this.#options.onCollapseEndEvent();
    }
}



export interface ModalBaseProps<TElement extends Element = HTMLElement, TModalExpandedChangeEvent extends ModalExpandedChangeEvent<any> = ModalExpandedChangeEvent<any>>
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
export interface DialogState<TData extends unknown = unknown> {
    dialogComponent   : React.ReactComponentElement<any, ModalBaseProps<Element, ModalExpandedChangeEvent<TData>>>
    lastExpandedEvent : ModalExpandedChangeEvent<TData>|undefined
    
    expanded          : boolean
}

export type FieldErrorList                               = ArrayLike<Element>|Element|null|undefined
export type AnswerButtonComponentOrChildren              =
    |Required<ButtonComponentProps>['buttonComponent']                                                                  // <Button>
    |React.ReactComponentElement<React.ExoticComponent<{ children?: React.ReactNode }>, { children?: React.ReactNode }> // <React.Fragment>
    |Iterable<React.ReactNode>                                                                                          // Array<React.Node>
export type AnswerOptionList<TData extends unknown = 'ok'> =
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
export interface ShowMessageOptions<TData extends unknown = 'ok'>
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
export interface DialogMessage<TData extends unknown = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    message                    : React.ReactNode
}
export interface DialogMessageError<TData extends unknown = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    error                      : React.ReactNode
}
export interface DialogMessageFieldError<TData extends unknown = 'ok'>
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
export interface DialogMessageFetchError<TData extends unknown = 'ok'>
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
export interface DialogMessageSuccess<TData extends unknown = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    success                    : React.ReactNode
}
export interface DialogMessageNotification<TData extends unknown = 'ok'>
    extends
        ShowMessageOptions<TData>
{
    // contents:
    title                     ?: React.ReactNode
    notification               : React.ReactNode
}
