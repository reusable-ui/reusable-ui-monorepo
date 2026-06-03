// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeHandler,
    type ValueChangeTuple,
    
    type ValueProps,
    type ControlledValueProps,
    type UncontrolledValueProps,
    type ControllableValueProps,
}                           from '@reusable-ui/controllable'    // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).



/**
 * @deprecated Use `ValueChangeHandler` from `@reusable-ui/controllable` instead,
 * which provides a more consistent and intuitive API for handling value changes with event metadata.
 * 
 * A function type for handling event-driven value changes.
 * 
 * Unlike standard React event handlers (e.g., `<input onChange={(event) => {...}} />`),
 * this function explicitly separates the updated value from the triggering event.
 * 
 * - The first parameter (`newValue`) represents the updated value.
 * - The second parameter (`event`) carries metadata about the change event (if applicable).
 * - If the event does not contain value-related data, only the `newValue` is relevant.
 * 
 * This design supports **direct integration with React's `useState` dispatcher**, allowing:
 * ```tsx
 * <FooComponent onActiveChange={setActive} />
 * ```
 * Since `setActive(newValue)` does not accept an event, the second parameter is safely ignored.
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param newValue - The newly updated value after the event occurs.
 * @param event - The event associated with the value change (may contain additional metadata).
 * 
 * @returns `void` - No return value; the function is used purely for updating state and processing events.
 */
export type ValueChangeEventHandler<in TValue, in TChangeEvent = unknown> = ValueChangeHandler<TValue, TChangeEvent>;



/**
 * @deprecated Use `ValueChangeTuple` from `@reusable-ui/controllable` instead,
 * which provides a more standardized and flexible API for managing value changes in both controllable and uncontrollable components.
 * 
 * Defines the API for handling value changes in a controllable or uncontrollable manner.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface ValueChangeApi<in out TValue, in TChangeEvent = unknown> {
    // Values:
    
    /**
     * The current value being managed.
     */
    value               : ValueChangeTuple<TValue, TChangeEvent>[0]
    
    
    
    // Functions:
    
    /**
     * A function to dispatch value changes alongside an associated event.
     * 
     * This function is responsible for propagating state changes, notifying subscribers,
     * and triggering value-related events where applicable.
     * 
     * See {@link ValueChangeDispatcher} for parameter details.
     */
    dispatchValueChange : ValueChangeTuple<TValue, TChangeEvent>[1]
}



/**
 * @deprecated Use `ValueProps` from `@reusable-ui/controllable` instead,
 * which provides a more cohesive and comprehensive set of properties for managing value changes in both controllable and uncontrollable components.
 * 
 * Defines properties for handling value changes in a component.
 * 
 * - Provides an optional callback (`onValueChange`) for responding to value changes.
 * - Supports event-driven state updates by passing both the **new value** and the triggering **event**.
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export type ValueChangeProps<TValue, TChangeEvent = unknown> = ValueProps<TValue, TChangeEvent>;

/**
 * @deprecated Use `ControlledValueProps` from `@reusable-ui/controllable` instead,
 * which provides a more robust and flexible set of properties for managing fully controllable value states, ensuring better integration with external state management patterns.
 * 
 * Defines properties for a **fully controllable** value state.
 * 
 * - The value is **managed externally**, meaning `value` must be provided.
 * - No internal state is used—updates are fully controlled via the provided `value`.
 * - Every update triggers `onValueChange`, requesting an external state update.
 * 
 * @template TValue - The type of the value being managed externally.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export type ControllableValueChangeProps<TValue, TChangeEvent = unknown> = ControlledValueProps<TValue, TChangeEvent>;

/**
 * @deprecated Use `UncontrolledValueProps` from `@reusable-ui/controllable` instead,
 * which provides a more intuitive and consistent set of properties for managing uncontrollable value states, ensuring better support for internal state management and event handling.
 * 
 * Defines properties for an **uncontrollable** value state.
 * 
 * - The value is **managed internally** using `useState`.
 * - Requires a **`defaultValue`** to initialize the internal state.
 * - Does **not rely on external state management**—updates are handled internally.
 * - Every update triggers `onValueChange`, notifying the internal state change.
 * 
 * @template TValue - The type of the value being managed internally.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export type UncontrollableValueChangeProps<TValue, TChangeEvent = unknown> = UncontrolledValueProps<TValue, TChangeEvent>;

/**
 * @deprecated Use `ControllableValueProps` from `@reusable-ui/controllable` instead,
 * which provides a more comprehensive and flexible set of properties for managing hybrid value states, ensuring better support for both controllable and uncontrollable behaviors within the same component.
 * 
 * Defines properties for a **hybrid value state**, supporting both controllable and uncontrollable behaviors.
 * 
 * - If `value` is provided, the component functions as **controllable**, relying on external state.
 * - If `value` is **not provided**, the component operates as **uncontrollable**, managing the state internally.
 * - Requires a **`defaultValue`** to initialize the internal state.
 * - Every update triggers `onValueChange`, either notifying an internal state change or requesting an external state update.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export type HybridValueChangeProps<TValue, TChangeEvent = unknown> = ControllableValueProps<TValue, TChangeEvent>;
