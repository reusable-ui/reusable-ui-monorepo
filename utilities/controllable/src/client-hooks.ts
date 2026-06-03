'use client' // The exported hooks are client side only. These hooks use `useState` and `useStableCallback` which are client side only hooks.

// React:
import {
    // Hooks:
    useState,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    type ValueChangeDispatcher,
    type ValueChangeTuple,
    type ControlledValueProps,
    type UncontrolledValueProps,
    type ControllableValueProps,
}                           from './types.js'



/**
 * Provides a **fully controlled** value.
 * 
 * Use when the parent component owns the state (value) and you only need
 * a dispatcher to request updates.
 * 
 * Behavior:
 * - Always reflects the externally provided `value`.
 * - No internal state is used.
 * - Every change triggers `onValueChange` to request the parent update.
 * - The provided dispatcher is **referentially stable** — it does not change
 *   even if `onValueChange` changes.  
 *   This means it can safely be used inside `useEffect` or `useCallback`
 *   without being listed in dependency arrays.
 * 
 * @example
 * ```tsx
 * import { useControlledValue, ValueChangeHandler } from '@reusable-ui/controllable'
 * 
 * export interface CustomWidgetProps {
 *     // "Active" state domain props:
 *     active         ?: boolean
 *     onActiveChange ?: ValueChangeHandler<boolean, React.MouseEvent>
 * }
 * 
 * export const CustomWidget = (props: CustomWidgetProps) => {
 *     const {
 *         // "Active" state domain props:
 *         active = false, // Fully controlled mode requires a fallback control value.
 *         onActiveChange,
 *     } = props;
 *     
 *     // Map "active" props into controlled mode:
 *     const [isActive, dispatchActiveChange] = useControlledValue<boolean, React.MouseEvent>({
 *         value         : active,
 *         onValueChange : onActiveChange,
 *     });
 *     
 *     // Usage example:
 *     return (
 *         <button onClick={(event) => dispatchActiveChange(!isActive, event)}>
 *             {isActive ? 'Active' : 'Inactive'}
 *         </button>
 *     );
 * };
 * ```
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param props - The controlled value props.
 * @returns `[currentValue, dispatchValueChange]` — the current external value and a stable dispatcher to request changes.
 */
export const useControlledValue   = <TValue, TChangeEvent = unknown>(props: ControlledValueProps<TValue, TChangeEvent>): ValueChangeTuple<TValue, TChangeEvent> => {
    // Extract props:
    const {
        // Values:
        value         : controlledValue,
        onValueChange : handleValueChange,
    } = props;
    
    
    
    // Stable dispatcher:
    // - Referentially stable across renders.
    // - Safe to use inside `useEffect` or `useCallback` without being listed in dependency arrays.
    const dispatchValueChange : ValueChangeDispatcher<TValue, TChangeEvent> = useStableCallback(handleValueChange);
    
    
    
    // Return tuple API:
    return [
        controlledValue,
        dispatchValueChange,
    ] satisfies ValueChangeTuple<TValue, TChangeEvent>;
};

/**
 * Provides a **controllable** (controlled or uncontrolled) value.
 * 
 * Use when the component can flexibly operate in either mode:
 * 
 * - **Controlled mode** → The parent component owns the state (value).  
 *   The hook reflects the externally provided `value` and provides a dispatcher
 *   to request updates.
 * 
 * - **Uncontrolled mode** → The component should manage its own state (value) internally.  
 *   The hook initializes from `defaultValue` while still notifying the parent
 *   of changes.
 * 
 * Behavior:
 * - If `value` is provided → acts as controlled (driven by external state).
 * - If `value` is omitted → acts as uncontrolled (driven by internal state).
 * - Requires `defaultValue` to initialize internal state.
 * - Every change triggers `onValueChange`, regardless of mode.
 * - The provided dispatcher is **referentially stable** — it does not change
 *   even if `onValueChange` changes.  
 *   This means it can safely be used inside `useEffect` or `useCallback`
 *   without being listed in dependency arrays.
 * 
 * @example
 * ```tsx
 * import { useControllableValue, ValueChangeHandler } from '@reusable-ui/controllable'
 * 
 * export interface CustomWidgetProps {
 *     // "Active" state domain props:
 *     defaultActive  ?: boolean
 *     active         ?: boolean
 *     onActiveChange ?: ValueChangeHandler<boolean, React.MouseEvent>
 * }
 * 
 * export const CustomWidget = (props: CustomWidgetProps) => {
 *     const {
 *         // "Active" state domain props:
 *         defaultActive = false, // Uncontrolled mode requires a fallback initial value.
 *         active,
 *         onActiveChange,
 *     } = props;
 *     
 *     // Map "active" props into controllable (hybrid) mode:
 *     const [isActive, dispatchActiveChange] = useControllableValue<boolean, React.MouseEvent>({
 *         defaultValue  : defaultActive,
 *         value         : active,
 *         onValueChange : onActiveChange,
 *     });
 *     
 *     // Usage example:
 *     return (
 *         <button onClick={(event) => dispatchActiveChange(!isActive, event)}>
 *             {isActive ? 'Active' : 'Inactive'}
 *         </button>
 *     );
 * };
 * ```
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param props - The controllable value props.
 * @returns `[currentValue, dispatchValueChange]` — the resolved value and a stable dispatcher to trigger changes.
 */
