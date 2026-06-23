// Types:
import {
    type DragStateProps,
    type DragStateOptions,
    type DragPhase,
    type DragClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.



/** Internal definition for dragged/dropped state behavior. */
export interface DragStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, DragPhase, DragClassname,
            DragStateProps,
            DragStateOptions,
            DragStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
