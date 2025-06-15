// React:
import {
    // Hooks:
    useState,
}                           from 'react'

// Types:
import {
    type ValueChangeDispatcher,
    type ValueChangeApi,
    type HybridValueChangeProps,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A custom hook for managing a **hybrid value state**, supporting both controllable and uncontrollable behaviors.
 * 
 * - If `value` is provided, the component functions as **controllable**, relying on external state.
 * - If `value` is **not provided**, the component operates as **uncontrollable**, managing the state internally.
 * - Requires a **`defaultValue`** to initialize the internal state.
 * - Every update triggers `onValueChange`, either notifying an internal state change or requesting an external state update.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param props - The hybrid value change properties.
 * @returns An API containing the current value and a dispatcher for triggering changes.
 * 
 * @example
 * ```tsx
 * export interface ExampleComponentProps {
 *      defaultActive  ?: boolean
 *      active         ?: boolean
 *      onActiveChange ?: (newActive: boolean, event: Event) => void
 * }
 * 
 * export const ExampleComponent = (props: ExampleComponentProps) => {
 *      const {
 *          defaultActive = false, // Requires a default value to initialize the internal state.
 *          active,
 *          onActiveChange
 *      } = props;
 *      
 *      const { value: isActive, triggerValueChange } = useHybridValueChange<boolean, Event>({
 *          defaultValue  : defaultActive,
 *          value         : active,
 *          onValueChange : onActiveChange,
 *      });
 *      
 *      return (
 *          <button onClick={() => triggerValueChange(!isActive, new Event('active', { bubbles: true, cancelable: false }))}>
 *              {isActive ? 'Active' : 'Inactive'}
 *          </button>
 *      );
 * };
 * ```
 */
export const useHybridValueChange = <TValue, TChangeEvent = unknown>(props: HybridValueChangeProps<TValue, TChangeEvent>): ValueChangeApi<TValue, TChangeEvent> => {
    // Extract props:
    const {
        // Values:
        defaultValue  : defaultInternalValue,
        value         : externalValue,
        onValueChange : onValueChange,
    } = props;
    
    const isExternallyControlled = (externalValue !== undefined);
    
    
    
    // States:
    
    // Internal state management (only used when uncontrolled):
    const [internalValue, setInternalValue] = useState<TValue>(defaultInternalValue);
    
    
    
    // Stable functions:
    const triggerValueChange : ValueChangeDispatcher<TValue, TChangeEvent> = useStableCallback((newValue: TValue, event: TChangeEvent): void => {
        // Update the internal value only if uncontrolled:
        if (!isExternallyControlled) setInternalValue(newValue);
        
        
        
        // Trigger external change handler (if provided):
        onValueChange?.(newValue, event);
    });
    
    
    
    // API:
    return {
        // Values:
        value : isExternallyControlled ? externalValue : internalValue,
        
        
        
        // Stable functions:
        triggerValueChange,
    } satisfies ValueChangeApi<TValue, TChangeEvent>;
};
