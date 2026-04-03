// Types:
import {
    type CssFocusStateOptions,
    type CssFocusState,
}                           from './types.js'

// CSS Variables:
import {
    focusStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifFocused,
    ifBlurred,
    ifFocusing,
    ifBlurring,
    ifFocusingOrFocused,
    ifBlurringOrBlurred,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the focus/blur animations based on current focused state,
 * and exposes focus/blur-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing focus/blur animations.
 * @returns A CSS API for conditionally apply the focus/blur animations based on current focused state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Focused/blurred state:
 * import { usesFocusState } from '@reusable-ui/focus-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const focusableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: focus/blur lifecycle
 *     const {
 *         focusStateRule,
 *         focusStateVars: { isFocused, isBlurred, focusFactor },
 *     } = usesFocusState({
 *         animationFocusing : 'var(--box-focusing)',
 *         animationBlurring : 'var(--box-blurring)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply focused/blurred state rules:
 *         ...focusStateRule(),
 *         
 *         // Focusing animation: interpolate focusFactor from 0 → 1
 *         ...vars({
 *             '--box-focusing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-focusing'],
 *             ],
 *         }),
 *         ...keyframes('transition-focusing', {
 *             from : { [focusFactor]: 0 },
 *             to   : { [focusFactor]: 1 },
 *         }),
 *         
 *         // Blurring animation: interpolate focusFactor from 1 → 0
 *         ...vars({
 *             '--box-blurring': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-blurring'],
 *             ],
 *         }),
 *         ...keyframes('transition-blurring', {
 *             from : { [focusFactor]: 1 },
 *             to   : { [focusFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Outline thickness interpolates with `focusFactor`.
 *         // - 0 → none, 1 → 2px solid blue.
 *         outline: `calc(${focusFactor} * 2px) solid blue`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesFocusState = (options?: CssFocusStateOptions): CssFocusState => ({
    focusStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a focus state changes:
        animations      : [
            {
                ifState   : ifFocusing,
                variable  : focusStateVars.animationFocusing,
                animation : options?.animationFocusing,
            },
            {
                ifState   : ifBlurring,
                variable  : focusStateVars.animationBlurring,
                animation : options?.animationBlurring,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifFocusingOrFocused,
                variable : focusStateVars.isFocused,
            },
            {
                ifState  : ifBlurringOrBlurred,
                variable : focusStateVars.isBlurred,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : focusStateVars.focusFactor,
        factorCondVar   : focusStateVars.focusFactorCond,
        ifInactiveState : ifBlurred,
        activeFactors   : [
            {
                ifState : ifFocused,
                factor  : 1,
            },
        ],
    }),
    
    focusStateVars,
}) satisfies CssFocusState;
