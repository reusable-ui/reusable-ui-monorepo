// Types:
import {
    type ExcitedStateProps,
    type ExcitedStateOptions,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeExcited,
}                           from './internal-defaults.js'

// Reusable-ui states:
import {
    // Types:
    type ControlledStateDefinition,
    
    
    
    // Hooks:
    useResolvedControlledState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.



/** The controlled state definition for excited state management. */
const controlledStateDefinition : ControlledStateDefinition<boolean> = {
    defaultState : defaultDeclarativeExcited,
};

/**
 * Resolves the current excited state.
 * 
 * Useful for derived components that need to determine whether the base component is excited or not.
 * 
 * - Does not contain internal state.
 * - Ideal for components that **consume** the resolved `excited` state.
 * 
 * @param props - The component props that may include a controlled `excited` value.
 * @param options - An optional configuration for customizing excitement behavior.
 * @returns The resolved excited state.
 */
export const useResolvedExcited = (props: Pick<ExcitedStateProps, 'excited'>, options?: Pick<ExcitedStateOptions, 'defaultExcited'>): boolean => {
    // Extract options:
    const {
        defaultExcited : defaultState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        excited : state,
    } = props;
    
    
    
    // Resolve effective excited state:
    return useResolvedControlledState<boolean>(
        // Props:
        { state },
        
        // Options:
        { defaultState },
        
        // Definition:
        controlledStateDefinition,
    );
};
