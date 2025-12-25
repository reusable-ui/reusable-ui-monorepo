// Types:
import {
    type FocusStateProps,
    type FocusStateOptions,
    type FocusPhase,
    type FocusClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for focused/blurred state behavior. */
export interface FocusBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, FocusPhase, FocusClassname,
            FocusStateProps,
            FocusStateOptions,
            FocusBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
