// Types:
import {
    type ValidityStateProps,
    type ValidityStateOptions,
    type ValidityPhase,
    type ValidityClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Internal definition for validity state behavior. */
export interface ValidityBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<boolean | null, ValidityPhase, ValidityClassname,
            ValidityStateProps,
            ValidityStateOptions,
            ValidityBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
