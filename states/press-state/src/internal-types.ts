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
    type FeedbackStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for press/release state behavior. */
export interface PressStateDefinition
    extends
        FeedbackStateDefinition<boolean, PressPhase, PressClassname,
            PressStateProps,
            PressStateOptions,
            PressStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
