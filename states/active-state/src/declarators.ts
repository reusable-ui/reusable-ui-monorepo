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
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ActiveStateVars,
    type CssActiveStateOptions,
    type CssActiveState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully active state.
 * 
 * Excludes elements currently in the activating transition.
 */
export const isActiveSelector                 : CssSelectorCollection = '.is-active';

/**
 * A CSS selector targeting elements in the fully inactive state.
 * 
 * Excludes elements currently in the deactivating transition.
 */
export const isInactiveSelector               : CssSelectorCollection = '.is-inactive';

/**
 * A CSS selector targeting elements currently in the activating transition.
 * 
 * Excludes elements that have already reached the active state.
 */
export const isActivatingSelector             : CssSelectorCollection = '.is-activating';

/**
 * A CSS selector targeting elements currently in the deactivating transition.
 * 
 * Excludes elements that have already reached the inactive state.
 */
export const isDeactivatingSelector           : CssSelectorCollection = '.is-deactivating';

/**
 * A CSS selector targeting elements that are either activating or fully active.
 */
export const isActivatingOrActiveSelector     : CssSelectorCollection = ':is(.is-activating, .is-active)';

/**
 * A CSS selector targeting elements that are either deactivating or fully inactive.
 */
export const isDeactivatingOrInactiveSelector : CssSelectorCollection = ':is(.is-deactivating, .is-inactive)';



/**
 * Applies the given `styles` to elements in the fully active state.
 * 
 * Excludes elements currently in the activating transition.
 * 
 * @param styles The styles applied to elements in the fully active state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully active state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActive({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActive                 = (styles: CssStyleCollection): CssRule => rule(isActiveSelector                 , styles);

/**
 * Applies the given `styles` to elements in the fully inactive state.
 * 
 * Excludes elements currently in the deactivating transition.
 * 
 * @param styles The styles applied to elements in the fully inactive state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully inactive state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifInactive({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifInactive               = (styles: CssStyleCollection): CssRule => rule(isInactiveSelector               , styles);

/**
 * Applies the given `styles` to elements currently in the activating transition.
 * 
 * Excludes elements that have already reached the active state.
 * 
 * @param styles The styles applied to elements currently in the activating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the activating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActivating({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActivating             = (styles: CssStyleCollection): CssRule => rule(isActivatingSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the deactivating transition.
 * 
 * Excludes elements that have already reached the inactive state.
 * 
 * @param styles The styles applied to elements currently in the deactivating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the deactivating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDeactivating({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifDeactivating           = (styles: CssStyleCollection): CssRule => rule(isDeactivatingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either activating or fully active.
 * 
 * @param styles The styles applied to elements that are either activating or fully active.
 * @returns A `CssRule` that applies the given `styles` for elements that are either activating or fully active.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActivatingOrActive({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActivatingOrActive     = (styles: CssStyleCollection): CssRule => rule(isActivatingOrActiveSelector     , styles);

/**
 * Applies the given `styles` to elements that are either deactivating or fully inactive.
 * 
 * @param styles The styles applied to elements that are either deactivating or fully inactive.
 * @returns A `CssRule` that applies the given `styles` for elements that are either deactivating or fully inactive.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDeactivatingOrInactive({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifDeactivatingOrInactive = (styles: CssStyleCollection): CssRule => rule(isDeactivatingOrInactiveSelector , styles);



/**
 * A strongly typed global mapping of activate/deactivate-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [activeStateVars] = cssVars<ActiveStateVars>({ prefix: 'ac', minify: false });

// Register the activate/deactivate animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(activeStateVars.animationActivate);
animationRegistry.registerAnimation(activeStateVars.animationDeactivate);

/**
 * Generates CSS rules that conditionally apply the activate/deactivate animations based on the current transition phase,
 * and exposes activate/deactivate-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing activate/deactivate animations.
 * @returns A CSS API for conditionally apply the activate/deactivate animations based on the current transition phase.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Active/inactive state:
 * import { usesActiveState } from '@reusable-ui/active-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const activatableBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         activeStateRule,
 *         activeStateVars: { isActive, isInactive },
 *     } = usesActiveState({
 *         animationActivate   : 'var(--box-activate)',
 *         animationDeactivate : 'var(--box-deactivate)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply active/inactive state rules:
 *         ...activeStateRule(),
 *         
 *         // Define activating animation:
 *         ...vars({
 *             '--box-activate': [
 *                 ['0.3s', 'ease-out', 'both', 'opacity-activating'],
 *             ],
 *         }),
 *         ...keyframes('opacity-activating', {
 *             from: {
 *                 opacity: '60%',
 *             },
 *             to: {
 *                 opacity: '100%',
 *             },
 *         }),
 *         
 *         // Define deactivating animation:
 *         ...vars({
 *             '--box-deactivate': [
 *                 ['0.3s', 'ease-out', 'both', 'opacity-deactivating'],
 *             ],
 *         }),
 *         ...keyframes('opacity-deactivating', {
 *             from: {
 *                 opacity: '100%',
 *             },
 *             to: {
 *                 opacity: '60%',
 *             },
 *         }),
 *         
 *         // Define final opacity based on lifecycle state:
 *         ...fallback({
 *             '--opacity-active' : `${isActive} 100%`,
 *         }),
 *         ...fallback({
 *             '--opacity-inactive' : `${isInactive} 60%`,
 *         }),
 *         opacity: 'var(--opacity-active, var(--opacity-inactive))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesActiveState = (options?: CssActiveStateOptions): CssActiveState => {
    // Extract options and assign defaults:
    const {
        animationActivate   = 'none', // Defaults to `none`.
        animationDeactivate = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        activeStateRule : () => style({
            ...states({
                // Apply activate animation during the activating phase:
                ...ifActivating(
                    vars({
                        [activeStateVars.animationActivate  ] : animationActivate,   // Activate the animation (if provided).
                    })
                ),
                
                // Apply deactivate animation during the deactivating phase:
                ...ifDeactivating(
                    vars({
                        [activeStateVars.animationDeactivate] : animationDeactivate, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as active during both activating and fully active states:
                ...ifActivatingOrActive(
                    vars({
                        [activeStateVars.isActive  ] : '',      // Valid    when either activating or fully active.
                        [activeStateVars.isInactive] : 'unset', // Poisoned when either activating or fully active.
                    })
                ),
                
                // Mark as inactive during both deactivating and fully inactive states:
                ...ifDeactivatingOrInactive(
                    vars({
                        [activeStateVars.isActive  ] : 'unset', // Poisoned when either deactivating or fully inactive.
                        [activeStateVars.isInactive] : '',      // Valid    when either deactivating or fully inactive.
                    })
                ),
            }),
        }),
        
        activeStateVars,
    } satisfies CssActiveState;
};
