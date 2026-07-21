// Types:
import {
    type SortStateProps,
    type SortStateOptions,
    type SortActivity,
    type SortClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type EphemeralStateDefinition,
}                           from '@reusable-ui/ephemeral-state'     // Animates short-lived UI feedback whenever an activity or status change occurs, making activity-driven state changes feel visible and intuitive.



/** Internal definition for sorting activity status behavior. */
export interface SortStateDefinition
    extends
        EphemeralStateDefinition<SortActivity, SortClassname,
            SortStateProps<Element, unknown>,
            SortStateOptions,
            SortStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
