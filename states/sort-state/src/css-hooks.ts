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
    usingFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the sorting transition whenever a sorting action occurs,
 * and exposes sort-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing sorting transitions.
 * @returns A CSS API for conditionally apply the sorting transition whenever a sorting action occurs.
 *
 * @example
 * ```ts
 * // Features:
 * import { usingAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // States:
 * import { usingSortState } from '@reusable-ui/sort-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, children } from '@cssfn/core';
 * 
 * export const sortableListStyle = () => {
 *     // Features:
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usingAnimationFeature();
 *     
 *     // States:
 *     
 *     // Sorting lifecycle:
 *     // - Exposes `sortFactor` (1 → 0) to represent sorting transition progress
 *     // - Associates sorting animation to drive `sortFactor` smoothly
 *     const {
 *         sortStateRule,
 *         sortStateVars: { sortOffsetX, sortOffsetY, sortFactor },
 *     } = usingSortState({
 *         animationSorting : 'var(--list-sorting)',
 *     });
 *     
 *     return style({
 *         display: 'grid',
 *         // Define component styling here.
 *         
 *         // Attach feature rules (animation):
 *         ...animationFeatureRule(),
 *         
 *         // Attach sorting state rules (tracks items movement during sorting):
 *         ...sortStateRule(),
 *         
 *         // Sorting animation: interpolate sortFactor from 1 → 0:
 *         ...vars({
 *             '--list-sorting': [
 *                 ['0.3s', 'ease-out', 'both', 'sorting'],
 *             ],
 *         }),
 *         ...keyframes('sorting', {
 *             from : { [sortFactor]: 1 }, // Start fully unsorted.
 *             // '90%': { [sortFactor]: -0.2 }, // Optional overshoot for an "elastic" effect
 *             to   : { [sortFactor]: 0 }, // End fully sorted.
 *         }),
 *         
 *         // Example usage:
 *         
 *         // Apply animations (from animation feature):
 *         animation,
 *         
 *         ...children('.item', { // The individual items.
 *             display  : 'grid',
 *             // Base styling for each item goes here.
 *             
 *             // Translates each item from its unsorted position → sorted order:
 *             // - `sortOffsetX` and `sortOffsetY` are applied per item (via sortStyles).
 *             // - `sortFactor` applies at the container level, interpolating offsets over time.
 *             transform: `translate(calc(${sortOffsetX} * 1px * ${sortFactor}), calc(${sortOffsetY} * 1px * ${sortFactor}))`,
 *         }),
 *     });
 * }
 * ```
 */
export const usingSortState = (options?: CssSortStateOptions): CssSortState => ({
    sortStateRule : () => usingFeedbackState({
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
