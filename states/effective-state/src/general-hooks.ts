// Types:
import {
    type ControlledStateProps,
    type ControlledStateOptions,
    type ControlledStateDefinition,
    type RangedStateProps,
    type RangedStateOptions,
    type RangedStateDefinition,
    type ObservableStateProps,
    type ObservableStateOptions,
    type ObservableStateDefinition,
}                           from './types.js'



/**
 * Resolves an effective state value from controlled props.
 * 
 * **Resolution order:**
 *   1. `state` prop (controlled mode)  
 *   2. `defaultState` prop (uncontrolled mode)  
 *   3. `defaultState` option (uncontrolled mode)  
 *   4. `defaultState` definition (uncontrolled mode)  
 * 
 * @template TState - The type of the state value.
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults.
 * @param definition - The resolver-level definition containing the mandatory defaults.
 * @returns The resolved state value.
 * 
 * @example
 * Controlled mode, by supplying `state` prop:
 * ```ts
 * const expanded = useResolvedControlledState(
 *     // Props:
 *     { state: true },
 *     
 *     // Options:
 *     { defaultState: false },
 *     
 *     // Definition:
 *     { defaultState: false }
 * ); // → true
 * ```
 * 
 * Uncontrolled mode, by specifying `defaultState` prop:
 * ```ts
 * const expanded = useResolvedControlledState(
 *     // Props:
 *     { defaultState: true },
 *     
 *     // Options:
 *     { defaultState: false },
 *     
 *     // Definition:
 *     { defaultState: false }
 * ); // → true
 * ```
 * 
 * Uncontrolled mode, by falling back to `defaultState` option:
 * ```ts
 * const expanded = useResolvedControlledState(
 *     // Props:
 *     {},
 *     
 *     // Options:
 *     { defaultState: false },
 *     
 *     // Definition:
 *     { defaultState: false }
 * ); // → false
 * ```
 */
export const useResolvedControlledState = <TState extends {} | null>(props: ControlledStateProps<TState>, options: ControlledStateOptions<TState>, definition: ControlledStateDefinition<TState>): TState => {
    // Extract resolver-level definition (mandatory contracts):
    const {
        defaultState : definitionDefaultState,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        defaultState : componentDefaultState = definitionDefaultState,
    } = options;
    
    
    
    // Extract props, falling back to component-level default:
    const {
        /**
         * Uncontrolled initializer:
         * - Uses `props.defaultState` if provided.
         * - Otherwise falls back to `componentDefaultState`.
         */
        defaultState : propDefaultState = componentDefaultState,
        
        /**
         * Resolved state (effective intent):
         * - Controlled via `props.state` if provided.
         * - Otherwise falls back to `propDefaultState`.
         */
        state        : resolvedState    = propDefaultState,
    } = props;
    
    
    
    // Return the final resolved state (intent):
    return resolvedState;
};



/**
 * Resolves an effective state value from controlled props,
 * with optional clamping to a valid range.
 * 
 * If a `clampState` function is declared in options or definition, the resolved value is normalized into a valid range.
 * 
 * **Resolution order:**
 *   1. `state` prop (controlled mode)  
 *   2. `defaultState` prop (uncontrolled mode)  
 *   3. `defaultState` option (uncontrolled mode)  
 *   4. `defaultState` definition (uncontrolled mode)  
 *   5. `clampState` function (normalization)  
 * 
 * @template TState - The type of the state value (e.g. number for view index).
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults and clamping.
 * @param definition - The resolver-level definition containing the mandatory defaults and optional clamping.
 * @returns The resolved (and possibly clamped) state value.
 * 
 * @example
 * Controlled mode with clamping, by supplying `state` prop and declaring `clampState` function:
 * ```ts
 * const viewIndex = useResolvedRangedState(
 *     // Props:
 *     { state: 5 },
 *     
 *     // Options:
 *     {
 *         defaultState: 0,
 *         clampState: (rawIndex) => Math.max(0, Math.min(rawIndex, 10)), // clamp between 0–10
 *     },
 *     
 *     // Definition:
 *     { defaultState: 0 }
 * ); // → 5
 * ```
 * 
 * Uncontrolled mode with clamping, by falling back to `defaultState` option and declaring `clampState` function:
 * ```ts
 * const viewIndex = useResolvedRangedState(
 *     // Props:
 *     {},
 *     
 *     // Options:
 *     {
 *         defaultState: 0,
 *         clampState: (rawIndex) => Math.max(0, Math.min(rawIndex, 10)), // clamp between 0–10
 *     },
 *     
 *     // Definition:
 *     { defaultState: 0 }
 * ); // → 0 (component-level default, clamped)
 * ```
 */
