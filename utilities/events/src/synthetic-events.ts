// React:
import {
    // Types:
    type SyntheticEvent  as ReactSyntheticEvent,
    type UIEvent         as ReactUIEvent,
    type MouseEvent      as ReactMouseEvent,
    type PointerEvent    as ReactPointerEvent,
    type KeyboardEvent   as ReactKeyboardEvent,
    type AbstractView    as ReactAbstractView,
}                           from 'react'



/**
 * A function that always returns `true`.
 * 
 * @returns {true} - The boolean value `true`.
 */
function functionThatReturnsTrue(): true {
    return true;
}

/**
 * A function that always returns `false`.
 * 
 * @returns {false} - The boolean value `false`.
 */
function functionThatReturnsFalse(): false {
    return false;
}

/**
 * A function that does nothing (no operation).
 * 
 * @returns {void} - This function does not return any value.
 */
function functionThatNoop(): void {
    /* noop */
}



/**
 * Defines the configuration options for creating a React-compatible synthetic event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native event being wrapped.
 */
export interface CreateSyntheticEventOptions<out TElement extends Element, out TEvent extends Event> {
    /**
     * The original native event that triggered the synthetic event.
     * 
     * @type {TEvent}
     * @required
     */
    nativeEvent    : TEvent
    
    /**
     * The event type, such as `"click"`, `"keydown"`, `"change"`, etc.
     * 
     * Defaults to `nativeEvent.type` if omitted.
     * 
     * @type {string}
     * @optional
     */
    type          ?: string
    
    
    
    /**
     * The element whose event listener is currently executing.
     * 
     * Defaults to `nativeEvent.currentTarget` if omitted.
     * 
     * @type {TElement}
     * @optional
     */
    currentTarget ?: TElement
    
    /**
     * The element on which the event was originally dispatched.
     * 
     * Defaults to `nativeEvent.target` if omitted.
     * 
     * @type {EventTarget}
     * @optional
     */
    target        ?: EventTarget
}

/**
 * Creates a React-compatible synthetic event from a native event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native event being wrapped.
 * 
 * @param options - Configuration options for constructing the synthetic event.
 * @returns A React-compatible `SyntheticEvent`.
 */
export const createSyntheticEvent      = <TElement extends Element, TEvent extends Event>(options: CreateSyntheticEventOptions<TElement, TEvent>): ReactSyntheticEvent<TElement, TEvent> => {
    // Extract options:
    const {
        // Standards:
        nativeEvent,
        type          = nativeEvent.type,
        
        currentTarget = (nativeEvent.currentTarget as TElement | null)!,
        target        = nativeEvent.target!,
        
        
        
        // Rests:
        ...restOptions
    } = options;
    
    
    
    // Determine if default behavior was prevented:
    const isDefaultPrevented : boolean = (
        (typeof nativeEvent.defaultPrevented === 'boolean')
        ? nativeEvent.defaultPrevented
        // @ts-ignore
        : (nativeEvent.returnValue === false)
    );
    
    
    
    // Construct synthetic event:
    const syntheticEvent : ReactSyntheticEvent<TElement, TEvent> = {
        // Rests:
        ...restOptions,
        
        
        
        // Standards:
        nativeEvent,
        type,
        
        currentTarget,
        target,
        
        
        
        // Event phases:
        eventPhase           : nativeEvent.eventPhase,
        bubbles              : nativeEvent.bubbles,
        cancelable           : nativeEvent.cancelable,
        
        
        
        // Moments:
        isTrusted            : nativeEvent.isTrusted,
        timeStamp            : nativeEvent.timeStamp,
        
        
        
        // Behaviors:
        defaultPrevented     : isDefaultPrevented,
        isDefaultPrevented   : isDefaultPrevented ? functionThatReturnsTrue : functionThatReturnsFalse,
        preventDefault       : () => {
            // Actions:
            if (nativeEvent.preventDefault) {
                nativeEvent.preventDefault();
            }
            // @ts-ignore
            else if (typeof nativeEvent.returnValue !== 'unknown') {
                // @ts-ignore
                nativeEvent.returnValue = false;
            } // if
            
            
            
            // Mutates:
            syntheticEvent.defaultPrevented     = true;
            syntheticEvent.isDefaultPrevented   = functionThatReturnsTrue;
            syntheticEvent.preventDefault       = functionThatNoop;
        },
        
        isPropagationStopped : functionThatReturnsFalse,
        stopPropagation      : () => {
            // Actions:
            if (nativeEvent.stopPropagation) {
                nativeEvent.stopPropagation();
            }
            // @ts-ignore
            else if (typeof nativeEvent.cancelBubble !== 'unknown') {
                // The ChangeEventPlugin registers a "propertychange" event for
                // IE. This event does not support bubbling or cancelling, and
                // any references to cancelBubble throw "Member not found".  A
                // typeof check of "unknown" circumvents this issue (and is also
                // IE specific).
                
                // @ts-ignore
                nativeEvent.cancelBubble = true;
            } // if
            
            
            
            // Mutates:
            syntheticEvent.isPropagationStopped = functionThatReturnsTrue;
            syntheticEvent.stopPropagation      = functionThatNoop;
        },
        
        persist              : functionThatNoop,
    };
    return syntheticEvent;
};



