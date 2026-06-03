/**
 * A callback type for handling value changes along with an associated event metadata.
 * 
 * Unlike standard React event handlers (e.g., `<input onChange={(event) => {...}} />`),
 * this function separates the updated value from the triggering event.
 * 
 * This design allows **direct integration with React's `useState` dispatcher**:
 * ```tsx
 * // A state for managing the value:
 * const [name, setName] = useState('');
 * 
 * // A common case for simple value updates without event handling:
 * <Input
 *     value={name}
 *     onValueChange={setName} // Directly pass the state updater; the event parameter is ignored.
 * />
 * 
 * // A rare case where the event is needed:
 * <Input
 *     value={name}
 *     onValueChange={(newValue, event) => {
 *         setName(newValue);      // Update state.
 *         event.preventDefault(); // Additional event handling logic can be performed here.
 *     }}
 * />
 * ```
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param newValue - The new value after the change.
 * @param event - The event associated with the change (may contain additional metadata).
 * 
 * @returns void — used purely for updating state or processing events.
 */
export type ValueChangeHandler<TValue, TChangeEvent = unknown> = (newValue: TValue, event: TChangeEvent) => void;

/**
 * A function type for dispatching value changes along with an associated event metadata.
 * 
 * Typically used inside components to notify subscribers about value changes,
 * enabling event-aware reactivity in UI systems.
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @param newValue - The new value to dispatch.
 * @param event - The event associated with the dispatch (may contain additional metadata).
 * 
 * @returns void — used purely for notifying listeners of changes.
 */
export type ValueChangeDispatcher<TValue, TChangeEvent = unknown> = (newValue: TValue, event: TChangeEvent) => void;



/**
 * A tuple API for reading and updating a value.
 * 
 * Standardizes the controlled/uncontrolled pattern by pairing:
 * - `value`    → the current value being managed.
 * - `dispatch` → a dispatcher function for propagating value changes, with additional event metadata.
 * 
 * This mirrors React's `[state, setState]` convention, but extends the dispatcher
 * to pass both the new value and the triggering event.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 * 
 * @returns A tuple:
 * - `[0]` → `TValue` — the current value.
 * - `[1]` → `(newValue: TValue, event: TChangeEvent) => void` — dispatcher for propagating value changes.
 */
export type ValueChangeTuple<TValue, TChangeEvent = unknown> = [TValue, ValueChangeDispatcher<TValue, TChangeEvent>];



/**
 * Base props for handling event-driven value changes.
 * 
 * Provides an optional callback that responds to updates
 * by providing both the new value and the triggering event.
 * 
 * @template TValue - The type of the value being updated.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface ValueProps<TValue, TChangeEvent = unknown> {
    /**
     * Callback invoked when the value changes.
     * 
     * - Receives the new value and the event that triggered the change.
     * - Can be omitted if external handling is not required.
     * 
     * See {@link ValueChangeHandler} for parameter details.
     */
    onValueChange?: ValueChangeHandler<TValue, TChangeEvent>
}

/**
 * Props for a **fully controlled** value.
 * 
 * - The value is managed externally and must be provided.
 * - No internal state is used.
 * - Every change triggers `onValueChange` to request the parent update.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface ControlledValueProps<TValue, TChangeEvent = unknown>
    extends
        // Bases:
        ValueProps<TValue, TChangeEvent>
{
    /**
     * The externally controlled value.
     * 
     * - Must be explicitly provided.
     * - Updates are handled externally (e.g., via React's `useState`).
     */
    value: TValue
}

/**
 * Props for a **fully uncontrolled** value.
 * 
 * - The state (value) is managed internally with `useState`.
 * - Requires `defaultValue` to initialize internal state.
 * - Updates are handled internally, but `onValueChange` is still notified.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface UncontrolledValueProps<TValue, TChangeEvent = unknown>
    extends
        // Bases:
        ValueProps<TValue, TChangeEvent>
{
    /**
     * The initial value for uncontrolled state.
     * 
     * - Must be explicitly provided.
     * - Provides the initial value for internal state.
     */
    defaultValue: TValue
}

/**
 * Props for a **controllable** (controlled or uncontrolled) value.
 * 
 * - If `value` is provided → acts as controlled (driven by external state).
 * - If `value` is omitted → acts as uncontrolled (driven by internal state).
 * - Requires `defaultValue` to initialize internal state.
 * - Every change triggers `onValueChange`, regardless of mode.
 * 
 * @template TValue - The type of the value being managed.
 * @template TChangeEvent - The type of the event triggering the value change.
 */
export interface ControllableValueProps<TValue, TChangeEvent = unknown>
    extends
        // Bases:
        ValueProps<TValue, TChangeEvent>,
        Partial<Pick<ControlledValueProps<TValue, TChangeEvent>, 'value'>>, // TypeScript helper: Links the `value` to `ControlledValueProps.value`.
        Pick<UncontrolledValueProps<TValue, TChangeEvent>, 'defaultValue'>  // TypeScript helper: Links the `defaultValue` to `UncontrolledValueProps.defaultValue`
{
    /**
     * The externally controlled value (if provided).
     * 
     * - When provided, the component behaves as controlled (driven by external state).
     * - When omitted, the component behaves as uncontrolled (driven by internal state).
     */
    value?: TValue
    
    /**
     * The initial value for uncontrolled state.
     * 
     * - Must be explicitly provided.
     * - Used only when `value` is not provided.
     * - Provides the initial value for internal state.
     */
    defaultValue: TValue
}
