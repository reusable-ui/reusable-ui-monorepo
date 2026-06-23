// Types:
import {
    type ViewStateProps,
    type ViewStateOptions,
    type ViewPhase,
    type ViewClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type InteractionStateDefinition,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Internal definition for view-switching behavior. */
export interface ViewStateDefinition
    extends
        InteractionStateDefinition<number, number, ViewPhase, ViewClassname,
            ViewStateProps<any>,
            ViewStateOptions,
            ViewStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
