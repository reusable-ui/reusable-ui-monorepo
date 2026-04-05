// Types:
import {
    type CssHoverStateOptions,
    type CssHoverState,
}                           from './types.js'

// CSS Variables:
import {
    hoverStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifHovered,
    ifUnhovered,
    ifHovering,
    ifUnhovering,
    ifHoveringOrHovered,
    ifUnhoveringOrUnhovered,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * Generates CSS rules that conditionally apply the hover/unhover animations based on current hovered state,
 * and exposes hover/unhover-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing hover/unhover animations.
 * @returns A CSS API for conditionally apply the hover/unhover animations based on current hovered state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Hovered/unhovered state:
 * import { usesHoverState } from '@reusable-ui/hover-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const hoverableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: hover/unhover lifecycle
 *     const {
 *         hoverStateRule,
 *         hoverStateVars: { isHovered, isUnhovered, hoverFactor },
 *     } = usesHoverState({
 *         animationHovering   : 'var(--box-hovering)',
 *         animationUnhovering : 'var(--box-unhovering)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply hovered/unhovered state rules:
 *         ...hoverStateRule(),
 *         
 *         // Hovering animation: interpolate hoverFactor from 0 → 1
 *         ...vars({
 *             '--box-hovering': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-hovering'],
 *             ],
 *         }),
 *         ...keyframes('transition-hovering', {
 *             from : { [hoverFactor]: 0 },
 *             to   : { [hoverFactor]: 1 },
 *         }),
 *         
 *         // Unhovering animation: interpolate hoverFactor from 1 → 0
 *         ...vars({
 *             '--box-unhovering': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-unhovering'],
 *             ],
 *         }),
 *         ...keyframes('transition-unhovering', {
 *             from : { [hoverFactor]: 1 },
 *             to   : { [hoverFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Outline thickness interpolates with `hoverFactor`.
 *         // - 0 → none, 1 → 2px solid blue.
 *         outline: `calc(${hoverFactor} * 2px) solid blue`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesHoverState = (options?: CssHoverStateOptions): CssHoverState => ({
    hoverStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a hover state changes:
        animations      : [
            {
                ifState   : ifHovering,
                variable  : hoverStateVars.animationHovering,
                animation : options?.animationHovering,
            },
            {
                ifState   : ifUnhovering,
                variable  : hoverStateVars.animationUnhovering,
                animation : options?.animationUnhovering,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifHoveringOrHovered,
                variable : hoverStateVars.isHovered,
            },
            {
                ifState  : ifUnhoveringOrUnhovered,
                variable : hoverStateVars.isUnhovered,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : hoverStateVars.hoverFactor,
        factorCondVar   : hoverStateVars.hoverFactorCond,
        ifInactiveState : ifUnhovered,
        activeFactors   : [
            {
                ifState : ifHovered,
                factor  : 1,
            },
        ],
    }),
    
    hoverStateVars,
}) satisfies CssHoverState;
