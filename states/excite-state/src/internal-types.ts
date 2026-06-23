// Types:
import {
    type ExciteStateProps,
    type ExciteStateOptions,
    type ExciteClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type ActivityStateDefinition,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/** Internal definition for excited state behavior. */
export interface ExciteStateDefinition
    extends
        ActivityStateDefinition<boolean, ExciteClassname,
            ExciteStateProps,
            ExciteStateOptions,
            ExciteStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
