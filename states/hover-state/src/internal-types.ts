// Types:
import {
    type HoverStateProps,
    type HoverStateOptions,
    type HoverPhase,
    type HoverClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for hovered/unhovered state behavior. */
export interface HoverStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean, HoverPhase, HoverClassname,
            HoverStateProps,
            HoverStateOptions,
            HoverStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
