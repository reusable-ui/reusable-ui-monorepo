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
    type InteractionBehaviorStateDefinition,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Internal definition for view-switching behavior. */
export interface ViewBehaviorStateDefinition
    extends
        InteractionBehaviorStateDefinition<number, number, ViewPhase, ViewClassname,
            ViewStateProps,
            ViewStateOptions,
            ViewBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
