// React:
import {
    // Types:
    type Context,
}                           from 'react'



/**
 * Props for resolving an effective state value from controlled or uncontrolled inputs.
 * 
 * - **Controlled mode**: supply `state` directly. The component reflects the external value.
 * - **Uncontrolled mode**: omit `state` and optionally specify `defaultState` as the initial value.
 * 
 * @template TState - The type of the state value.
 */
export interface ControllableStateProps<TState extends {} | null> {
    /**
     * Supplies the current state for controlled mode.
     * If supplied, the component becomes fully controlled by the parent.
     */
    state        ?: TState
    
    /**
     * Specifies the initial state for uncontrolled mode.
     * Used only when `state` is not supplied.
     */
    defaultState ?: TState
}

/**
 * Component-level options for resolving an effective state value from controlled or uncontrolled inputs.
 * 
 * - Declares an optional default state used when neither `state` nor `defaultState` prop
 *   is provided by the consumer.
 * 
 * @template TState - The type of the state value.
 */
export interface ControllableStateOptions<TState extends {} | null> {
    /**
     * Declares an optional component-level default state.
     * Acts as a fallback when neither `state` nor `defaultState` prop is provided.
     */
    defaultState ?: TState
}

/**
 * Resolver-level definition for resolving an effective state value from controlled or uncontrolled inputs.
 * 
 * - Declares the mandatory default state used when no `state` prop,
 *   no `defaultState` prop, and no `defaultState` option is provided.
 * 
 * @template TState - The type of the state value.
 */
export interface ControllableStateDefinition<TState extends {} | null> {
    /**
     * Declares the mandatory resolver-level default state.
     * Acts as the final fallback when no other defaults are provided.
     */
    defaultState  : TState
}



/**
 * Props for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional clamping to a valid range.
 * 
 * - **Controlled mode**: supply `state` directly. The component reflects the external value.
 * - **Uncontrolled mode**: omit `state` and optionally specify `defaultState` as the initial value.
 * - Additionally, the resolved state value can be clamped into a valid range.
 * 
 * @template TState - The type of the state value (e.g. number for view index).
 */
export interface RangedStateProps<TState extends {} | null>
    extends
        // Bases:
        ControllableStateProps<TState>
{
    /* No additional props yet - reserved for future extensions. */
}

/**
 * Component-level options for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional clamping to a valid range.
 * 
 * - Declares an optional default state used when neither `state` nor `defaultState` prop
 *   is provided by the consumer.
 * - Declares an optional clamping function to enforce valid ranges.
 * 
 * @template TState - The type of the state value (e.g. number for view index).
 */
export interface RangedStateOptions<TState extends {} | null>
    extends
        // Bases:
        ControllableStateOptions<TState>
{
    /**
     * Declares an optional component-level clamping function to normalize or constrain
     * the raw state into a valid range (e.g. enforcing min/max bounds, step size, or index wrapping).
     * 
     * If omitted, the raw state is returned as-is.
     */
    clampState ?: (rawState: TState) => TState
}

/**
 * Resolver-level definition for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional clamping to a valid range.
 * 
 * - Declares the mandatory default state used when no `state` prop,
 *   no `defaultState` prop, and no `defaultState` option is provided.
 * - Declares an optional clamping function to enforce valid ranges.
 * 
 * @template TState - The type of the state value (e.g. number for view index).
 */
export interface RangedStateDefinition<TState extends {} | null>
    extends
        // Bases:
        ControllableStateDefinition<TState>
{
    /**
     * Declares an optional resolver-level clamping function to normalize or constrain
     * the raw state into a valid range (e.g. enforcing min/max bounds, step size, or index wrapping).
     * 
     * If omitted, the raw state is returned as-is.
     */
    clampState ?: (rawState: TState) => TState
}



/**
 * Props for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional cascading from context when cascade behavior is enabled.
 * 
 * - **Controlled mode**: supply `state` directly. The component reflects the external value.
 * - **Uncontrolled mode**: omit `state` and optionally specify `defaultState` as the initial value.
 * - Additionally, supports cascading behavior to inherit state from context.
 * 
 * @template TState - The type of the state value.
 */
export interface CascadeStateProps<TState extends {} | null>
    extends
        // Bases:
        ControllableStateProps<TState>
{
    /**
     * Specifies whether cascading behavior is enabled:
     * - `true`: attempt to inherit state from context if the resolved state equals `definition.inactiveState`.
     * - `false`: do not cascade; return the baseline inactive state instead.
     */
    cascadeEnabled ?: boolean
}

/**
 * Component-level options for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional cascading from context when cascade behavior is enabled.
 * 
 * - Declares an optional default state used when neither `state` nor `defaultState` prop
 *   is provided by the consumer.
 * - Declares an optional default cascading behavior used when no `cascadeEnabled` prop
 *   is provided by the consumer.
 * 
 * @template TState - The type of the state value.
 */
