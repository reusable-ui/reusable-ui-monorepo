// React:
import {
    // Types:
    type Key,
}                           from 'react'

// Types:
import {
    type SortStateProps,
    type SortStateOptions,
    type SortClassname,
    type SortOffset,
}                           from './types.js'
import {
    type SortPhase,
    type SortBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for sorting state behavior. */
export const resolveSortTransitionPhase = ({ isTransitioning }: ResolveTransitionPhaseArgs<symbol, SortStateProps<Element, unknown>, SortStateOptions, SortBehaviorStateDefinition>): SortPhase => {
    return isTransitioning ? 'sorting' : 'sorted';
};

/** Resolves the semantic activity classname for sorting state behavior. */
export const resolveSortActivityClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<symbol, SortPhase, SortStateProps<Element, unknown>, SortStateOptions, SortBehaviorStateDefinition>): SortClassname => {
    return (transitionPhase === 'sorting') ? 'is-sorting' : 'not-sorting';
};



/**
 * Snapshots element positions into a keyed Map.
 * 
 * @template TItemElement - The type of the sortable DOM element.
 * 
 * @param itemElements - Map of stable React `key` → DOM element.
 * @returns Map of key → {x, y} positions.
 */
export const snapshotElementPositions = <TItemElement extends Element = HTMLElement>(itemElements: Map<Key, TItemElement>): Map<Key, SortOffset> => new Map<Key, SortOffset>(
    Array.from(itemElements.entries()).map(([itemKey, itemElement]) => {
        const { x, y, width, height } = itemElement.getBoundingClientRect();
        return [
            itemKey,
            {
                // Use the element's center point for consistency:
                x : x + (width  / 2),
                y : y + (height / 2),
            } satisfies SortOffset
        ];
    })
);
