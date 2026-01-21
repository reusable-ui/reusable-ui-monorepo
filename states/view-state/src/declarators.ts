// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssViewStateOptions,
    type CssViewState,
}                           from './types.js'

// CSS Variables:
import {
    viewStateVars,
}                           from './css-variables.js'

// Reusable-ui states:
import {
    // Hooks:
    usesInteractionState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/**
 * A CSS selector targeting elements in a fully settled state (not transitioning between views).
 * 
 * Indicates that the view index has reached its target and is no longer transitioning.
 */
export const isViewSettledSelector       : CssSelectorCollection = '.view-settled';

/**
 * A CSS selector targeting elements currently advancing toward the next view (higher index).
 * 
 * Indicates that the view index is transitioning to a higher index.
 */
export const isViewAdvancingSelector     : CssSelectorCollection = '.view-advancing';

/**
 * A CSS selector targeting elements currently receding toward the previous view (lower index).
 * 
 * Indicates that the view index is transitioning to a lower index.
 */
export const isViewRecedingSelector      : CssSelectorCollection = '.view-receding';

/**
 * A CSS selector targeting elements currently transitioning, either advancing or receding between views.
 * 
 * Indicates that the view index is transitioning to a different index.
 */
export const isViewTransitioningSelector : CssSelectorCollection = ':is(.view-advancing, .view-receding)';



/**
 * Applies the given `styles` to elements in a fully settled state (not transitioning between views).
 * 
 * Indicates that the view index has reached its target and is no longer transitioning.
 * 
 * @param styles The styles applied to elements in a fully settled state.
 * @returns A `CssRule` that applies the given `styles` for elements in a fully settled state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewSettled({
 *         opacity: 1,
 *     }),
 * });
 * ```
 */
export const ifViewSettled       = (styles: CssStyleCollection): CssRule => rule(isViewSettledSelector       , styles);

/**
 * Applies the given `styles` to elements currently advancing toward the next view (higher index).
 * 
 * Indicates that the view index is transitioning to a higher index.
 * 
 * @param styles The styles applied to elements currently advancing toward the next view.
 * @returns A `CssRule` that applies the given `styles` for elements currently advancing toward the next view.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewAdvancing({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewAdvancing     = (styles: CssStyleCollection): CssRule => rule(isViewAdvancingSelector     , styles);

/**
 * Applies the given `styles` to elements currently receding toward the previous view (lower index).
 * 
 * Indicates that the view index is transitioning to a lower index.
 * 
 * @param styles The styles applied to elements currently receding toward the previous view.
 * @returns A `CssRule` that applies the given `styles` for elements currently receding toward the previous view.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewReceding({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewReceding      = (styles: CssStyleCollection): CssRule => rule(isViewRecedingSelector      , styles);

/**
 * Applies the given `styles` to elements currently transitioning, either advancing or receding between views.
 * 
 * Indicates that the view index is transitioning to a different index.
 * 
 * @param styles The styles applied to elements currently transitioning, either advancing or receding between views.
 * @returns A `CssRule` that applies the given `styles` for elements currently transitioning, either advancing or receding between views.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewTransitioning({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewTransitioning = (styles: CssStyleCollection): CssRule => rule(isViewTransitioningSelector , styles);



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
 *         viewStateVars: { viewIndex, prevViewIndex, viewIndexFactor },
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
 *         // Advancing animation: interpolate viewIndexFactor from 0 → +1
 *         ...vars({
 *             '--box-view-advancing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-view-advancing'],
 *             ],
 *         }),
 *         ...keyframes('transition-view-advancing', {
 *             from : { [viewIndexFactor]:  0 },
 *             to   : { [viewIndexFactor]:  1 },
 *         }),
 *         
 *         // Receding animation: interpolate viewIndexFactor from 0 → -1
 *         ...vars({
 *             '--box-view-receding': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-view-receding'],
 *             ],
 *         }),
 *         ...keyframes('transition-view-receding', {
 *             from : { [viewIndexFactor]:  0 },
 *             to   : { [viewIndexFactor]: -1 },
 *         }),
 *         
 *         // Shift index factor:
 *         // - Represents the signed destination index for visual translation.
 *         // - Advancing : shiftIndexFactor =  viewIndexFactor
 *         // - Receding  : shiftIndexFactor = -viewIndexFactor - 1
 *         // 
 *         // Direction detection is done inline using:
 *         //   clamp(0, (prevViewIndex - viewIndex) * 999999, 1)
 *         //   → If prev > view → receding → clamp = 1
 *         //   → If prev ≤ view → advancing → clamp = 0
 *         // 
 *         // The multiplier (999999) ensures fractional diffs (e.g. 0.00001) still trigger receding.
 *         '--_shiftIndexFactor':
 * `calc(
 *     ${viewIndexFactor}
 *     +
 *     clamp(0, calc((${switchOf(prevViewIndex, viewIndex)} - ${viewIndex}) * 999999), 1)
 *     * ((${viewIndexFactor} * -2) - 1)
 * )`,
 *         
 *         // Example usage:
 *         // - Translate based on the distance between origin and destination views, interpolated by `--_shiftIndexFactor`.
 *         // - 0 → origin view, ±1 → destination view.
 *         marginInlineStart: `calc(var(--_shiftIndexFactor) * (${viewIndex} - ${prevViewIndex}) * -100px)`,
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
        factorVar       : viewStateVars.viewIndexFactor,
        factorCondVar   : viewStateVars.viewIndexFactorCond,
        ifInactiveState : ifViewSettled,
        /*
        factors         : [
            // ❌ No final value for `viewIndexFactor`.
            // It resets to 0 after animation completes to reflect the collapsed single-view rendering.
            
            // Not needed: Defaults to 0 when no case matches:
            // {
            //     ifState : ifViewSettled,
            //     factor  : 0,
            // },
        ],
        */
    }),
    
    viewStateVars,
}) satisfies CssViewState;
