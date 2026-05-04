'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type Key,
    type CSSProperties,
    
    
    
    // Hooks:
    useState,
    useLayoutEffect,
    useMemo,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    type SortStateProps,
    type SortStateClearProps,
    type SortStateOptions,
    type SortClassname,
    type SortOffset,
    type SortBehaviorState,
}                           from './types.js'
import {
    type SortPhase,
    type SortBehaviorStateDefinition,
}                           from './internal-types.js'

// Utilities:
import {
    resolveSortTransitionPhase,
    resolveSortActivityClassname,
    snapshotElementPositions,
}                           from './internal-utilities.js'

// CSS Variables:
import {
    sortStateVars,
}                           from './css-variables.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useMountedFlag,
}                           from '@reusable-ui/lifecycles'          // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.

// Reusable-ui states:
import {
    // Hooks:
    useFeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** The behavior state definition for sorting state management. */
const sortBehaviorStateDefinition : SortBehaviorStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : 'sorting',                    // Matches animation names for sorting activity.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveSortTransitionPhase,
    resolveTransitionClassname : resolveSortActivityClassname, // Resolves classnames.
};

/**
 * Adds animated sorting transitions that make sorting actions feel visible and intuitive
 * by animating items from their original unsorted positions into their new sorted order.
 * 
 * Without this hook, updating items directly (e.g. `setItems(items.toSorted(...))`)
 * reorders items immediately, without visual feedback of *how* items moved.  
 * With this hook, item positions are snapshotted before and after the sort,
 * and each item animates into place — clearly conveying the transition.
 * 
 * Provides:
 * - Current sorting activity status.
 * - Per-item movement offsets (from unsorted to sorted positions).
 * - A CSS class name for animation triggers.
 * - Inline CSS variables for styling transitions.
 * - Event handlers for coordinating the animation lifecycle.
 * 
 * Supports a declarative workflow by passing staged sort data,
 * committing it via a callback, and then clearing the staged state.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TItemElement - The type of the sortable DOM element.
 * @template TSortData - The type of the data driving the sortable elements (commonly an array of item metadata).
 * 
 * @param {SortStateProps<TItemElement, TSortData> & SortStateClearProps} props - The component props for passing staged sort data and commit/clear callbacks.
 * @param {SortStateOptions} options - An optional configuration for customizing sort transition behavior and animation lifecycle.
 * @returns {SortBehaviorState<TElement>} - The current sorting activity status, per-item movements, associated CSS class name, inline CSS variables, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, Key, useRef, useState } from 'react';
 * import { flushSync } from 'react-dom';
 * import {
 *     useSortBehaviorState,
 *     SortStateProps,
 *     SortStateClearProps,
 * } from '@reusable-ui/sort-state';
 * import styles from './SortableList.module.css';
 * 
 * // Example model with a stable id and metadata:
 * interface Product {
 *     id    : string
 *     name  : string
 *     price : number
 *     // Other fields...
 * }
 * 
 * export interface SortableListProps
 *     extends
 *         SortStateProps<HTMLDivElement, Product[]>,
 *         SortStateClearProps
 * {
 * }
 * 
 * // A list with sortable items and animated transitions:
 * export const SortableList: FC<SortableListProps> = (props) => {
 *     // Internal map of item refs keyed by React `key` (stable id):
 *     const internalSortItemRefs = useRef<Map<Key, HTMLElement>>(new Map<Key, HTMLElement>());
 *     
 *     // Committed data currently rendered in the DOM:
 *     const [committedItems, setCommittedItems] = useState<Product[]>(() => {
 *         // Initialize with your data:
 *         return [];
 *     });
 *     
 *     // Temporary staged data (pending sorted order, not yet committed):
 *     const [internalStagedSortData, setInternalStagedSortData] = useState<Product[] | undefined>(undefined);
 *     
 *     // Props can override these defaults, allowing parent and derived components to control sorting:
 *     const {
 *         sortItemRefs          = internalSortItemRefs,
 *         stagedSortData        = internalStagedSortData,
 *         onSortCommit          = (stagedSortData) => {
 *             // Use `flushSync` so React fully renders the committed state immediately within this callback:
 *             // - Ensures item positions can be diffed accurately between the **before and after** states.
 *             // - Produces correct movement offsets for the animation.
 *             flushSync(() => {
 *                 // Commit the new sorted order:
 *                 setCommittedItems(stagedSortData);
 *             });
 *         },
 *         onStagedSortDataClear = () => {
 *             // Clear staged state:
 *             setInternalStagedSortData(undefined);
 *         },
 *     } = props;
 *     
 *     // Hook manages animated sorting transitions:
 *     const {
 *         sorting,       // Activity flag
 *         sortOffsets,   // Per-item movement
 *         sortClassname, // CSS class for animation triggers
 *         sortStyles,    // Inline CSS variables
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useSortBehaviorState({
 *         sortItemRefs,
 *         stagedSortData,
 *         onSortCommit,
 *         onStagedSortDataClear,
 *     }, {
 *         animationPattern  : 'list-sorting', // Matches animation names ending with 'list-sorting'.
 *         animationBubbling : false,          // Ignores bubbling animation events from children.
 *     });
 *     
 *     // Example sort handler: stage a new sorted order without committing immediately:
 *     const handleSortByPrice = async () => {
 *         // Example synchronous sort:
 *         const sortedData = committedItems.toSorted((a, b) => a.price - b.price);
 *         
 *         // Example asynchronous sort:
 *         // const sortedData = await customAsyncSort(committedItems);
 *         
 *         // Do not commit directly (would skip animation):
 *         // setCommittedItems(sortedData);
 *         
 *         // Instead stage the new order:
 *         // - Snapshots current (unsorted) and next (sorted) positions.
 *         // - Runs animation by transitioning items from unsorted → sorted.
 *         setInternalStagedSortData(sortedData);
 *     };
 *     
 *     return (
 *         <div
 *             className={`${styles.list} ${sortClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {committedItems.map(({ id, name, price }) => (
 *                 <div
 *                     key={id}
 *                     ref={(element) => {
 *                         if (!element) return;
 *                         sortItemRefs.current.set(id, element);
 *                         return () => {
 *                             sortItemRefs.current.delete(id);
 *                         };
 *                     }}
 *                     className={styles.item}
 *                     style={sortStyles.get(id)}
 *                 >
 *                     <p>{name}</p>
 *                     <p>{price}</p>
 *                 </div>
 *             ))}
 *             
 *             <button onClick={handleSortByPrice}>Sort by price</button>
 *         </div>
 *     );
 * };
 * ```
 */
