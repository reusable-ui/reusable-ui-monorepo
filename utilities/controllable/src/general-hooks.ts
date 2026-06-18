// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    type DispatchValueChange,
    type ValueChangeTuple,
    type ControlledValueProps,
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
    const dispatchValueChange : DispatchValueChange<TValue, TChangeEvent> = useStableCallback(handleValueChange);
    
    
    
    // Return tuple API:
    return [
        controlledValue,
        dispatchValueChange,
    ] satisfies ValueChangeTuple<TValue, TChangeEvent>;
};
