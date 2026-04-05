// Types:
import {
    type CssViewStateOptions,
    type CssViewState,
}                           from './types.js'

// CSS Variables:
import {
    viewStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifViewSettled,
    ifViewAdvancing,
    ifViewReceding,
    ifViewTransitioning,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesInteractionState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/**
 * Generates CSS rules that conditionally apply the view-switching animations based on current view index,
 * and exposes view-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing view-switching animations.
 * @returns A CSS API for conditionally apply the view-switching animations based on current view index.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // View-switching state:
 * import { usesViewState } from '@reusable-ui/view-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, switchOf } from '@cssfn/core';
 * 
 * export const slideBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: view-switching lifecycle
 *     const {
 *         viewStateRule,
 *         viewStateVars: { viewIndex, prevViewIndex, viewFactor },
 *     } = usesViewState({
 *         animationViewAdvancing : 'var(--box-view-advancing)',
 *         animationViewReceding  : 'var(--box-view-receding)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply view-switching state rules:
 *         ...viewStateRule(),
 *         
 *         // The parent container is 100px wide and overflows hidden.
 *         // To show the correct view, we translate this box based on the current viewIndex.
 *         // We `translate` using `marginInlineStart` for better RTL support, because `translate` is physical, not logical.
 *         
 *         // Advancing animation: interpolate viewFactor from 0 → +1
 *         ...vars({
 *             '--box-view-advancing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-view-advancing'],
 *             ],
 *         }),
 *         ...keyframes('transition-view-advancing', {
 *             from : { [viewFactor]:  0 },
 *             to   : { [viewFactor]:  1 },
 *         }),
 *         
 *         // Receding animation: interpolate viewFactor from 0 → -1
 *         ...vars({
 *             '--box-view-receding': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-view-receding'],
 *             ],
 *         }),
 *         ...keyframes('transition-view-receding', {
 *             from : { [viewFactor]:  0 },
 *             to   : { [viewFactor]: -1 },
 *         }),
 *         
 *         // Shift factor:
 *         // - Represents the signed destination index for visual translation.
 *         // - Advancing : shiftFactor =  viewFactor
 *         // - Receding  : shiftFactor = -viewFactor - 1
 *         // 
 *         // Direction detection is done inline using:
 *         //   clamp(0, (prevViewIndex - viewIndex) * 999999, 1)
 *         //   → If prev > view → receding → clamp = 1
 *         //   → If prev ≤ view → advancing → clamp = 0
 *         // 
 *         // The multiplier (999999) ensures fractional diffs (e.g. 0.00001) still trigger receding.
 *         '--_shiftFactor':
 * `calc(
 *     ${viewFactor}
 *     +
 *     clamp(0, calc((${switchOf(prevViewIndex, viewIndex)} - ${viewIndex}) * 999999), 1)
 *     * ((${viewFactor} * -2) - 1)
 * )`,
 *         
 *         // Example usage:
 *         // - Translate based on the distance between origin and destination views, interpolated by `--_shiftFactor`.
 *         // - 0 → origin view, ±1 → destination view.
 *         marginInlineStart: `calc(var(--_shiftFactor) * (${viewIndex} - ${prevViewIndex}) * -100px)`,
 *         contain: 'layout', // Contain layout to prevent reflows.
 *         willChange: 'margin-inline-start', // Hint to browser for better performance.
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesViewState = (options?: CssViewStateOptions): CssViewState => ({
    viewStateRule : () => usesInteractionState({
        // Feedback animations for visual effects whenever a view index changes:
        animations      : [
            {
                ifState   : ifViewAdvancing,
                variable  : viewStateVars.animationViewAdvancing,
                animation : options?.animationViewAdvancing,
            },
            {
                ifState   : ifViewReceding,
                variable  : viewStateVars.animationViewReceding,
                animation : options?.animationViewReceding,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifViewSettled,
                variable : viewStateVars.isViewSettled,
            },
            {
                ifState  : ifViewAdvancing,
                variable : viewStateVars.isViewAdvancing,
            },
            {
                ifState  : ifViewReceding,
                variable : viewStateVars.isViewReceding,
            },
            {
                ifState  : ifViewTransitioning,
                variable : viewStateVars.isViewTransitioning,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : viewStateVars.viewFactor,
        factorCondVar   : viewStateVars.viewFactorCond,
        ifInactiveState : ifViewSettled,
        /*
        activeFactors   : [
            // ❌ No final value for `viewFactor`.
            // It resets to 0 after animation completes to reflect the collapsed single-view rendering.
        ],
        */
    }),
    
    viewStateVars,
}) satisfies CssViewState;
