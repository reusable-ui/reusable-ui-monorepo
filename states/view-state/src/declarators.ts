// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
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
 * import { style, vars, keyframes } from '@cssfn/core';
 * 
 * export const slideBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         viewStateRule,
 *         viewStateVars: { viewIndex, prevViewIndex, isViewAdvancing },
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
 *         // Define view-advancing animation:
 *         ...vars({
 *             '--box-view-advancing': [
 *                 ['0.3s', 'ease-out', 'both', 'translate-view-advancing'],
 *             ],
 *         }),
 *         ...keyframes('translate-view-advancing', {
 *             from: {
 *                 marginInlineStart: 0,
 *             },
 *             to: {
 *                 marginInlineStart: `calc((${viewIndex} - ${prevViewIndex}) * -100px)`,
 *             },
 *         }),
 *         
 *         // Define view-receding animation:
 *         ...vars({
 *             '--box-view-receding': [
 *                 ['0.3s', 'ease-out', 'both', 'translate-view-receding'],
 *             ],
 *         }),
 *         ...keyframes('translate-view-receding', {
 *             from: {
 *                 marginInlineStart: `calc((${prevViewIndex} - ${viewIndex}) * -100px)`,
 *             },
 *             to: {
 *                 marginInlineStart: 0,
 *             },
 *         }),
 *         
 *         // Define final translation based on current viewIndex:
 *         marginInlineStart: `${isViewAdvancing} calc((${viewIndex} - ${prevViewIndex}) * -100px)`, // Translate to the current view.
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
            }),
        }),
        
        viewStateVars,
    } satisfies CssViewState;
};
