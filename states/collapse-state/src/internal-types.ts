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
    type InteractionBehaviorStateDefinition,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Internal definition for expanded/collapsed state behavior. */
export interface CollapseBehaviorStateDefinition
    extends
        InteractionBehaviorStateDefinition<boolean, boolean, ExpandPhase, ExpandClassname,
            CollapseStateProps,
            CollapseStateOptions,
            CollapseBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