export const useResolvedRangedState = <TState extends {} | null>(props: RangedStateProps<TState>, options: RangedStateOptions<TState>, definition: RangedStateDefinition<TState>): TState => {
    // Extract resolver-level definition:
    const {
        clampState : definitionClampState,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        clampState = definitionClampState,
    } = options;
    
    
    
    // Resolve the controlled/uncontrolled state:
    const resolvedState = useResolvedControlledState(props, options, definition);
    
    
    
    // Apply clamping if available:
    if (!clampState) return resolvedState;
    return clampState(resolvedState);
};



/**
 * Resolves an effective state value from controlled props,
 * with optional delegation to an external observer when a declarative token is encountered.
 * 
 * If `isRestricted` is true, the state is forced to `inactiveState`.  
 * If the resolved state equals `observableStateToken`, the hook delegates to `observedState`.
 * 
 * **Resolution order:**
 *   1. Use `inactiveState` (if `isRestricted` is true)
 *   2. `state` prop (controlled mode)  
 *   3. `defaultState` prop (uncontrolled mode)  
 *   4. `defaultState` option (uncontrolled mode)  
 *   5. `defaultState` definition (uncontrolled mode)  
 *   6. Delegate to `observedState` (if resolved state equals `observableStateToken`)
 * 
 * @template TState - The type of the state value.
 * @template TToken - A special string token used to trigger observation (e.g. `'auto'`).
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults.
 * @param definition - The resolver-level definition containing the mandatory defaults and observation contracts.
 * @returns The resolved state value, possibly delegated to an observer if the declarative token is used.
 * 
 * @example
 * Controlled mode with observation, by supplying `state` prop:
 * 
 * ```ts
 * const { focused } = useResolvedObservableState(
 *     // Props:
 *     { state: 'auto', isRestricted: false, observedState: true },
 *     
 *     // Options:
 *     { defaultState: 'auto' },
 *     
 *     // Definition:
 *     {
 *         defaultState: 'auto',
 *         inactiveState: false,
 *         observableStateToken: 'auto',
 *     }
 * );
 * // → true (delegated to observedState)
 * ```
 * 
 * Uncontrolled mode with observation, by falling back to `defaultState` option:
 * 
 * ```ts
 * const { focused } = useResolvedObservableState(
 *     // Props:
 *     { isRestricted: true, observedState: true },
 *     
 *     // Options:
 *     { defaultState: 'auto' },
 *     
 *     // Definition:
 *     {
 *         defaultState: 'auto',
 *         inactiveState: false,
 *         observableStateToken: 'auto',
 *     }
 * );
 * // → false (restricted forces inactive baseline)
 * ```
 */
export const useResolvedObservableState = <TState extends {} | null, TToken extends string>(props: ObservableStateProps<TState, TToken>, options: ObservableStateOptions<TState, TToken>, definition: ObservableStateDefinition<TState, TToken>): TState => {
    // Extract resolver-level definition (mandatory contracts):
    const {
        inactiveState,
        observableStateToken,
    } = definition;
    
    
    
    // Extract props (mandatory supplies):
    const {
        isRestricted,
        observedState,
    } = props;
    
    
    
    // Resolve the controlled/uncontrolled state:
    const resolvedState = useResolvedControlledState(props, options, definition);
    
    
    
    // Observable state resolution:
    
    // If restricted, return inactive baseline:
    if (isRestricted) return inactiveState;
    
    // If resolved state does not equal the observation token, return directly:
    if (!Object.is(resolvedState, observableStateToken)) return resolvedState as TState; // At this point, `resolvedState` cannot be `TToken`, so it's safe to cast.
    
    // Otherwise, delegate to the observed state:
    return observedState;
};
