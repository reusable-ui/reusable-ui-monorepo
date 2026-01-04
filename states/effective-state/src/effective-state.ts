'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type ControllableStateProps,
    type ControllableStateOptions,
    type ControllableStateDefinition,
    type RangedStateProps,
    type RangedStateOptions,
    type RangedStateDefinition,
    type CascadeStateProps,
    type CascadeStateOptions,
    type CascadeStateDefinition,
    type ObservableStateProps,
    type ObservableStateOptions,
    type ObservableStateDefinition,
}                           from './types.js'



/**
 * Resolves an effective state value from controlled or uncontrolled props.
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
 * const expanded = useControllableState(
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
 * const expanded = useControllableState(
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
 * const expanded = useControllableState(
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
export const useControllableState = <TState extends {} | null>(props: ControllableStateProps<TState>, options: ControllableStateOptions<TState>, definition: ControllableStateDefinition<TState>): TState => {
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
 * Resolves an effective state value from controlled or uncontrolled props,
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
 * const viewIndex = useRangedState(
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
 * const viewIndex = useRangedState(
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
export const useRangedState = <TState extends {} | null>(props: RangedStateProps<TState>, options: RangedStateOptions<TState>, definition: RangedStateDefinition<TState>): TState => {
    // Extract resolver-level definition:
    const {
        clampState : definitionClampState,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        clampState = definitionClampState,
    } = options;
    
    
    
    // Resolve the controlled/uncontrolled state:
    const resolvedState = useControllableState(props, options, definition);
    
    
    
    // Apply clamping if available:
    if (!clampState) return resolvedState;
    return clampState(resolvedState);
};



/**
 * Resolves an effective state value from controlled or uncontrolled props,
 * with optional cascading from context when cascade behavior is enabled.
 * 
 * If cascading is enabled and the resolved state equals `inactiveState`, the hook attempts to inherit from `stateContext`.
 * 
 * **Resolution order:**
 *   1. `state` prop (controlled mode)  
 *   2. `defaultState` prop (uncontrolled mode)  
 *   3. `defaultState` option (uncontrolled mode)  
 *   4. `defaultState` definition (uncontrolled mode)  
 *   5. Inherit from `stateContext` (if cascading enabled and resolved state equals `inactiveState`)  
 *   6. Use `inactiveState` (fallback)  
 * 
 * @template TState - The type of the state value.
 * 
 * @param props - The volatile props provided by the component consumer.
 * @param options - The per-component options containing optional defaults and cascading behavior.
 * @param definition - The resolver-level definition containing the mandatory defaults and cascading contracts.
 * @returns The resolved (and possibly cascaded) state value.
 * 
 * @example
 * Controlled mode with cascading, by supplying `state` prop and inheriting from context:
 * ```ts
 * const disabled = useCascadeState(
 *     // Props:
 *     { state: false, cascadeEnabled: true },
 *     
 *     // Options:
 *     {
 *         defaultState: false,
 *         defaultCascadeEnabled: true,
 *     },
 *     
 *     // Definition:
 *     {
 *         defaultState: false,
 *         defaultCascadeEnabled: true,
 *         inactiveState: false,
 *         stateContext: DisabledStateContext,
 *     }
 * ); // → true (assuming context provides `true`)
 * ```
 * 
 * Uncontrolled mode with cascading, by falling back to `defaultState` option and inheriting from context:
 * ```ts
 * const disabled = useCascadeState(
 *     // Props:
 *     { cascadeEnabled: true },
 *     
 *     // Options:
 *     {
 *         defaultState: false,
 *         defaultCascadeEnabled: true,
 *     },
 *     
 *     // Definition:
 *     {
 *         defaultState: false,
 *         defaultCascadeEnabled: true,
 *         inactiveState: false,
 *         stateContext: DisabledStateContext,
 *     }
 * ); // → true (assuming context provides `true`)
 * ```
 */
export const useCascadeState = <TState extends {} | null>(props: CascadeStateProps<TState>, options: CascadeStateOptions<TState>, definition: CascadeStateDefinition<TState>): TState => {
    // Extract resolver-level definition (mandatory contracts):
    const {
        defaultCascadeEnabled : definitionDefaultCascadeEnabled,
        inactiveState,
        stateContext,
    } = definition;
    
    
    
    // Extract component-level options, falling back to definition default:
    const {
        defaultCascadeEnabled : componentDefaultCascadeEnabled = definitionDefaultCascadeEnabled,
    } = options;
    
    
    
    // Extract props, falling back to component-level default:
    const {
        /**
         * Cascading behavior:
         * - Controlled via `props.cascadeEnabled` if provided.
         * - Otherwise falls back to `componentDefaultCascadeEnabled`.
         */
        cascadeEnabled = componentDefaultCascadeEnabled,
    } = props;
    
    
    
    // Resolve the controlled/uncontrolled state:
    const resolvedState = useControllableState(props, options, definition);
    
    
    
    // Cascading state resolution:
    
    // If cascading behavior is disabled, return inactive baseline:
    if (!cascadeEnabled) return inactiveState;
    
    // If resolved state is not equal to inactive baseline, return immediately:
    if (!Object.is(resolvedState, inactiveState)) return resolvedState;
    
    // Attempt to inherit from context:
    const inheritedState = use(stateContext);
    if (inheritedState !== undefined) return inheritedState;
    
    // Fallback: return inactive baseline:
    return inactiveState;
};



/**
 * Resolves an effective state value from controlled or uncontrolled props,
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
 * const { focused } = useObservableState(
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
 * const { focused } = useObservableState(
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
export const useObservableState = <TState extends {} | null>(props: ObservableStateProps<TState>, options: ObservableStateOptions<TState>, definition: ObservableStateDefinition<TState>): TState => {
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
    const resolvedState = useControllableState(props, options, definition);
    
    
    
    // Observable state resolution:
    
    // If restricted, return inactive baseline:
    if (isRestricted) return inactiveState;
    
    // If resolved state does not equal the observation token, return directly:
    if (!Object.is(resolvedState, observableStateToken)) return resolvedState;
    
    // Otherwise, delegate to the observed state:
    return observedState;
};
