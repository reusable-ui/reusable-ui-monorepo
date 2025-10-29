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
 * A CSS selector targeting elements currently progressing toward the next view (higher index).
 * 
 * Indicates that the view index is transitioning to a higher index.
 */
export const isViewProgressingSelector   : CssSelectorCollection = '.view-progressing';

/**
 * A CSS selector targeting elements currently regressing toward the previous view (lower index).
 * 
 * Indicates that the view index is transitioning to a lower index.
 */
export const isViewRegressingSelector    : CssSelectorCollection = '.view-regressing';

/**
 * A CSS selector targeting elements currently transitioning, either progressing or regressing between views.
 * 
 * Indicates that the view index is transitioning to a different index.
 */
export const isViewTransitioningSelector : CssSelectorCollection = ':is(.view-progressing, .view-regressing)';



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
 * Applies the given `styles` to elements currently progressing toward the next view (higher index).
 * 
 * Indicates that the view index is transitioning to a higher index.
 * 
 * @param styles The styles applied to elements currently progressing toward the next view.
 * @returns A `CssRule` that applies the given `styles` for elements currently progressing toward the next view.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewProgressing({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewProgressing   = (styles: CssStyleCollection): CssRule => rule(isViewProgressingSelector   , styles);

/**
 * Applies the given `styles` to elements currently regressing toward the previous view (lower index).
 * 
 * Indicates that the view index is transitioning to a lower index.
 * 
 * @param styles The styles applied to elements currently regressing toward the previous view.
 * @returns A `CssRule` that applies the given `styles` for elements currently regressing toward the previous view.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifViewRegressing({
 *         opacity: 0.5,
 *     }),
 * });
 * ```
 */
export const ifViewRegressing    = (styles: CssStyleCollection): CssRule => rule(isViewRegressingSelector    , styles);

/**
 * Applies the given `styles` to elements currently transitioning, either progressing or regressing between views.
 * 
 * Indicates that the view index is transitioning to a different index.
 * 
 * @param styles The styles applied to elements currently transitioning, either progressing or regressing between views.
 * @returns A `CssRule` that applies the given `styles` for elements currently transitioning, either progressing or regressing between views.
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
 *         viewStateVars: { viewIndex, prevViewIndex, isViewProgressing },
 *     } = usesViewState({
 *         animationViewProgressing : 'var(--box-view-progressing)',
 *         animationViewRegressing  : 'var(--box-view-regressing)',
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
 *         // Define view-progressing animation:
 *         ...vars({
 *             '--box-view-progressing': [
 *                 ['0.3s', 'ease-out', 'both', 'translate-view-progressing'],
 *             ],
 *         }),
 *         ...keyframes('translate-view-progressing', {
 *             from: {
 *                 marginInlineStart: 0,
 *             },
 *             to: {
 *                 marginInlineStart: `calc((${viewIndex} - ${prevViewIndex}) * -100px)`,
 *             },
 *         }),
 *         
 *         // Define view-regressing animation:
 *         ...vars({
 *             '--box-view-regressing': [
 *                 ['0.3s', 'ease-out', 'both', 'translate-view-regressing'],
 *             ],
 *         }),
 *         ...keyframes('translate-view-regressing', {
 *             from: {
 *                 marginInlineStart: `calc((${prevViewIndex} - ${viewIndex}) * -100px)`,
 *             },
 *             to: {
 *                 marginInlineStart: 0,
 *             },
 *         }),
 *         
 *         // Define final translation based on current viewIndex:
 *         marginInlineStart: `${isViewProgressing} calc((${viewIndex} - ${prevViewIndex}) * -100px)`, // Translate to the current view.
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
        animationViewProgressing = 'none', // Defaults to `none`.
        animationViewRegressing  = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        viewStateRule : () => style({
            ...states({
                // Apply animation during the progressing phase (e.g. forward view transition):
                ...ifViewProgressing(
                    vars({
                        [viewStateVars.animationViewProgressing] : animationViewProgressing, // Activate the animation (if provided).
                    })
                ),
                
                // Apply animation during the regressing phase (e.g. backward view transition):
                ...ifViewRegressing(
                    vars({
                        [viewStateVars.animationViewRegressing ] : animationViewRegressing,  // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as settled when in the settled phase:
                ...ifViewSettled(
                    vars({
                        [viewStateVars.isViewSettled      ] : '',      // Valid    when fully settled.
                        [viewStateVars.isViewProgressing  ] : 'unset', // Poisoned when fully settled.
                        [viewStateVars.isViewRegressing   ] : 'unset', // Poisoned when fully settled.
                        [viewStateVars.isViewTransitioning] : 'unset', // Poisoned when fully settled.
                    })
                ),
                
                // Mark as progressing when in the progressing phase:
                ...ifViewProgressing(
                    vars({
                        [viewStateVars.isViewSettled      ] : 'unset', // Poisoned when progressing.
                        [viewStateVars.isViewProgressing  ] : '',      // Valid    when progressing.
                        [viewStateVars.isViewRegressing   ] : 'unset', // Poisoned when progressing.
                        [viewStateVars.isViewTransitioning] : '',      // Valid    when progressing.
                    })
                ),
                
                // Mark as regressing when in the regressing phase:
                ...ifViewRegressing(
                    vars({
                        [viewStateVars.isViewSettled      ] : 'unset', // Poisoned when regressing.
                        [viewStateVars.isViewProgressing  ] : 'unset', // Poisoned when regressing.
                        [viewStateVars.isViewRegressing   ] : '',      // Valid    when regressing.
                        [viewStateVars.isViewTransitioning] : '',      // Valid    when regressing.
                    })
                ),
            }),
        }),
        
        viewStateVars,
    } satisfies CssViewState;
};
