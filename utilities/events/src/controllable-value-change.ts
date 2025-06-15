// Types:
import {
    type ValueChangeDispatcher,
    type ValueChangeApi,
    type ControllableValueChangeProps,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A custom hook for managing a **fully controllable** value state.
 * 
 * - The value is **managed externally**, meaning `value` must be provided.
 * - No internal state is used—updates are fully controlled via the provided `value`.
 * - Every update triggers `onValueChange`, requesting an external state update.
 * 
 * @template TValue - The type of the value being managed externally.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param props - The controllable value change properties.
 * @returns An API containing the current value and a dispatcher for triggering changes.
 * 
 * @example
 * ```tsx
 * export interface ExampleComponentProps {
 *      active          : boolean
 *      onActiveChange ?: (newActive: boolean, event: Event) => void
 * }
 * 
 * export const ExampleComponent = (props: ExampleComponentProps) => {
 *      const {
 *          active,
 *          onActiveChange
 *      } = props;
 *      
 *      const { value: isActive, triggerValueChange } = useControllableValueChange<boolean, Event>({
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
export const useControllableValueChange = <TValue, TChangeEvent = unknown>(props: ControllableValueChangeProps<TValue, TChangeEvent>): ValueChangeApi<TValue, TChangeEvent> => {
    // Extract props:
    const {
        // Values:
        value         : externalValue,
        onValueChange : onValueChange,
    } = props;
    
    
    
    // Stable functions:
    const triggerValueChange : ValueChangeDispatcher<TValue, TChangeEvent> = useStableCallback((newValue: TValue, event: TChangeEvent): void => {
        // Trigger external change handler (if provided):
        onValueChange?.(newValue, event);
    });
    
    
    
    // API:
    return {
        // Values:
        value : externalValue,
        
        
        
        // Stable functions:
        triggerValueChange,
    } satisfies ValueChangeApi<TValue, TChangeEvent>;
};
