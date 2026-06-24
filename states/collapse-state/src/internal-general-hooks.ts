// Types:
import {
    type CollapseStateProps,
    type CollapseStateOptions,
}                           from './types.js'
import {
    type CollapseStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveEffectiveStateArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.

// Hooks:
import {
    useResolvedExpanded,
}                           from './general-hooks.js'



/** Resolves the effective expansion state, normalizing declarative keywords into concrete values. */
export const useResolvedEffectiveCollapseState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<boolean, CollapseStateProps<unknown>, CollapseStateOptions, CollapseStateDefinition>): boolean => {
    const effectiveExpanded = useResolvedExpanded({
        ...props,
        defaultExpanded : undefined,        // Prevents uncontrolled value.
        expanded        : declarativeState, // Pass the declarative state as controlled value.
    }, options);
    
    // Return the resolved effective expansion state:
    return effectiveExpanded;
};