/**
 * Defines the configuration options for creating a React-compatible synthetic UI event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native UI event being wrapped.
 */
export interface CreateSyntheticUIEventOptions<out TElement extends Element, out TEvent extends UIEvent>
    extends
        // Bases:
        CreateSyntheticEventOptions<TElement, TEvent>
{
}

/**
 * Creates a React-compatible synthetic UI event from a native UI event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native UI event being wrapped.
 * 
 * @param options - Configuration options for constructing the synthetic UI event.
 * @returns A React-compatible `UIEvent`.
 */
export const createSyntheticUIEvent    = <TElement extends Element, TEvent extends UIEvent>(options: CreateSyntheticUIEventOptions<TElement, TEvent>): ReactUIEvent<TElement, TEvent> => {
    // Extract options:
    const {
        // UIs:
        detail,
        view,
    } = options.nativeEvent;
    
    
    
    // Construct synthetic UI event:
    return {
        // Bases:
        ...createSyntheticEvent<TElement, TEvent>(options),
        
        
        
        // UIs:
        detail,
        view : view as unknown as ReactAbstractView,
    } satisfies ReactUIEvent<TElement, TEvent>;
};



/**
 * Defines the configuration options for creating a React-compatible synthetic mouse event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native mouse event being wrapped.
 */
export interface CreateSyntheticMouseEventOptions<out TElement extends Element, out TEvent extends MouseEvent>
    extends
        // Bases:
        CreateSyntheticUIEventOptions<TElement, TEvent>
{
    /**
     * The secondary target for the mouse event, if applicable.
     * 
     * Defaults to `nativeEvent.relatedTarget` if omitted.
     * 
     * @type {EventTarget | null}
     * @optional
     */
    relatedTarget ?: EventTarget | null
}

/**
 * Creates a React-compatible synthetic mouse event from a native mouse event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native mouse event being wrapped.
 * 
 * @param options - Configuration options for constructing the synthetic mouse event.
 * @returns A React-compatible `MouseEvent`.
 */
export const createSyntheticMouseEvent = <TElement extends Element, TEvent extends MouseEvent>(options: CreateSyntheticMouseEventOptions<TElement, TEvent>): ReactMouseEvent<TElement, TEvent> => {
    // Extract options:
    const {
        // Standards:
        relatedTarget : nativeRelatedTarget,
        
        
        
        // Mouses:
        clientX,
        clientY,
        
        screenX,
        screenY,
        
        pageX,
        pageY,
        
        movementX = 0, // Defaults to `0` if the prop doesn't exist.
        movementY = 0, // Defaults to `0` if the prop doesn't exist.
        
        
        
        // Buttons:
        button,
        buttons,
        
        ctrlKey,
        shiftKey,
        altKey,
        metaKey,
        
        getModifierState,
    } = options.nativeEvent;
    
    
    
    // Apply defaults and retain other options:
    const {
        // Standards:
        relatedTarget = nativeRelatedTarget,
        
        
        
        // Rests:
        ...restOptions
    } = options;
    
    
    
    // Construct synthetic mouse event:
    return {
        // Bases:
        ...createSyntheticUIEvent<TElement, TEvent>(restOptions),
        
        
        
        // Standards:
        relatedTarget,
        
        
        
        // Mouses:
        clientX,
        clientY,
        
        screenX,
        screenY,
        
        pageX,
        pageY,
        
        movementX,
        movementY,
        
        
        
        // Buttons:
        button,
        buttons,
        
        ctrlKey,
        shiftKey,
        altKey,
        metaKey,
        
        // Ensures function binding:
        getModifierState : (key: string): boolean => getModifierState.call(options.nativeEvent, key),
    } satisfies ReactMouseEvent<TElement, TEvent>;
};



/**
 * Defines the configuration options for creating a React-compatible synthetic pointer event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native pointer event being wrapped.
 */