export const useSortBehaviorState = <TElement extends Element = HTMLElement, TItemElement extends Element = HTMLElement, TSortData = Array<unknown>>(props: SortStateProps<TItemElement, TSortData> & SortStateClearProps, options?: SortStateOptions): SortBehaviorState<TElement> => {
    // Extract props:
    const {
        sortItemRefs,
        stagedSortData,
        onSortCommit,
        onStagedSortDataClear,
        // ...restProps // Not needed the rest since all resolvers in the definition are *not* dependent of the props.
    } = props;
    
    
    
    // States and flags:
    
    // Per-item offsets for creating the unsorted illusion:
    // - Useful for the initial animation movement from the original unsorted positions to the new sorted positions.
    const [sortOffsets, setSortOffsets] = useState<Map<Key, SortOffset>>(() => new Map<Key, SortOffset>());
    
    // Animation trigger state:
    // - A unique pulse value that queues a new sorting animation,
    //   ensuring that consecutive sort changes always produce a distinct trigger,
    //   even if the previous animation is still active.
    const [sortingAnimationTrigger, setSortingAnimationTrigger] = useState<symbol>(() => Symbol());
    
    // Activity orchestration:
    const {
        prevSettledState    : _prevTrigger,   // Unused in this domain.
        state               : _trigger,       // Unused in this domain.
        actualState         : _actualTrigger, // Unused in this domain.
        transitionPhase     : sortPhase,
        transitionClassname : sortClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        symbol,
        SortPhase,
        SortClassname,
        
        SortStateProps<Element, unknown>,
        SortStateOptions,
        SortBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState : sortingAnimationTrigger,
            
            // onStateChange, // No-op on animation finishes.
            
            /* ...restProps */
        },
        
        // Options:
        options,
        
        // Definition:
        sortBehaviorStateDefinition,
    );
    
    
    
    // Lifecycles:
    
    // A stable callback for commiting the staged sort data.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const commitStagedData  = useStableCallback(onSortCommit);
    
    // A stable callback for clearing the external staged sort data.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const clearStagedData   = useStableCallback(onStagedSortDataClear);
    
    // A flag indicating whether the component is currently mounted:
    // - Used to prevent state updates after unmounting during async operations.
    const isMounted = useMountedFlag();
    
    // Sorting lifecycle:
    // - Responds whenever staged sort data changes.
    // - Runs in `useLayoutEffect` so it executes before the browser paints,
    //   creating the illusion that elements never left their original positions.
    useLayoutEffect(() => {
        // Guard: if no elements or no staged data, there's nothing to animate → exit early:
        const sortItemElements = sortItemRefs?.current;
        if (!sortItemElements?.size || (stagedSortData === undefined)) return;
        
        
        
        // Snapshot positions before committing (unsorted positions):
        const offsetsBefore = snapshotElementPositions<TItemElement>(sortItemElements);
        
        
        
        // Commit staged data into the state and clear external staged reference:
        commitStagedData(stagedSortData);
        clearStagedData(undefined, undefined);
        
        
        
        // Wait for one microtask tick so the DOM reflects the new sorted positions before snapshotting again:
        Promise.resolve().then(() => {
            // Abort if the component has unmounted during the async gap:
            if (!isMounted.current) return;
            
            
            
            // Snapshot positions after committing (sorted positions):
            const offsetsAfter = snapshotElementPositions<TItemElement>(sortItemElements);
            
            
            
            // Diff positions to compute animation offsets:
            // - Each element is offset back to its original unsorted position.
            // - Ignore disappearing or newly added elements.
            setSortOffsets(new Map<Key, SortOffset>(
                Array.from(offsetsBefore.entries())
                .map(([itemKey, offsetBefore]) => {
                    const offsetAfter = offsetsAfter.get(itemKey);
                    if (!offsetAfter) return null;
                    return [
                        itemKey,
                        {
                            x : offsetBefore.x - offsetAfter.x,
                            y : offsetBefore.y - offsetAfter.y,
                        } satisfies SortOffset,
                    ] as const;
                })
                .filter((sortOffset): sortOffset is Exclude<typeof sortOffset, null> => (sortOffset !== null))
            ));
            
            
            
            // Queue a new sorting animation:
            setSortingAnimationTrigger(Symbol());
        });
    }, [stagedSortData]);
    
    
    
    // Compute CSS variables for offsets:
    const sortStyles = useMemo<Map<Key, CSSProperties>>(() => {
        // Unwrap the CSS variable names without `var(...)` for assignments:
        const sortOffsetX = (
            sortStateVars.sortOffsetX
            .slice(4, -1) // fix: var(--customProp) => --customProp
        );
        const sortOffsetY = (
            sortStateVars.sortOffsetY
            .slice(4, -1) // fix: var(--customProp) => --customProp
        );
        
        
        
        // Map the offsets to CSS properties:
        return new Map<Key, CSSProperties>(
            Array.from(sortOffsets.entries())
            .map(([key, { x, y }]) => [
                key,
                {
                    [sortOffsetX]: x,
                    [sortOffsetY]: y,
                } satisfies CSSProperties
            ])
        );
    }, [sortStateVars.sortOffsetX, sortStateVars.sortOffsetY, sortOffsets]);
    
    
    
    // Return the sorting state API:
    return {
        sorting : (sortPhase === 'sorting'),
        sortOffsets,
        sortClassname,
        sortStyles,
        ...animationHandlers,
    } satisfies SortBehaviorState<TElement>;
};
