// Types:
import {
    type CollapseStateProps,
    type CollapseStateOptions,
    type ExpandPhase,
    type ExpandClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type InteractionStateDefinition,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Internal definition for expanded/collapsed state behavior. */
export interface CollapseStateDefinition
    extends
        InteractionStateDefinition<boolean, boolean, ExpandPhase, ExpandClassname,
            CollapseStateProps<any>,
            CollapseStateOptions,
            CollapseStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
