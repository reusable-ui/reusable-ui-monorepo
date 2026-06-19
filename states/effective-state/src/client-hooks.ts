'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type CascadeStateProps,
    type CascadeStateOptions,
    type CascadeStateDefinition,
}                           from './types.js'

// Hooks:
import {
    useResolvedControlledState,
}                           from './general-hooks.js'



/**
 * Resolves an effective state value from controlled props,
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
 * const disabled = useResolvedCascadeState(
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
 * const disabled = useResolvedCascadeState(
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
export const useResolvedCascadeState = <TState extends {} | null>(props: CascadeStateProps<TState>, options: CascadeStateOptions<TState>, definition: CascadeStateDefinition<TState>): TState => {
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
    const resolvedState = useResolvedControlledState(props, options, definition);
    
    
    
    // Cascading state resolution:
    
    // If resolved state is not equal to inactive baseline, return immediately:
    if (!Object.is(resolvedState, inactiveState)) return resolvedState;
    
    // If cascading behavior is disabled, return inactive baseline:
    if (!cascadeEnabled) return inactiveState;
    
    // Attempt to inherit from context:
    const inheritedState = use(stateContext);
    if (inheritedState !== undefined) return inheritedState;
    
    // Fallback: return inactive baseline:
    return inactiveState;
};
