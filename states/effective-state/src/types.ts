// React:
import {
    // Types:
    type Context,
}                           from 'react'



/**
 * Props for resolving an effective state value from controlled props.
 * 
 * @template TState - The type of the resolved state value.
 */
export interface ControlledStateProps<TState extends {} | null> {
    /**
     * Controls the current state.
     * 
     * Defaults to `options.defaultState`.
     */
    state ?: TState
}

/**
 * Component-level options for resolving an effective state value from controlled props.
 * 
 * - Declares an optional default state used when no `state` prop
 *   is provided by the consumer.
 * 
 * @template TState - The type of the resolved state value.
 */
export interface ControlledStateOptions<TState extends {} | null> {
    /**
     * Declares an optional component-level default state.
     * Acts as a fallback when no `state` prop is provided.
     */
    defaultState ?: TState
}

/**
 * Resolver-level definition for resolving an effective state value from controlled props.
 * 
 * - Declares the mandatory default state used when neither `state` prop nor `defaultState` option is provided.
 * 
 * @template TState - The type of the resolved state value.
 */
export interface ControlledStateDefinition<TState extends {} | null> {
    /**
     * Declares the mandatory resolver-level default state.
     * Acts as the final fallback when no other defaults are provided.
     */
    defaultState  : TState
}



/**
 * Props for resolving an effective state value from controlled props while optionally
 * clamping for a valid range when the clamping function is available.
 * 
 * @template TState - The type of the resolved state value (e.g. number for view index).
 */
export interface RangedStateProps<TState extends {} | null>
    extends
        // Bases:
        ControlledStateProps<TState>
{
    /* No additional props yet - reserved for future extensions. */
}

/**
 * Component-level options for resolving an effective state value from controlled props while optionally
 * clamping for a valid range when the clamping function is available.
 * 
 * - Declares an optional default state used when no `state` prop
 *   is provided by the consumer.
 * - Declares an optional clamping function to enforce valid ranges.
 * 
 * @template TState - The type of the resolved state value (e.g. number for view index).
 */
export interface RangedStateOptions<TState extends {} | null>
    extends
        // Bases:
        ControlledStateOptions<TState>
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
 * Resolver-level definition for resolving an effective state value from controlled props while optionally
 * clamping for a valid range when the clamping function is available.
 * 
 * - Declares the mandatory default state used when neither `state` prop nor `defaultState` option is provided.
 * - Declares an optional clamping function to enforce valid ranges.
 * 
 * @template TState - The type of the resolved state value (e.g. number for view index).
 */
export interface RangedStateDefinition<TState extends {} | null>
    extends
        // Bases:
        ControlledStateDefinition<TState>
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
 * Props for resolving an effective state value from controlled props while optionally
 * cascading from context when cascade behavior is enabled.
 * 
 * @template TState - The type of the resolved state value.
 */
export interface CascadeStateProps<TState extends {} | null>
    extends
        // Bases:
        ControlledStateProps<TState>
{
    /**
     * Specifies whether cascading behavior is enabled:
     * - `true`: attempt to inherit state from context if the resolved state equals `definition.inactiveState`.
     * - `false`: do not cascade; return the baseline inactive state instead.
     */
    cascadeEnabled ?: boolean
}

/**
 * Component-level options for resolving an effective state value from controlled props while optionally
 * cascading from context when cascade behavior is enabled.
 * 
 * - Declares an optional default state used when no `state` prop
 *   is provided by the consumer.
 * - Declares an optional default cascading behavior used when no `cascadeEnabled` prop
 *   is provided by the consumer.
 * 
 * @template TState - The type of the resolved state value.
 */
export interface CascadeStateOptions<TState extends {} | null>
    extends
        // Bases:
        ControlledStateOptions<TState>
{
    /**
     * Declares an optional component-level default cascading behavior.
     * Acts as a fallback when no `cascadeEnabled` prop is provided.
     */
    defaultCascadeEnabled ?: boolean
}

/**
 * Resolver-level definition for resolving an effective state value from controlled props while optionally
 * cascading from context when cascade behavior is enabled.
 * 
 * - Declares the mandatory default state used when neither `state` prop nor `defaultState` option is provided.
 * - Declares the mandatory default cascading behavior used when no `cascadeEnabled` prop
 *   is provided by the consumer.
 * - Declares the baseline inactive state used to detect when cascading should apply.
 * - Declares the context from which the cascaded state is applied.
 * 
 * @template TState - The type of the resolved state value.
 */
export interface CascadeStateDefinition<TState extends {} | null>
    extends
        // Bases:
        ControlledStateDefinition<TState>
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
     * Declares the context from which the cascaded state is applied.
     * 
     * Resolution behavior:
     * - If the resolved state equals `inactiveState` and `cascadeEnabled` is true,
     *   the hook will attempt to use this context value.
     * - If no `Provider` is found, `use(stateContext)` returns `undefined`,
     *   and the hook falls back to `inactiveState`.
     * 
     * Note: contexts are expected to be created with `undefined` as their default value,
     * so that `use(stateContext)` returns `undefined` when no `Provider` is present.
     */
    stateContext           : Context<TState | undefined>
}



/**
 * Props for resolving an effective state value from controlled props while optionally
 * delegating to an external observer when the resolved value equals the explicit
 * observable token.
 * 
 * @template TState - The type of the resolved state value.
 * @template TObservableToken - A special string token used to trigger observation (e.g. `'auto'`).
 */
export interface ObservableStateProps<TState extends {} | null, TObservableToken extends string>
    extends
        // Bases:
        ControlledStateProps<TState | TObservableToken>
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
 * Component-level options for resolving an effective state value from controlled props while optionally
 * delegating to an external observer when the resolved value equals the explicit
 * observable token.
 * 
 * - Declares an optional default state used when no `state` prop
 *   is provided by the consumer.
 * 
 * @template TState - The type of the resolved state value.
 * @template TObservableToken - A special string token used to trigger observation (e.g. `'auto'`).
 */
export interface ObservableStateOptions<TState extends {} | null, TObservableToken extends string>
    extends
        // Bases:
        ControlledStateOptions<TState | TObservableToken>
{
    /* No additional options yet - reserved for future extensions. */
}

/**
 * Resolver-level definition for resolving an effective state value from controlled props while optionally
 * delegating to an external observer when the resolved value equals the explicit
 * observable token.
 * 
 * - Declares the mandatory default state used when neither `state` prop nor `defaultState` option is provided.
 * - Declares the baseline inactive state used when `isRestricted` is true.
 * - Declares the declarative token that activates dynamic state observation.
 * 
 * @template TState - The type of the resolved state value.
 * @template TObservableToken - A special string token used to trigger observation (e.g. `'auto'`).
 */
export interface ObservableStateDefinition<TState extends {} | null, TObservableToken extends string>
    extends
        // Bases:
        ControlledStateDefinition<TState | TObservableToken>
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
    observableStateToken : TObservableToken
}
