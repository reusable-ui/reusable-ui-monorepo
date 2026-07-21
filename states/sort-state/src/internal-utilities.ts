// React:
import {
    // Types:
    type Key,
}                           from 'react'

// Types:
import {
    type SortStateProps,
    type SortStateOptions,
    type SortActivity,
    type SortClassname,
    type SortOffset,
}                           from './types.js'
import {
    type SortStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveEphemeralClassnameArgs,
}                           from '@reusable-ui/ephemeral-state'     // Animates short-lived UI feedback whenever an activity or status change occurs, making activity-driven state changes feel visible and intuitive.



/** Resolves the semantic activity classname for sorting activity status behavior. */
export const resolveSortClassname = ({ activity }: ResolveEphemeralClassnameArgs<SortActivity, SortStateProps<Element, unknown>, SortStateOptions, SortStateDefinition>): SortClassname => {
    return (activity !== undefined) ? 'is-sorting' : 'not-sorting';
};



/**
 * Snapshots element positions into a keyed Map.
 * 
 * @template TItemElement The type of the sortable DOM element.
 * 
 * @param itemElements Map of stable React `key` → DOM element.
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
