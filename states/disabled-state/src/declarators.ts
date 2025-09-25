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
    type DisabledStateVars,
    type CssDisabledStateOptions,
    type CssDisabledState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully enabled state.
 * 
 * Excludes elements currently in the enabling transition.
 */
export const isEnabledSelector             : CssSelectorCollection = '.is-enabled';

/**
 * A CSS selector targeting elements in the fully disabled state.
 * 
 * Excludes elements currently in the disabling transition.
 */
export const isDisabledSelector            : CssSelectorCollection = '.is-disabled';

/**
 * A CSS selector targeting elements currently in the enabling transition.
 * 
 * Excludes elements that have already reached the enabled state.
 */
export const isEnablingSelector            : CssSelectorCollection = '.is-enabling';

/**
 * A CSS selector targeting elements currently in the disabling transition.
 * 
 * Excludes elements that have already reached the disabled state.
 */
export const isDisablingSelector           : CssSelectorCollection = '.is-disabling';

/**
 * A CSS selector targeting elements that are either enabling or fully enabled.
 */
export const isEnablingOrEnabledSelector   : CssSelectorCollection = ':is(.is-enabling, .is-enabled)';

/**
 * A CSS selector targeting elements that are either disabling or fully disabled.
 */
export const isDisablingOrDisabledSelector : CssSelectorCollection = ':is(.is-disabling, .is-disabled)';



/**
 * Applies the given `styles` to elements in the fully enabled state.
 * 
 * Excludes elements currently in the enabling transition.
 * 
 * @param styles - The styles applied to elements in the fully enabled state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully enabled state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEnabled({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifEnabled             = (styles: CssStyleCollection): CssRule => rule(isEnabledSelector             , styles);

/**
 * Applies the given `styles` to elements in the fully disabled state.
 * 
 * Excludes elements currently in the disabling transition.
 * 
 * @param styles - The styles applied to elements in the fully disabled state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully disabled state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDisabled({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifDisabled            = (styles: CssStyleCollection): CssRule => rule(isDisabledSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the enabling transition.
 * 
 * Excludes elements that have already reached the enabled state.
 * 
 * @param styles - The styles applied to elements currently in the enabling transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the enabling transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEnabling({
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifEnabling            = (styles: CssStyleCollection): CssRule => rule(isEnablingSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the disabling transition.
 * 
 * Excludes elements that have already reached the disabled state.
 * 
 * @param styles - The styles applied to elements currently in the disabling transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the disabling transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDisabling({
 *         color: 'darkgray',
 *     }),
 * });
 * ```
 */
export const ifDisabling           = (styles: CssStyleCollection): CssRule => rule(isDisablingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either enabling or fully enabled.
 * 
 * @param styles - The styles applied to elements that are either enabling or fully enabled.
 * @returns A `CssRule` that applies the given `styles` for elements that are either enabling or fully enabled.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEnablingOrEnabled({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifEnablingOrEnabled   = (styles: CssStyleCollection): CssRule => rule(isEnablingOrEnabledSelector   , styles);

/**
 * Applies the given `styles` to elements that are either disabling or fully disabled.
 * 
 * @param styles - The styles applied to elements that are either disabling or fully disabled.
 * @returns A `CssRule` that applies the given `styles` for elements that are either disabling or fully disabled.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDisablingOrDisabled({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifDisablingOrDisabled = (styles: CssStyleCollection): CssRule => rule(isDisablingOrDisabledSelector , styles);



/**
 * A strongly typed global mapping of enable/disable-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [disabledStateVars] = cssVars<DisabledStateVars>({ prefix: 'ds', minify: false });

// Register the enable/disable animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(disabledStateVars.animationEnable);
animationRegistry.registerAnimation(disabledStateVars.animationDisable);

/**
 * Generates CSS rules that conditionally apply the enable/disable animations based on current disabled state,
 * and exposes enable/disable-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing enable/disable animations.
 * @returns A CSS API for conditionally apply the enable/disable animations based on current disabled state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Enabled/disabled state:
 * import { usesDisabledState } from '@reusable-ui/disabled-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const disableableBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         disabledStateRule,
 *         disabledStateVars: { isEnabled, isDisabled },
 *     } = usesDisabledState({
 *         animationEnable  : 'var(--box-enable)',
 *         animationDisable : 'var(--box-disable)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply enabled/disabled state rules:
 *         ...disabledStateRule(),
 *         
 *         // Define enabling animation:
 *         ...vars({
 *             '--box-enable': [
 *                 ['0.3s', 'ease-out', 'both', 'fade-enabling'],
 *             ],
 *         }),
 *         ...keyframes('fade-enabling', {
 *             from: {
 *                 opacity: 0.5,
 *             },
 *             to: {
 *                 opacity: 1,
 *             },
 *         }),
 *         
 *         // Define disabling animation:
 *         ...vars({
 *             '--box-disable': [
 *                 ['0.3s', 'ease-out', 'both', 'fade-disabling'],
 *             ],
 *         }),
 *         ...keyframes('fade-disabling', {
 *             from: {
 *                 opacity: 1,
 *             },
 *             to: {
 *                 opacity: 0.5,
 *             },
 *         }),
 *         
 *         // Define final opacity based on lifecycle state:
 *         ...fallback({
 *             '--opacity-enabled'  : `${isEnabled} 1`,
 *         }),
 *         ...fallback({
 *             '--opacity-disabled' : `${isDisabled} 0.5`,
 *         }),
 *         opacity: 'var(--opacity-enabled, var(--opacity-disabled))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesDisabledState = (options?: CssDisabledStateOptions): CssDisabledState => {
    // Extract options and assign defaults:
    const {
        animationEnable  = 'none', // Defaults to `none`.
        animationDisable = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        disabledStateRule : () => style({
            ...states({
                // Apply enable animation during the enabling phase:
                ...ifEnabling(
                    vars({
                        [disabledStateVars.animationEnable ] : animationEnable,  // Activate the animation (if provided).
                    })
                ),
                
                // Apply disable animation during the disabling phase:
                ...ifDisabling(
                    vars({
                        [disabledStateVars.animationDisable] : animationDisable, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as enabled during both enabling and fully enabled states:
                ...ifEnablingOrEnabled(
                    vars({
                        [disabledStateVars.isEnabled ] : '',      // Valid    when either enabling or fully enabled.
                        [disabledStateVars.isDisabled] : 'unset', // Poisoned when either enabling or fully enabled.
                    })
                ),
                
                // Mark as disabled during both disabling and fully disabled states:
                ...ifDisablingOrDisabled(
                    vars({
                        [disabledStateVars.isEnabled ] : 'unset', // Poisoned when either disabling or fully disabled.
                        [disabledStateVars.isDisabled] : '',      // Valid    when either disabling or fully disabled.
                    })
                ),
            }),
        }),
        
        disabledStateVars,
    } satisfies CssDisabledState;
};