export const useControllableValue = <TValue, TChangeEvent = unknown>(props: ControllableValueProps<TValue, TChangeEvent>): ValueChangeTuple<TValue, TChangeEvent> => {
    // Extract props:
    const {
        // Values:
        defaultValue  : initialValue,
        value         : controlledValue,
        onValueChange : handleValueChange,
    } = props;
    
    // Determine whether the component is in controlled mode:
    const isControlled = (controlledValue !== undefined);
    
    
    
    // States:
    
    // Internal state only used when uncontrolled:
    const [internalValue, setInternalValue] = useState<TValue>(initialValue);
    
    
    
    // Stable dispatcher:
    // - Referentially stable across renders.
    // - Safe to use inside `useEffect` or `useCallback` without being listed in dependency arrays.
    const dispatchValueChange : ValueChangeDispatcher<TValue, TChangeEvent> = useStableCallback((newValue: TValue, event: TChangeEvent): void => {
        // Updates internal state if uncontrolled:
        if (!isControlled) setInternalValue(newValue);
        
        
        
        // Always notifies external handler if provided:
        handleValueChange?.(newValue, event);
    });
    
    
    
    // Return tuple API:
    return [
        isControlled ? controlledValue : internalValue,
        dispatchValueChange,
    ] satisfies ValueChangeTuple<TValue, TChangeEvent>;
};

/**
 * Provides a **fully uncontrolled** value.
 * 
 * Use when the component should manage its own state (value) internally,
 * while still notifying the parent of changes.
 * 
 * Behavior:
 * - The state (value) is managed internally with `useState`.
 * - Requires `defaultValue` to initialize internal state.
 * - Updates are handled internally, but `onValueChange` is still notified.
 * - The provided dispatcher is **referentially stable** — it does not change
 *   even if `onValueChange` changes.  
 *   This means it can safely be used inside `useEffect` or `useCallback`
 *   without being listed in dependency arrays.
 * 
 * @example
 * ```tsx
 * import { useUncontrolledValue, ValueChangeHandler } from '@reusable-ui/controllable'
 * 
 * export interface CustomWidgetProps {
 *     // "Active" state domain props:
 *     defaultActive  ?: boolean
 *     onActiveChange ?: ValueChangeHandler<boolean, React.MouseEvent>
 * }
 * 
 * export const CustomWidget = (props: CustomWidgetProps) => {
 *     const {
 *         // "Active" state domain props:
 *         defaultActive = false, // Fully uncontrolled mode requires a fallback initial value.
 *         onActiveChange,
 *     } = props;
 *     
 *     // Map "active" props into uncontrolled mode:
 *     const [isActive, dispatchActiveChange] = useUncontrolledValue<boolean, React.MouseEvent>({
 *         defaultValue  : defaultActive,
 *         onValueChange : onActiveChange,
 *     });
 *     
 *     // Usage example:
 *     return (
 *         <button onClick={(event) => dispatchActiveChange(!isActive, event)}>
 *             {isActive ? 'Active' : 'Inactive'}
 *         </button>
 *     );
 * };
 * ```
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param props - The uncontrolled value props.
 * @returns `[currentValue, dispatchValueChange]` — the internal state value and a stable dispatcher to update it.
 */
export const useUncontrolledValue = <TValue, TChangeEvent = unknown>(props: UncontrolledValueProps<TValue, TChangeEvent>): ValueChangeTuple<TValue, TChangeEvent> => {
    // Extract props:
    const {
        // Values:
        defaultValue  : initialValue,
        onValueChange : handleValueChange,
    } = props;
    
    
    
    // Delegate to `useControllableValue`:
    // - With `value` omitted to force uncontrolled mode.
    // - Avoids duplicating logic.
    return useControllableValue<TValue, TChangeEvent>({
        defaultValue  : initialValue,
        // value      : undefined, // Force to uncontrolled mode by providing `undefined` (or simply omitting it).
        onValueChange : handleValueChange,
    });
};
