// Types:
import {
    type ActiveStateProps,
    type ActiveStateOptions,
    type ActivePhase,
    type ActiveClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type InteractionStateDefinition,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Internal definition for active/inactive state behavior. */
export interface ActiveBehaviorStateDefinition
    extends
        InteractionStateDefinition<boolean, boolean, ActivePhase, ActiveClassname,
            ActiveStateProps<any>,
            ActiveStateOptions,
            ActiveBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
