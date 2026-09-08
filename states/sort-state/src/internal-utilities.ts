// React:
import {
    // Types:
    type Key,
    type RefObject,
}                           from 'react'

// Types:
import {
    type SortStateProps,
    type SortStateOptions,
    type SortActivity,
    type SortClassname,
    type SortItemOffset,
}                           from './types.js'
import {
    type SortStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveEphemeralClassnameArgs,
}                           from '@reusable-ui/ephemeral-state'     // Animates short-lived UI feedback whenever an activity or status change occurs, making activity-driven state changes feel visible and intuitive.



/** Resolves the semantic activity classname for sort state behavior. */
export const resolveSortClassname = ({ activity }: ResolveEphemeralClassnameArgs<SortActivity, SortStateProps<unknown>, SortStateOptions, SortStateDefinition>): SortClassname => {
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
export const snapshotElementPositions = <TItemElement extends Element = HTMLElement>(itemElements: Map<Key, TItemElement>): Map<Key, SortItemOffset> => new Map<Key, SortItemOffset>(
    Array.from(itemElements.entries()).map(([itemKey, itemElement]) => {
        const { x, y, width, height } = itemElement.getBoundingClientRect();
        return [
            itemKey,
            {
                // Use the element's center point for consistency:
                x : x + (width  / 2),
                y : y + (height / 2),
            } satisfies SortItemOffset
        ];
    })
);



/**
 * Lazily initializes a `RefObject` for sortable item elements.
 * 
 * @template TItemElement The type of the sortable DOM element.
 * 
 * @param rawSortItemRefs A `RefObject` that may or may not already contain a Map of sortable item elements.
 * @returns A `RefObject` guaranteed to contain a Map of sortable item elements, initializing it if necessary.
 * 
 * @remarks
 * This helper guarantees that the ref is always initialized to a Map,
 * so consumers can safely access and mutate sortable item elements without null checks.
 * If the ref already contains a Map, it is returned as-is.
 * Otherwise, a new Map is created and assigned.
 */
export const lazyInitializeSortItemRefs = <TItemElement extends Element = HTMLElement>(rawSortItemRefs: RefObject<Map<Key, TItemElement> | undefined>): RefObject<Map<Key, TItemElement>> => {
    // Determine if the ref already contains a Map:
    if (rawSortItemRefs.current !== undefined) return rawSortItemRefs as RefObject<Map<Key, TItemElement>>;
    
    
    
    // Create a new Map for the ref:
    rawSortItemRefs.current = new Map<Key, TItemElement>();
    return rawSortItemRefs as RefObject<Map<Key, TItemElement>>;
};
