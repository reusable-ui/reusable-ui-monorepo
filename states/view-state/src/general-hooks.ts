// Types:
import {
    type ViewStateProps,
    type ViewStateOptions,
}                           from './types.js'

// Defaults:
import {
    defaultInitialViewIndex,
}                           from './internal-defaults.js'

// Utilities:
import {
    clampViewIndex,
}                           from './internal-utilities.js'

// Reusable-ui states:
import {
    // Types:
    type RangedStateDefinition,
    
    
    
    // Hooks:
    useResolvedRangedState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.



/** The controllable state definition for view-switching state management. */
const rangedStateDefinition : RangedStateDefinition<number> = {
    defaultState : defaultInitialViewIndex,
};

/**
 * Resolves the current view index for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `viewIndex` value and **forward** it to a base component.
 * 
 * Unlike `useViewState()`, which supports both controlled and uncontrolled modes,
 * `useResolvedViewIndex()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Ideal for components that **consume** the resolved `viewIndex` value.
 * 
 * @param props - The component props that may include a controlled `viewIndex` value but must exclude `defaultViewIndex`.
 * @param options - An optional configuration for customizing view-switching behavior.
 * @returns The resolved view index.
 */
export const useResolvedViewIndex = (props: ViewStateProps<any> & { defaultViewIndex?: never }, options?: Pick<ViewStateOptions, 'defaultViewIndex' | 'minViewIndex' | 'maxViewIndex' | 'viewIndexStep'>) : number => {
    // Extract options:
    const {
        defaultViewIndex : defaultState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        viewIndex : state,
    } = props;
    
    
    
    // Resolve effective view index:
    return useResolvedRangedState<number>(
        // Props:
        { state },
        
        // Options:
        { defaultState, clampState : (rawViewIndex) => clampViewIndex(rawViewIndex, options) },
        
        // Definition:
        rangedStateDefinition,
    );
};
