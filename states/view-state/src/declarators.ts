// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    atRule,
    states,
    style,
    vars,
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
export const usesViewState = (options?: CssViewStateOptions): CssViewState => {
    // Extract options and assign defaults:
    const {
        animationViewAdvancing = 'none', // Defaults to `none`.
        animationViewReceding  = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        viewStateRule : () => style({
            // Register `viewIndexFactor` as an animatable custom property:
            // - Initial value is `0`, ensuring it resolves to `0` when not explicitly defined (`unset`).
            ...atRule(`@property ${viewStateVars.viewIndexFactor.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
                // @ts-ignore
                syntax       : '"<number>"',
                inherits     : true,
                initialValue : 0,
            }),
            
            // Mirror `viewIndexFactor` into `viewIndexFactorCond` by default:
            // - During advancing/receding transitions, `viewIndexFactorCond` follows `viewIndexFactor`.
            ...vars({
                [viewStateVars.viewIndexFactorCond]: viewStateVars.viewIndexFactor,
            }),
            
            
            
            ...states({
                // Apply animation during the advancing phase (e.g. forward view transition):
                ...ifViewAdvancing(
                    vars({
                        [viewStateVars.animationViewAdvancing] : animationViewAdvancing, // Activate the animation (if provided).
                    })
                ),
                
                // Apply animation during the receding phase (e.g. backward view transition):
                ...ifViewReceding(
                    vars({
                        [viewStateVars.animationViewReceding ] : animationViewReceding,  // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as settled when in the settled phase:
                ...ifViewSettled(
                    vars({
                        [viewStateVars.isViewSettled      ] : '',      // Valid    when fully settled.
                        [viewStateVars.isViewAdvancing    ] : 'unset', // Poisoned when fully settled.
                        [viewStateVars.isViewReceding     ] : 'unset', // Poisoned when fully settled.
                        [viewStateVars.isViewTransitioning] : 'unset', // Poisoned when fully settled.
                    })
                ),
                
                // Mark as advancing when in the advancing phase:
                ...ifViewAdvancing(
                    vars({
                        [viewStateVars.isViewSettled      ] : 'unset', // Poisoned when advancing.
                        [viewStateVars.isViewAdvancing    ] : '',      // Valid    when advancing.
                        [viewStateVars.isViewReceding     ] : 'unset', // Poisoned when advancing.
                        [viewStateVars.isViewTransitioning] : '',      // Valid    when advancing.
                    })
                ),
                
                // Mark as receding when in the receding phase:
                ...ifViewReceding(
                    vars({
                        [viewStateVars.isViewSettled      ] : 'unset', // Poisoned when receding.
                        [viewStateVars.isViewAdvancing    ] : 'unset', // Poisoned when receding.
                        [viewStateVars.isViewReceding     ] : '',      // Valid    when receding.
                        [viewStateVars.isViewTransitioning] : '',      // Valid    when receding.
                    })
                ),
                
                
                
                // ❌ No settled assignment for `viewIndexFactor`.
                // It resets to 0 after animation completes to reflect the collapsed single-view rendering.
                
                // Drop `viewIndexFactorCond` when the view is settled (baseline single-view rendering):
                // - Explicitly set to `unset` so dependent declarations fall back cleanly.
                ...ifViewSettled(
                    vars({
                        [viewStateVars.viewIndexFactorCond]: 'unset',
                    })
                ),
            }),
        }),
        
        viewStateVars,
    } satisfies CssViewState;
};
