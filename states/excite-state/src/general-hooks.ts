// Types:
import {
    type ExciteStateProps,
    type ExciteStateOptions,
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



/** The controlled state definition for excite state management. */
const controlledStateDefinition : ControlledStateDefinition<boolean> = {
    defaultState : defaultDeclarativeExcited,
};

/**
 * Resolves the current excited state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `excited` state and **forward** it to a base component.
 * 
 * - Does not contain internal state.
 * - Ideal for components that **consume** the resolved `excited` state.
 * 
 * @param props - The component props that may include a controlled `excited` value.
 * @param options - An optional configuration for customizing excitement behavior.
 * @returns The resolved excited state.
 */
export const useResolvedExciteState = (props: ExciteStateProps, options?: Pick<ExciteStateOptions, 'defaultExcited'>): boolean => {
    // Extract options:
    const {
        defaultExcited : defaultState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        excited : state,
    } = props;
    
    
    
    // Resolve effective excited state:
    const excited = useResolvedControlledState<boolean>(
        // Props:
        { state },
        
        // Options:
        { defaultState },
        
        // Definition:
        controlledStateDefinition,
    );
    
    
    
    // Return the resolved excited state:
    return excited;
};
