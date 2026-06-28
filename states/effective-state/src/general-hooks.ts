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
 *   1. `props.state`  
 *   2. `options.defaultState`  
 *   3. `definition.defaultState`  
 * 
 * @template TState - The type of the resolved state value.
 * 
 * @param props - The props supplied by the component consumer.
 * @param options - The component-level defaults.
 * @param definition - The resolver-level defaults.
 * @returns The resolved state value.
 * 
 * @example
 * Controlled mode, by supplying a `state` prop:
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
 * Default mode, by falling back to the component-level default:
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
         * The resolved state value (effective intent):
         * - Controlled via `props.state` if provided.
         * - Otherwise falls back to `componentDefaultState`.
         */
        state : resolvedState = componentDefaultState,
    } = props;
    
    
    
    // Return the final resolved state value (the intent):
    return resolvedState;
};



/**
 * Resolves an effective state value from controlled props while optionally
 * clamping for a valid range when the clamping function is available.
 * 
 * **Resolution order:**
 *   1. `props.state`  
 *   2. `options.defaultState`  
 *   3. `definition.defaultState`  
 *   4. `clampState` function (normalization)  
 * 
 * @template TState - The type of the resolved state value (e.g. number for view index).
 * 
 * @param props - The props supplied by the component consumer.
 * @param options - The component-level defaults and optional clamping.
 * @param definition - The resolver-level defaults and optional clamping.
 * @returns The resolved state value, possibly clamped to a valid range.
 * 
 * @example
 * Controlled mode with clamping, by supplying a `state` prop and declaring `clampState` function:
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
 * Default mode with clamping, by falling back to the component-level default and declaring `clampState` function:
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
    
    
    
    // Resolve the controlled state from props:
    const resolvedState = useResolvedControlledState(props, options, definition);
    
    
    
    // Apply clamping if available:
    if (!clampState) return resolvedState;
    return clampState(resolvedState);
};



/**
 * Resolves an effective state value from controlled props while optionally
 * delegating to an external observer when the resolved value equals the explicit
 * observable token.
 * 
 * When `isRestricted` is true, the state is forced to `inactiveState`.  
 * 
 * **Resolution order:**
 *   1. `inactiveState` (when `isRestricted` is true)  
 *   2. `props.state`  
 *   3. `options.defaultState`  
 *   4. `definition.defaultState`  
 *   5. `observedState` (when the resolved value equals `observableStateToken`)  
 * 
 * @template TState - The type of the resolved state value.
 * @template TObservableToken - A special string token used to trigger observation (e.g. `'auto'`).
 * 
 * @param props - The props supplied by the component consumer.
 * @param options - The component-level defaults.
 * @param definition - The resolver-level defaults and observation contracts.
 * @returns The resolved state value, possibly delegated to the observer.
 * 
 * @example
 * Controlled mode with observation, by supplying a `state` prop:
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
 * Default mode with observation, by falling back to the component-level default:
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
export const useResolvedObservableState = <TState extends {} | null, TObservableToken extends string>(props: ObservableStateProps<TState, TObservableToken>, options: ObservableStateOptions<TState, TObservableToken>, definition: ObservableStateDefinition<TState, TObservableToken>): TState => {
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
    
    
    
    // Resolve the controlled state from props:
    const resolvedState = useResolvedControlledState(props, options, definition);
    
    
    
    // Observable state resolution:
    
    // If restricted, return inactive baseline:
    if (isRestricted) return inactiveState;
    
    // If the resolved value does not equal the observation token, return directly:
    if (!Object.is(resolvedState, observableStateToken)) return resolvedState as TState; // At this point, `resolvedState` cannot be `TObservableToken`, so it's safe to cast.
    
    // Otherwise, delegate to the observed state:
    return observedState;
};
