// Types:
import {
    type ReadOnlyStateProps,
    type ReadOnlyStateOptions,
    type ReadOnlyPhase,
    type ReadOnlyClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for editable/read-only state behavior. */
export interface ReadOnlyStateDefinition
    extends
        FeedbackStateDefinition<boolean, ReadOnlyPhase, ReadOnlyClassname,
            ReadOnlyStateProps,
            ReadOnlyStateOptions,
            ReadOnlyStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
