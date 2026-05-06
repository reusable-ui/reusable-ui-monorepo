// Cssfn:
import {
    // Writes css in javascript:
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssSortEffectOptions,
    type CssSortEffect,
}                           from './types.js'

// CSS Variables:
import {
    sortEffectVars,
}                           from './css-variables.js'

// Reusable-ui states:
import {
    usesSortState,
}                           from '@reusable-ui/sort-state'          // Adds animated sorting transitions that make sorting actions feel visible and intuitive.



/**
 * Applies sorting effects that animate items from their previous positions into their new sorted order,
 * making components **visually rearranged** during sorting.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between unsorted and sorted states
 * by gradually moving each item from its original unsorted position toward its new sorted order.
 * 
 * ⚠️ Important Usage Note:
 * - Apply `usesSortEffect()` to each **sortable item element** (the individual items),
 *   **not** to the parent sortable container.
 * - Applying the effect at the item level ensures that the correct per-item sorting movements are applied.
 * - Make sure to also apply `...transformFeatureRule()` and the `transform` variable
 *   from `@reusable-ui/transform-feature` to the sortable items,
 *   so that the rearrangement transform works correctly.
 * 
 * @example
 * ```ts
 * // Features:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * import { usesTransformFeature } from '@reusable-ui/transform-feature';
 * 
 * // States:
 * import { usesSortState } from '@reusable-ui/sort-state';
 * 
 * // Effects:
 * import { usesSortEffect } from '@reusable-ui/sort-effect';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, children } from '@cssfn/core';
 * 
 * export const sortableListStyle = () => {
 *     // Features:
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     const {
 *         transformFeatureRule,
 *         transformFeatureVars: { transform },
 *     } = usesTransformFeature();
 *     
 *     // States:
 *     
 *     // Sorting lifecycle:
 *     // - Exposes `sortFactor` (1 → 0) to represent sorting transition progress
 *     // - Associates sorting animation to drive `sortFactor` smoothly
 *     const {
 *         sortStateRule,
 *         sortStateVars: { sortFactor },
 *     } = usesSortState({
 *         animationSorting : 'var(--list-sorting)',
 *     });
 *     
 *     // Sorting visual effect:
 *     // - Consumes `sortFactor` from sort state
 *     // - Gradually translates the component items from their previous positions into their new sorted order
 *     // - Allows additional customization for sorting effects
 *     const {
 *         sortEffectRule,
 *     } = usesSortEffect({
 *         // Currently no options are available, reserved for future extension.
 *     });
 *     
 *     return style({
 *         display  : 'grid',
 *         // Base styling for the component goes here.
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
 *             // Attach feature rules (transform):
 *             ...transformFeatureRule(),
 *             
 *             // Attach sorting effect rules (visual items rearrangement during sorting):
 *             ...sortEffectRule(),
 *             
 *             // Apply transformation (from transform feature):
 *             transform,
 *         }),
 *     });
 * };
 * ```
 * 
 * @param _options - An optional configuration for customizing sorting effects (currently unused, reserved for future extension).
 * @returns A CSS API containing effect rules and CSS variables for animating items into their new order whenever a sorting action occurs.
 */
export const usesSortEffect = (_options?: CssSortEffectOptions): CssSortEffect => {
    // States:
    const { sortStateVars : { sortOffsetX, sortOffsetY, sortFactorCond } } = usesSortState();
    
    // Variables:
    const { sortTransform } = sortEffectVars;
    
    
    
    return {
        sortEffectRule : () => style({
            ...vars({
                // Sorting transform:
                // - Translates each item from its unsorted position → sorted order.
                // - `sortOffsetX` and `sortOffsetY` are applied per item (via sortStyles).
                // - `sortFactorCond` applies at the container level, interpolating offsets over time.
                // - Once `sortFactorCond` reaches 0 (fully sorted), `sortTransform` becomes unset.
                [sortTransform] : `translate(calc(${sortOffsetX} * 1px * ${sortFactorCond}), calc(${sortOffsetY} * 1px * ${sortFactorCond}))`,
            }),
        }),
        
        sortEffectVars,
    } satisfies CssSortEffect;
};