export interface CreateSyntheticPointerEventOptions<out TElement extends Element, out TEvent extends PointerEvent>
    extends
        // Bases:
        CreateSyntheticUIEventOptions<TElement, TEvent>
{
    /**
     * The secondary target for the pointer event, if applicable.
     * 
     * Defaults to `nativeEvent.relatedTarget` if omitted.
     * 
     * @type {EventTarget | null}
     * @optional
     */
    relatedTarget ?: EventTarget | null
}

/**
 * Creates a React-compatible synthetic pointer event from a native pointer event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native pointer event being wrapped.
 * 
 * @param options - Configuration options for constructing the synthetic pointer event.
 * @returns A React-compatible `PointerEvent`.
 */
export const createSyntheticPointerEvent = <TElement extends Element, TEvent extends PointerEvent>(options: CreateSyntheticPointerEventOptions<TElement, TEvent>): ReactPointerEvent<TElement> => {
    // Extract options:
    const {
        // Standards:
        relatedTarget : nativeRelatedTarget,
        
        
        
        // Mouses:
        clientX,
        clientY,
        
        screenX,
        screenY,
        
        pageX,
        pageY,
        
        movementX = 0, // Defaults to `0` if the prop doesn't exist.
        movementY = 0, // Defaults to `0` if the prop doesn't exist.
        
        
        
        // Pointers:
        pointerId,
        pointerType,
        width,
        height,
        pressure,
        tangentialPressure,
        tiltX,
        tiltY,
        twist,
        isPrimary,
        
        
        
        // Buttons:
        button,
        buttons,
        
        ctrlKey,
        shiftKey,
        altKey,
        metaKey,
        
        getModifierState,
    } = options.nativeEvent;
    
    
    
    // Apply defaults and retain other options:
    const {
        // Standards:
        relatedTarget = nativeRelatedTarget,
        
        
        
        // Rests:
        ...restOptions
    } = options;
    
    
    
    // Construct synthetic pointer event:
    return {
        // Bases:
        ...createSyntheticUIEvent<TElement, TEvent>(restOptions),
        
        
        
        // Standards:
        relatedTarget,
        
        
        
        // Mouses:
        clientX,
        clientY,
        
        screenX,
        screenY,
        
        pageX,
        pageY,
        
        movementX,
        movementY,
        
        
        
        // Pointers:
        pointerId,
        pointerType : pointerType as 'mouse' | 'pen' | 'touch',
        width,
        height,
        pressure,
        tangentialPressure,
        tiltX,
        tiltY,
        twist,
        isPrimary,
        
        
        
        // Buttons:
        button,
        buttons,
        
        ctrlKey,
        shiftKey,
        altKey,
        metaKey,
        
        // Ensures function binding:
        getModifierState : (key: string): boolean => getModifierState.call(options.nativeEvent, key),
    } satisfies ReactPointerEvent<TElement>;
};



/**
 * Defines the configuration options for creating a React-compatible synthetic keyboard event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native keyboard event being wrapped.
 */
export interface CreateSyntheticKeyboardEventOptions<out TElement extends Element, out TEvent extends KeyboardEvent>
    extends
        // Bases:
        CreateSyntheticUIEventOptions<TElement, TEvent>
{
}

/**
 * Creates a React-compatible synthetic keyboard event from a native keyboard event.
 * 
 * @template TElement - The type of the DOM element associated with the event.
 * @template TEvent - The type of the native keyboard event being wrapped.
 * 
 * @param options - Configuration options for constructing the synthetic keyboard event.
 * @returns A React-compatible `KeyboardEvent`.
 */
export const createSyntheticKeyboardEvent = <TElement extends Element, TEvent extends KeyboardEvent>(options: CreateSyntheticKeyboardEventOptions<TElement, TEvent>): ReactKeyboardEvent<TElement> => {
    // Extract options:
    const {
        // Buttons:
        charCode : _charCode, // Removed.
        code,
        
        key,
        keyCode,
        
        which,
        
        ctrlKey,
        shiftKey,
        altKey,
        metaKey,
        
        location,
        repeat,
        // @ts-ignore
        locale,
        
        getModifierState,
    } = options.nativeEvent;
    
    
    
    // Construct synthetic keyboard event:
    return {
        // Bases:
        ...createSyntheticUIEvent<TElement, TEvent>(options),
        
        
        
        // Buttons:
        charCode: 0, // Deprecated: Always 0.
        code,
        
        key,
        keyCode,
        
        which,
        
        ctrlKey,
        shiftKey,
        altKey,
        metaKey,
        
        location,
        repeat,
        locale,
        
        // Ensures function binding:
        getModifierState : (key: string): boolean => getModifierState.call(options.nativeEvent, key),
    } satisfies ReactKeyboardEvent<TElement>;
};