export interface CascadeStateOptions<TState extends {} | null>
    extends
        // Bases:
        ControllableStateOptions<TState>
{
    /**
     * Declares an optional component-level default cascading behavior.
     * Acts as a fallback when no `cascadeEnabled` prop is provided.
     */
    defaultCascadeEnabled ?: boolean
}

/**
 * Resolver-level definition for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional cascading from context when cascade behavior is enabled.
 * 
 * - Declares the mandatory default state used when no `state` prop,
 *   no `defaultState` prop, and no `defaultState` option is provided.
 * - Declares the mandatory default cascading behavior used when no `cascadeEnabled` prop
 *   is provided by the consumer.
 * - Declares the baseline inactive state used to detect when cascading should apply.
 * - Declares the context to resolve state from when cascading is enabled.
 * 
 * @template TState - The type of the state value.
 */
export interface CascadeStateDefinition<TState extends {} | null>
    extends
        // Bases:
        ControllableStateDefinition<TState>
{
    /**
     * Declares the mandatory resolver-level default cascading behavior.
     * Acts as the final fallback when no other defaults are provided.
     */
    defaultCascadeEnabled  : boolean
    
    /**
     * Declares the baseline inactive state (e.g. `false`).
     * - If the resolved state equals this baseline, cascading rules may apply.
     * - Common values: `false` for `TState = boolean`, or `0` for `TState = number`.
     */
    inactiveState          : TState
    
    /**
     * Declares the context to resolve state from when cascading is enabled.
     * 
     * Resolution behavior:
     * - If the resolved state equals `inactiveState` and `cascadeEnabled` is true,
     *   the hook will attempt to use this context value.
     * - If no `Provider` is found, `use(stateContext)` will return `undefined`,
     *   and the hook will fall back to `inactiveState`.
     * 
     * Note: contexts are expected to be created with `undefined` as their `defaultValue`,
     * so that `use(stateContext)` returns `undefined` when no `Provider` is present.
     */
    stateContext           : Context<TState | undefined>
}



/**
 * Props for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional delegation to an external observer when a declarative token is encountered.
 * 
 * - **Controlled mode**: supply `state` directly. The component reflects the external value.
 * - **Uncontrolled mode**: omit `state` and optionally specify `defaultState` as the initial value.
 * - Additionally, supports dynamic state observation via an external observer.
 * 
 * @template TState - The type of the state value.
 * @template TToken - A special string token used to trigger observation (e.g. `'auto'`).
 */
export interface ObservableStateProps<TState extends {} | null, TToken extends string>
    extends
        // Bases:
        ControllableStateProps<TState | TToken>
{
    /**
     * Supplies a flag indicating whether the component is in a restricted condition
     * (e.g. disabled or read-only).
     * 
     * If true, the state is always forced to `definition.inactiveState`.
     */
    isRestricted  : boolean
    
    /**
     * Supplies the observed state value from an external source (e.g. a custom observer).
     * Used whenever the resolved state equals `definition.observableStateToken`.
     */
    observedState : TState
}

/**
 * Component-level options for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional delegation to an external observer when a declarative token is encountered.
 * 
 * - Declares an optional default state used when neither `state` nor `defaultState` prop
 *   is provided by the consumer.
 * 
 * @template TState - The type of the state value.
 * @template TToken - A special string token used to trigger observation (e.g. `'auto'`).
 */
export interface ObservableStateOptions<TState extends {} | null, TToken extends string>
    extends
        // Bases:
        ControllableStateOptions<TState | TToken>
{
    /* No additional options yet - reserved for future extensions. */
}

/**
 * Resolver-level definition for resolving an effective state value from controlled or uncontrolled inputs,
 * with optional delegation to an external observer when a declarative token is encountered.
 * 
 * - Declares the mandatory default state used when no `state` prop,
 *   no `defaultState` prop, and no `defaultState` option is provided.
 * - Declares the baseline inactive state used when `isRestricted` is true.
 * - Declares the declarative token that activates dynamic state observation.
 * 
 * @template TState - The type of the state value.
 * @template TToken - A special string token used to trigger observation (e.g. `'auto'`).
 */
export interface ObservableStateDefinition<TState extends {} | null, TToken extends string>
    extends
        // Bases:
        ControllableStateDefinition<TState | TToken>
{
    /**
     * Declares the baseline inactive state (e.g. `false`).
     * - Always applied when `isRestricted` prop is true.
     * - Common values: `false` for `TState = boolean`, or `0` for `TState = number`.
     */
    inactiveState        : TState
    
    /**
     * Declares the token for activating dynamic state observation (e.g. `'auto'`).
     * - If the resolved state equals this token, the hook delegates the state to the `observedState` prop.
     */
    observableStateToken : TToken
}
