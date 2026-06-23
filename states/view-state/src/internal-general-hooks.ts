// Types:
import {
    type ViewStateProps,
    type ViewStateOptions,
}                           from './types.js'
import {
    type ViewStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveEffectiveStateArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.

// Hooks:
import {
    useResolvedViewState,
}                           from './general-hooks.js'



/** Resolves the effective view index, normalizing declarative keywords into concrete values. */
export const useResolvedEffectiveViewState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<number, ViewStateProps<unknown>, ViewStateOptions, ViewStateDefinition>): number => {
    const effectiveViewIndex = useResolvedViewState({
        ...props,
        defaultViewIndex  : undefined,        // Prevents uncontrolled value.
        viewIndex         : declarativeState, // Pass the declarative state as controlled value.
    }, options);
    
    // Return the resolved effective view index:
    return effectiveViewIndex;
};
