'use client' // The exported hooks are client side only. These hooks indirectly use `useState` and `useStableCallback` which are client side only hooks.

// Types:
import {
    type ValueChangeApi,
    type ControllableValueChangeProps,
    type UncontrollableValueChangeProps,
    type HybridValueChangeProps,
}                           from './deprecated-types.js'

// Reusable-ui utilities:
import {
    // Utilities:
    useControlledValue,
    useUncontrolledValue,
    useControllableValue,
}                           from '@reusable-ui/controllable'    // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).



/**
 * @deprecated Use `useControlledValue` from `@reusable-ui/controllable` instead,
 * which provides a more streamlined and consistent hook for managing fully controllable value states, ensuring better integration with external state management patterns.
 * 
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
 *      const { value: isActive, dispatchValueChange } = useControllableValueChange<boolean, Event>({
 *          value         : active,
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
export const useControllableValueChange = <TValue, TChangeEvent = unknown>(props: ControllableValueChangeProps<TValue, TChangeEvent>): ValueChangeApi<TValue, TChangeEvent> => {
    // Delegate to `useControlledValue`:
    const [value, dispatchValueChange] = useControlledValue<TValue, TChangeEvent>(props);
    
    
    
    // API:
    return {
        // Values:
        value,
        
        
        
        // Stable functions:
        dispatchValueChange,
    } satisfies ValueChangeApi<TValue, TChangeEvent>;
};

/**
 * @deprecated Use `useUncontrolledValue` from `@reusable-ui/controllable` instead,
 * which provides a more intuitive and consistent hook for managing uncontrollable value states, ensuring better support for internal state management and event handling.
 * 
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
    // Delegate to `useUncontrolledValue`:
    const [value, dispatchValueChange] = useUncontrolledValue<TValue, TChangeEvent>(props);
    
    
    
    // API:
    return {
        // Values:
        value,
        
        
        
        // Stable functions:
        dispatchValueChange,
    } satisfies ValueChangeApi<TValue, TChangeEvent>;
};

/**
 * @deprecated Use `useControllableValue` from `@reusable-ui/controllable` instead,
 * which provides a more comprehensive and flexible hook for managing hybrid value states, ensuring better support for both controllable and uncontrollable behaviors within the same component.
 * 
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
 *      const { value: isActive, dispatchValueChange } = useHybridValueChange<boolean, Event>({
 *          defaultValue  : defaultActive,
 *          value         : active,
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
export const useHybridValueChange = <TValue, TChangeEvent = unknown>(props: HybridValueChangeProps<TValue, TChangeEvent>): ValueChangeApi<TValue, TChangeEvent> => {
    // Delegate to `useControllableValue`:
    const [value, dispatchValueChange] = useControllableValue<TValue, TChangeEvent>(props);
    
    
    
    // API:
    return {
        // Values:
        value,
        
        
        
        // Stable functions:
        dispatchValueChange,
    } satisfies ValueChangeApi<TValue, TChangeEvent>;
};
