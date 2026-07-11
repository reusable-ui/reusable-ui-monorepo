// Types:
import {
    type ExcitedStateProps,
    type ExcitedStateOptions,
    type ExcitedClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type ActivityStateDefinition,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/** Internal definition for excited state behavior. */
export interface ExcitedStateDefinition
    extends
        ActivityStateDefinition<boolean, ExcitedClassname,
            ExcitedStateProps,
            ExcitedStateOptions,
            ExcitedStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
