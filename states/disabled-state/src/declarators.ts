// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    
    
    
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

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



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

// Register the enable/disable-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(disabledStateVars.animationEnabling);
animationRegistry.registerAnimation(disabledStateVars.animationDisabling);

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
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: enable/disable lifecycle
 *     const {
 *         disabledStateRule,
 *         disabledStateVars: { isEnabled, isDisabled, disableFactor },
 *     } = usesDisabledState({
 *         animationEnabling  : 'var(--box-enabling)',
 *         animationDisabling : 'var(--box-disabling)',
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
 *         // Enabling animation: interpolate disableFactor from 1 → 0
 *         ...vars({
 *             '--box-enabling': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-enabling'],
 *             ],
 *         }),
 *         ...keyframes('transition-enabling', {
 *             from : { [disableFactor]: 1 },
 *             to   : { [disableFactor]: 0 },
 *         }),
 *         
 *         // Disabling animation: interpolate disableFactor from 0 → 1
 *         ...vars({
 *             '--box-disabling': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-disabling'],
 *             ],
 *         }),
 *         ...keyframes('transition-disabling', {
 *             from : { [disableFactor]: 0 },
 *             to   : { [disableFactor]: 1 },
 *         }),
 *         
 *         // Example usage:
 *         // - Opacity interpolates with `disableFactor`.
 *         // - 0 → fully visible, 1 → dimmed.
 *         opacity: `calc(1 - (${disableFactor} * 0.5))`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesDisabledState = (options?: CssDisabledStateOptions): CssDisabledState => ({
    disabledStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a disabled state changes:
        animations      : [
            {
                ifState   : ifEnabling,
                variable  : disabledStateVars.animationEnabling,
                animation : options?.animationEnabling,
            },
            {
                ifState   : ifDisabling,
                variable  : disabledStateVars.animationDisabling,
                animation : options?.animationDisabling,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifEnablingOrEnabled,
                variable : disabledStateVars.isEnabled,
            },
            {
                ifState  : ifDisablingOrDisabled,
                variable : disabledStateVars.isDisabled,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : disabledStateVars.disableFactor,
        factorCondVar   : disabledStateVars.disableFactorCond,
        ifInactiveState : ifEnabled,
        factors         : [
            {
                ifState : ifDisabled,
                factor  : 1,
            },
            // Not needed: Defaults to 0 when no case matches:
            // {
            //     ifState : ifEnabled,
            //     factor  : 0,
            // },
        ],
    }),
    
    disabledStateVars,
}) satisfies CssDisabledState;
