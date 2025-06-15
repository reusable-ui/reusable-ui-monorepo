/**
 * A function type for dispatching value changes alongside an associated event.
 * 
 * This function is often used within components to **notify subscribers** about value changes,
 * enabling event-driven reactivity in UI systems.
 * 
 * - The first parameter (`newValue`) represents the updated value.
 * - The second parameter (`event`) carries metadata about the change event (if applicable).
 * - If the event does not contain value-related data, only the `newValue` is relevant.
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param newValue - The newly updated value to be dispatched.
 * @param event - The event associated with the change action (may contain additional metadata).
 * 
 * @returns `void` - No return value; the function is used purely for dispatching change notifications.
 */
export type ValueChangeDispatcher<in TValue, in TChangeEvent = unknown> = (newValue: TValue, event: TChangeEvent) => void;

/**
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
export type ValueChangeEventHandler<in TValue, in TChangeEvent = unknown> = (newValue: TValue, event: TChangeEvent) => void;



/**
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
    value              : TValue
    
    
    
    // Functions:
    
    /**
     * A function to dispatch value changes alongside an associated event.
     * 
     * This function is responsible for propagating state changes, notifying subscribers,
     * and triggering value-related events where applicable.
     * 
     * See {@link ValueChangeDispatcher} for parameter details.
     */
    triggerValueChange : ValueChangeDispatcher<TValue, TChangeEvent>
}



/**
 * Defines properties for handling value changes in a component.
 * 
 * - Provides an optional callback (`onValueChange`) for responding to value changes.
 * - Supports event-driven state updates by passing both the **new value** and the triggering **event**.
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface ValueChangeProps<in TValue, in TChangeEvent = unknown> {
    // Values:
    
    /**
     * A function to handle event-driven value changes.
     * 
     * - Invoked when the value changes.
     * - Accepts the **new value** and the **event** that triggered the change.
     * - Can be omitted (`undefined`) if value updates do not require an external handler.
     * 
     * See {@link ValueChangeEventHandler} for parameter details.
     */
    onValueChange     ?: ValueChangeEventHandler<TValue, TChangeEvent> | undefined
}

/**
 * Defines properties for a **fully controllable** value state.
 * 
 * - The value is **managed externally**, meaning `value` must be provided.
 * - No internal state is used—updates are fully controlled via the provided `value`.
 * - Every update triggers `onValueChange`, requesting an external state update.
 * 
 * @template TValue - The type of the value being managed externally.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface ControllableValueChangeProps<in out TValue, in TChangeEvent = unknown>
    extends
        // Bases:
        ValueChangeProps<TValue, TChangeEvent>
{
    // Values:
    
    /**
     * The externally controlled value.
     * 
     * - Must be explicitly provided—this component does **not** manage its own state.
     * - Changes should be **handled externally**, such as through React state or context.
     */
    value              : TValue
}

/**
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
export interface UncontrollableValueChangeProps<in out TValue, in TChangeEvent = unknown>
    extends
        // Bases:
        ValueChangeProps<TValue, TChangeEvent>
{
    // Values:
    
    /**
     * The initial value for uncontrolled state.
     * - Used to initialize internal state when no external `value` is provided.
     * - Ensures consistent behavior in uncontrolled scenarios.
     */
    defaultValue       : TValue
}

/**
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
export interface HybridValueChangeProps<in out TValue, in TChangeEvent = unknown>
    extends
        // Bases:
        ValueChangeProps<TValue, TChangeEvent>,
        Partial<Pick<ControllableValueChangeProps<TValue, TChangeEvent>, 'value'>>, // TypeScript helper: Links the `value` to `ControllableValueChangeProps.value`.
        Pick<UncontrollableValueChangeProps<TValue, TChangeEvent>, 'defaultValue'>  // TypeScript helper: Links the `defaultValue` to `UncontrollableValueChangeProps.defaultValue`
{
    /**
     * The externally controlled value (if provided).
     * 
     * - When defined, the component behaves as **controllable**, relying on external state updates.
     * - When omitted (`undefined`), the component **defaults to an uncontrolled state** using `defaultValue`.
     */
    value             ?: TValue | undefined
    
    /**
     * The initial value for uncontrolled state.
     * 
     * - Used **only when** `value` is `undefined`, allowing internal state management.
     * - Provides the **default starting value** when external control is absent.
     */
    defaultValue       : TValue
}
