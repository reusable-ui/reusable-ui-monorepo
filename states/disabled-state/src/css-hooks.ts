// Types:
import {
    type CssDisabledStateOptions,
    type CssDisabledState,
}                           from './css-types.js'

// CSS Variables:
import {
    disabledStateVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifEnabled,
    ifDisabled,
    ifEnabling,
    ifDisabling,
    ifEnablingOrEnabled,
    ifDisablingOrDisabled,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usingFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the enabled/disabled animations based on current disabled state,
 * and exposes enabled/disabled-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing enabled/disabled animations.
 * @returns A CSS API for conditionally apply the enabled/disabled animations based on current disabled state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usingAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Enabled/disabled state:
 * import { usingDisabledState } from '@reusable-ui/disabled-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const disableableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usingAnimationFeature();
 *     
 *     // Feature: enabled/disabled lifecycle
 *     const {
 *         disabledStateRule,
 *         disabledStateVars: { isEnabled, isDisabled, disabledFactor },
 *     } = usingDisabledState({
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
 *         // Enabling animation: interpolate disabledFactor from 1 → 0
 *         ...vars({
 *             '--box-enabling': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-enabling'],
 *             ],
 *         }),
 *         ...keyframes('transition-enabling', {
 *             from : { [disabledFactor]: 1 },
 *             to   : { [disabledFactor]: 0 },
 *         }),
 *         
 *         // Disabling animation: interpolate disabledFactor from 0 → 1
 *         ...vars({
 *             '--box-disabling': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-disabling'],
 *             ],
 *         }),
 *         ...keyframes('transition-disabling', {
 *             from : { [disabledFactor]: 0 },
 *             to   : { [disabledFactor]: 1 },
 *         }),
 *         
 *         // Example usage:
 *         // - Opacity interpolates with `disabledFactor`.
 *         // - 0 → fully visible, 1 → dimmed.
 *         opacity: `calc(1 - (${disabledFactor} * 0.5))`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usingDisabledState = (options?: CssDisabledStateOptions): CssDisabledState => ({
    disabledStateRule : () => usingFeedbackState({
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
        factorVar       : disabledStateVars.disabledFactor,
        factorCondVar   : disabledStateVars.disabledFactorCond,
        ifInactiveState : ifEnabled,
        activeFactors   : [
            {
                ifState : ifDisabled,
                factor  : 1,
            },
        ],
    }),
    
    disabledStateVars,
}) satisfies CssDisabledState;
