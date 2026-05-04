// Types:
import {
    type SortStateProps,
    type SortStateOptions,
    type SortClassname,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type FeedbackBehaviorStateDefinition,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Represents the resolved (settled) phase of the sorting transition lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'sorted'   🎯 fully sorted
 */
export type ResolvedSortPhase =
    | 'sorted'

/**
 * Represents the transitional phase of the sorting transition lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'sorting'  🔄 transitioning toward sorted
 */
export type TransitioningSortPhase =
    | 'sorting'

/**
 * Represents the current transition phase of the sorting transition lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'sorted'
 * - Transitional: 'sorting'
 */
export type SortPhase =
    | ResolvedSortPhase
    | TransitioningSortPhase



/** Internal definition for sorting state behavior. */
export interface SortBehaviorStateDefinition
    extends
        FeedbackBehaviorStateDefinition<symbol, SortPhase, SortClassname,
            SortStateProps<Element, unknown>,
            SortStateOptions,
            SortBehaviorStateDefinition
        >
{
    /* no additional definition yet - reserved for future extensions */
}
