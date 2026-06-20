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
 * Resolves the current expanded/collapsed state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `expanded` state and **forward** it to a base component.
 * 
 * Unlike `useCollapseBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useCollapseState()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Ideal for components that **consume** the resolved `expanded` state.
 * 
 * @param props - The component props that may include a controlled `expanded` value but must exclude `defaultExpanded`.
 * @param options - An optional configuration for customizing expand/collapse behavior.
 * @returns The resolved expanded/collapsed state.
 */
export const useCollapseState = (props: CollapseStateProps<any> & { defaultExpanded?: never }, options?: Pick<CollapseStateOptions, 'defaultExpanded'>) : boolean => {
    // Extract options:
    const {
        defaultExpanded : defaultState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        expanded : state,
    } = props;
    
    
    
    // Resolve effective expanded state:
    const expanded = useResolvedControlledState<boolean>(
        // Props:
        { state },
        
        // Options:
        { defaultState },
        
        // Definition:
        controlledStateDefinition,
    );
    
    
    
    // Return the resolved expanded state:
    return expanded;
};
