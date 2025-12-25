// Types:
import {
    type DisabledStateProps,
    type DisabledStateOptions,
    type DisabledPhase,
    type DisabledClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for enabled/disabled state behavior. */
export interface DisabledBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, DisabledPhase, DisabledClassname,
            DisabledStateProps,
            DisabledStateOptions,
            DisabledBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
