// React:
import {
    // Hooks:
    useState,
}                           from 'react'

// Types:
import {
    type ValueChangeDispatcher,
    type ValueChangeApi,
    type UncontrollableValueChangeProps,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A custom hook for managing an **uncontrollable** value state.
 * 
 * - The value is **managed internally** using `useState`.
 * - Requires a **`defaultValue`** to initialize the internal state.
 * - Does **not rely on external state management**—updates are handled internally.
 * - Every update triggers `onValueChange`, notifying the internal state change.
 * 
 * @template TValue - The type of the value being managed internally.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param props - The uncontrollable value change properties.
 * @returns An API containing the current value and a dispatcher for triggering changes.
 * 
 * @example
 * ```tsx
 * export interface ExampleComponentProps {
 *      defaultActive  ?: boolean
 *      onActiveChange ?: (newActive: boolean, event: Event) => void
 * }
 * 
 * export const ExampleComponent = (props: ExampleComponentProps) => {
 *      const {
 *          defaultActive = false, // Requires a default value to initialize the internal state.
 *          onActiveChange
 *      } = props;
 *      
 *      const { value: isActive, dispatchValueChange } = useUncontrollableValueChange<boolean, Event>({
 *          defaultValue  : defaultActive,
 *          onValueChange : onActiveChange,
 *      });
 *      
 *      return (
 *          <button onClick={() => dispatchValueChange(!isActive, new Event('active', { bubbles: true, cancelable: false }))}>
 *              {isActive ? 'Active' : 'Inactive'}
 *          </button>
 *      );
 * };
 * ```
 */
export const useUncontrollableValueChange = <TValue, TChangeEvent = unknown>(props: UncontrollableValueChangeProps<TValue, TChangeEvent>): ValueChangeApi<TValue, TChangeEvent> => {
    // Extract props:
    const {
        // Values:
        defaultValue  : defaultInternalValue,
        onValueChange : onValueChange,
    } = props;
    
    
    
    // States:
    
    // Internal state management:
    const [internalValue, setInternalValue] = useState<TValue>(defaultInternalValue);
    
    
    
    // Stable functions:
    const dispatchValueChange : ValueChangeDispatcher<TValue, TChangeEvent> = useStableCallback((newValue: TValue, event: TChangeEvent): void => {
        // Update the internal value:
        setInternalValue(newValue);
        
        
        
        // Trigger external change handler (if provided):
        onValueChange?.(newValue, event);
    });
    
    
    
    // API:
    return {
        // Values:
        value : internalValue,
        
        
        
        // Stable functions:
        dispatchValueChange,
    } satisfies ValueChangeApi<TValue, TChangeEvent>;
};
