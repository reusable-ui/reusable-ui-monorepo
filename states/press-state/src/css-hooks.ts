// Types:
import {
    type CssPressStateOptions,
    type CssPressState,
}                           from './css-types.js'

// CSS Variables:
import {
    pressStateVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifPressed,
    ifReleased,
    ifPressing,
    ifReleasing,
    ifPressingOrPressed,
    ifReleasingOrReleased,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usingFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the press/release animations based on current pressed state,
 * and exposes press/release-related CSS variables for conditional animation.
 * 
 * @param options An optional configuration for customizing press/release animations.
 * @returns A CSS API for conditionally apply the press/release animations based on current pressed state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usingAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Press/release state:
 * import { usingPressState } from '@reusable-ui/press-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const pressableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usingAnimationFeature();
 *     
 *     // Feature: press/release lifecycle
 *     const {
 *         pressStateRule,
 *         pressStateVars: { isPressed, isReleased, pressFactor },
 *     } = usingPressState({
 *         pressingAnimation  : 'var(--box-pressing)',
 *         releasingAnimation : 'var(--box-releasing)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply press/release state rules:
 *         ...pressStateRule(),
 *         
 *         // Pressing animation: interpolate pressFactor from 0 → 1
 *         ...vars({
 *             '--box-pressing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-pressing'],
 *             ],
 *         }),
 *         ...keyframes('transition-pressing', {
 *             from : { [pressFactor]: 0 },
 *             to   : { [pressFactor]: 1 },
 *         }),
 *         
 *         // Releasing animation: interpolate pressFactor from 1 → 0
 *         ...vars({
 *             '--box-releasing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-releasing'],
 *             ],
 *         }),
 *         ...keyframes('transition-releasing', {
 *             from : { [pressFactor]: 1 },
 *             to   : { [pressFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Background color interpolates with `pressFactor`.
 *         // - 0 → blue, 1 → darkblue.
 *         backgroundColor: `color-mix(in oklch,
 *             blue calc((1 - ${pressFactor}) * 100%),
 *             darkblue calc(${pressFactor} * 100%)
 *         )`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usingPressState = (options?: CssPressStateOptions): CssPressState => ({
    pressStateRule : () => usingFeedbackState({
        // Feedback animations for visual effects whenever a press state changes:
        animations      : [
            {
                ifState   : ifPressing,
                variable  : pressStateVars.pressingAnimation,
                animation : options?.pressingAnimation,
            },
            {
                ifState   : ifReleasing,
                variable  : pressStateVars.releasingAnimation,
                animation : options?.releasingAnimation,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifPressingOrPressed,
                variable : pressStateVars.isPressed,
            },
            {
                ifState  : ifReleasingOrReleased,
                variable : pressStateVars.isReleased,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : pressStateVars.pressFactor,
        factorCondVar   : pressStateVars.pressFactorCond,
        ifInactiveState : ifReleased,
        activeFactors   : [
            {
                ifState : ifPressed,
                factor  : 1,
            },
        ],
    }),
    
    pressStateVars,
}) satisfies CssPressState;
