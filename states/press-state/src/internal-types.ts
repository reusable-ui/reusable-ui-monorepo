// Types:
import {
    type PressStateProps,
    type PressStateOptions,
    type PressPhase,
    type PressClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for pressed/released state behavior. */
export interface PressBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, PressPhase, PressClassname,
            PressStateProps,
            PressStateOptions,
            PressBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
