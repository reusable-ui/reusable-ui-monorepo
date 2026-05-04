// Types:
import {
    type CssSortStateOptions,
    type CssSortState,
}                           from './types.js'

// CSS Variables:
import {
    sortStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifSorting,
    ifNotSorting,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the sorting transition whenever a sorting action occurs,
 * and exposes sort-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing sorting transition.
 * @returns A CSS API for conditionally apply the sorting transition whenever a sorting action occurs.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Sort state:
 * import { usesSortState } from '@reusable-ui/sort-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, children } from '@cssfn/core';
 * 
 * export const sortableListStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: sorting transition
 *     const {
 *         sortStateRule,
 *         sortStateVars: { sortOffsetX, sortOffsetY, sortFactor },
 *     } = usesSortState({
 *         animationSorting: 'var(--list-sorting)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply sorting state rules:
 *         ...sortStateRule(),
 *         
 *         // Sorting animation: interpolate sortFactor from 1 → 0
 *         ...vars({
 *             '--list-sorting': [
 *                 ['0.3s', 'ease-out', 'both', 'sorting'],
 *             ],
 *         }),
 *         ...keyframes('sorting', {
 *             from : { [sortFactor]: 1 }, // Start fully unsorted.
 *             to   : { [sortFactor]: 0 }, // End fully sorted.
 *         }),
 *         
 *         // Example usage:
 *         
 *         ...children('.item', {
 *             // Translate each item from its unsorted position → sorted position:
 *             // - `sortOffsetX` and `sortOffsetY` are applied per item (via sortStyles).
 *             // - `sortFactor` applies at container level, interpolating the offsets over time.
 *             transform: `translate(calc(${sortOffsetX} * 1px * ${sortFactor}), calc(${sortOffsetY} * 1px * ${sortFactor}))`,
 *         }),
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * }
 * ```
 */
export const usesSortState = (options?: CssSortStateOptions): CssSortState => ({
    sortStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a sorting action occurs:
        animations : {
            ifState   : ifSorting,
            variable  : sortStateVars.animationSorting,
            animation : options?.animationSorting,
        },
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : sortStateVars.sortFactor,
        factorCondVar   : sortStateVars.sortFactorCond,
        ifInactiveState : ifNotSorting,
        /*
        activeFactors   : [
            // ✅ Implicit final value for `sortFactor`.
            // It stays at 0 after animation completes (no unsorted illusion).
        ],
        */
    }),
    
    sortStateVars,
}) satisfies CssSortState;
