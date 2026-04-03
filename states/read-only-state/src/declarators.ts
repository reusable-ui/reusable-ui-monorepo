// Types:
import {
    type CssReadOnlyStateOptions,
    type CssReadOnlyState,
}                           from './types.js'

// CSS Variables:
import {
    readOnlyStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifEditable,
    ifReadOnly,
    ifThawing,
    ifFreezing,
    ifThawingOrEditable,
    ifFreezingOrReadOnly,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the editable/read-only animations based on current read-only state,
 * and exposes editable/read-only-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing editable/read-only animations.
 * @returns A CSS API for conditionally apply the editable/read-only animations based on current read-only state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Editable/read-only state:
 * import { usesReadOnlyState } from '@reusable-ui/read-only-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const readOnlyBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: editable/read-only lifecycle
 *     const {
 *         readOnlyStateRule,
 *         readOnlyStateVars: { isEditable, isReadOnly, readOnlyFactor },
 *     } = usesReadOnlyState({
 *         animationThawing  : 'var(--box-thawing)',
 *         animationFreezing : 'var(--box-freezing)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply editable/read-only state rules:
 *         ...readOnlyStateRule(),
 *         
 *         // Thawing animation: interpolate readOnlyFactor from 1 → 0
 *         ...vars({
 *             '--box-thawing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-thawing'],
 *             ],
 *         }),
 *         ...keyframes('transition-thawing', {
 *             from : { [readOnlyFactor]: 1 },
 *             to   : { [readOnlyFactor]: 0 },
 *         }),
 *         
 *         // Freezing animation: interpolate readOnlyFactor from 0 → 1
 *         ...vars({
 *             '--box-freezing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-freezing'],
 *             ],
 *         }),
 *         ...keyframes('transition-freezing', {
 *             from : { [readOnlyFactor]: 0 },
 *             to   : { [readOnlyFactor]: 1 },
 *         }),
 *         
 *         // Example usage:
 *         // - Opacity interpolates with `readOnlyFactor`.
 *         // - 0 → fully visible (editable), 1 → dimmed (read-only).
 *         opacity: `calc(1 - (${readOnlyFactor} * 0.5))`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesReadOnlyState = (options?: CssReadOnlyStateOptions): CssReadOnlyState => ({
    readOnlyStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a read-only state changes:
        animations      : [
            {
                ifState   : ifThawing,
                variable  : readOnlyStateVars.animationThawing,
                animation : options?.animationThawing,
            },
            {
                ifState   : ifFreezing,
                variable  : readOnlyStateVars.animationFreezing,
                animation : options?.animationFreezing,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifThawingOrEditable,
                variable : readOnlyStateVars.isEditable,
            },
            {
                ifState  : ifFreezingOrReadOnly,
                variable : readOnlyStateVars.isReadOnly,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : readOnlyStateVars.readOnlyFactor,
        factorCondVar   : readOnlyStateVars.readOnlyFactorCond,
        ifInactiveState : ifEditable,
        activeFactors   : [
            {
                ifState : ifReadOnly,
                factor  : 1,
            },
        ],
    }),
    
    readOnlyStateVars,
}) satisfies CssReadOnlyState;
