// Types:
import {
    type CssDisabledStateOptions,
    type CssDisabledState,
}                           from './types.js'

// CSS Variables:
import {
    disabledStateVars,
}                           from './css-variables.js'

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
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



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
        activeFactors   : [
            {
                ifState : ifDisabled,
                factor  : 1,
            },
        ],
    }),
    
    disabledStateVars,
}) satisfies CssDisabledState;
