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
 * Resolves an effective state value from controlled props while optionally
 * cascading from context when cascade behavior is enabled.
 * 
 * **Resolution order:**
 *   1. `props.state`  
 *   2. `options.defaultState`  
 *   3. `definition.defaultState`  
 *   4. `stateContext` (when the cascading is enabled)  
 *   5. `inactiveState` (fallback)  
 * 
 * @template TState The type of the resolved state value.
 * 
 * @param props The props supplied by the component consumer.
 * @param options The component-level defaults and cascading behavior.
 * @param definition The resolver-level defaults and cascading contracts.
 * @returns The resolved state value, possibly cascaded from context.
 * 
 * @example
 * Controlled mode with cascading, by supplying a `state` prop and cascading from context:
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
 * Default mode with cascading, by falling back to the component-level default and cascading from context:
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
    
    
    
    // Resolve the controlled state from props:
    const resolvedState = useResolvedControlledState<TState>(props, options, definition);
    
    
    
    // Cascading state resolution:
    
    // If the resolved value is active, return immediately:
    if (!Object.is(resolvedState, inactiveState)) return resolvedState;
    
    // If cascading behavior is disabled, return inactive baseline:
    if (!cascadeEnabled) return inactiveState;
    
    // Attempt to inherit from context:
    const contextState = use(stateContext);
    if (contextState !== undefined) return contextState;
    
    // Fallback: return inactive baseline:
    return inactiveState;
};
