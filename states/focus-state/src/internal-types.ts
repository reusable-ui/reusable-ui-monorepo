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
    type FeedbackStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for focused/blurred state behavior. */
export interface FocusStateDefinition
    extends
        FeedbackStateDefinition<boolean, FocusPhase, FocusClassname,
            FocusStateProps,
            FocusStateOptions,
            FocusStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
