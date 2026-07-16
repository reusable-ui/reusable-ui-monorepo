// Types:
import {
    type CollapseStateProps,
    type CollapseStateOptions,
}                           from './types.js'

// Defaults:
import {
    defaultInitialExpanded,
}                           from './internal-defaults.js'

// Reusable-ui states:
import {
    // Types:
    type ControlledStateDefinition,
    
    
    
    // Hooks:
    useResolvedControlledState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.



/** The controlled state definition for expand/collapse state management. */
const controlledStateDefinition : ControlledStateDefinition<boolean> = {
    defaultState : defaultInitialExpanded,
};

/**
 * Resolves the current expand/collapse state for a fully controlled component.
 * 
 * Useful for derived components that need to determine whether the base component is expanded or collapsed.
 * 
 * The resolved expanded state **must** be forwarded to the base component via the `expanded` prop,
 * thereby the base component becomes **fully controlled** and does not manage its own internal state.
 * 
 * The passed `props` must **not** include `defaultExpanded`, since this hook is designed for fully controlled components.
 * 
 * Unlike `useCollapseState()`, which supports both controlled and uncontrolled modes,
 * `useResolvedExpanded()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Ideal for components that **consume** the resolved `expanded` state.
 * 
 * @param props The component props that may include a controlled `expanded` value, but must exclude `defaultExpanded`.
 * @param options An optional configuration for customizing expand/collapse behavior.
 * @returns The resolved expand/collapse state.
 */
export const useResolvedExpanded = (props: Pick<CollapseStateProps<any>, 'expanded'> & { defaultExpanded?: never }, options?: Pick<CollapseStateOptions, 'defaultExpanded'>) : boolean => {
    // Extract options:
    const {
        defaultExpanded : defaultState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        expanded : state,
    } = props;
    
    
    
    // Resolve effective expand state:
    return useResolvedControlledState<boolean>(
        // Props:
        { state },
        
        // Options:
        { defaultState },
        
        // Definition:
        controlledStateDefinition,
    );
};
