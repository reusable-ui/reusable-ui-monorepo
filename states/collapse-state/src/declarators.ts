// Types:
import {
    type CssCollapseStateOptions,
    type CssCollapseState,
}                           from './types.js'

// CSS Variables:
import {
    collapseStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifExpanded,
    ifCollapsed,
    ifExpanding,
    ifCollapsing,
    ifExpandingOrExpanded,
    ifCollapsingOrCollapsed,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesInteractionState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/**
 * Generates CSS rules that conditionally apply the expand/collapse animations based on current expanded state,
 * and exposes expand/collapse-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing expand/collapse animations.
 * @returns A CSS API for conditionally apply the expand/collapse animations based on current expanded state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Expanded/collapsed state:
 * import { usesCollapseState } from '@reusable-ui/collapse-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const collapsibleBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: expand/collapse lifecycle
 *     const {
 *         collapseStateRule,
 *         collapseStateVars: { isExpanded, isCollapsed, expandFactor },
 *     } = usesCollapseState({
 *         animationExpanding  : 'var(--box-expanding)',
 *         animationCollapsing : 'var(--box-collapsing)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply expanded/collapsed state rules:
 *         ...collapseStateRule(),
 *         
 *         // Expanding animation: interpolate expandFactor from 0 → 1
 *         ...vars({
 *             '--box-expanding': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-expanding'],
 *             ],
 *         }),
 *         ...keyframes('transition-expanding', {
 *             from : { [expandFactor]: 0 },
 *             to   : { [expandFactor]: 1 },
 *         }),
 *         
 *         // Collapsing animation: interpolate expandFactor from 1 → 0
 *         ...vars({
 *             '--box-collapsing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-collapsing'],
 *             ],
 *         }),
 *         ...keyframes('transition-collapsing', {
 *             from : { [expandFactor]: 1 },
 *             to   : { [expandFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Height interpolates with `expandFactor`.
 *         // - 0 → hidden, 1 → full height.
 *         height: `calc-size(auto, size * ${expandFactor})`,
 *         boxSizing: 'border-box', // Include paddings and borders in the height calculation.
 *         overflow: 'hidden', // Crop overflowing content.
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesCollapseState = (options?: CssCollapseStateOptions): CssCollapseState => ({
    collapseStateRule : () => usesInteractionState({
        // Feedback animations for visual effects whenever a collapse state changes:
        animations      : [
            {
                ifState   : ifExpanding,
                variable  : collapseStateVars.animationExpanding,
                animation : options?.animationExpanding,
            },
            {
                ifState   : ifCollapsing,
                variable  : collapseStateVars.animationCollapsing,
                animation : options?.animationCollapsing,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifExpandingOrExpanded,
                variable : collapseStateVars.isExpanded,
            },
            {
                ifState  : ifCollapsingOrCollapsed,
                variable : collapseStateVars.isCollapsed,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : collapseStateVars.expandFactor,
        factorCondVar   : collapseStateVars.expandFactorCond,
        ifInactiveState : ifCollapsed,
        
        // The logical baseline (no collapse effect applied) would be `1` (expanded).
        // For safety against unexpected failures, and to optimize the collapsed state (the most common case),
        // the baseline is set to `0` (collapsed).
        baselineFactor  : 0,
        
        activeFactors   : [
            {
                ifState : ifExpanded,
                factor  : 1,
            },
        ],
    }),
    
    collapseStateVars,
}) satisfies CssCollapseState;
