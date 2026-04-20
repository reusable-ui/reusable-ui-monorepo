// Types:
import {
    type CssDragStateOptions,
    type CssDragState,
}                           from './types.js'

// CSS Variables:
import {
    dragStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifDragged,
    ifDropped,
    ifDragging,
    ifDropping,
    ifDraggingOrDragged,
    ifDroppingOrDropped,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.



/**
 * Generates CSS rules that conditionally apply the drag/drop animations based on current dragged state,
 * and exposes drag/drop-related CSS variables for use in conditional styling.
 * 
 * @param options - An optional configuration for customizing drag/drop animations.
 * @returns A CSS API for conditionally apply the drag/drop animations based on current dragged state.
 * 
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Dragged/dropped state:
 * import { usesDragState } from '@reusable-ui/drag-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes } from '@cssfn/core';
 * 
 * export const draggableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: drag/drop lifecycle
 *     const {
 *         dragStateRule,
 *         dragStateVars: { isDragged, isDropped, relativeDragOffsetX, relativeDragOffsetY, dragFactor },
 *     } = usesDragState({
 *         animationDragging : 'var(--box-dragging)',
 *         animationDropping : 'var(--box-dropping)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply dragged/dropped state rules:
 *         ...dragStateRule(),
 *         
 *         // Dragging animation: interpolate dragFactor from 0 → 1
 *         ...vars({
 *             '--box-dragging': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-dragging'],
 *             ],
 *         }),
 *         ...keyframes('transition-dragging', {
 *             from : { [dragFactor]: 0 },
 *             to   : { [dragFactor]: 1 },
 *         }),
 *         
 *         // Dropping animation: interpolate dragFactor from 1 → 0
 *         ...vars({
 *             '--box-dropping': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-dropping'],
 *             ],
 *         }),
 *         ...keyframes('transition-dropping', {
 *             from : { [dragFactor]: 1 },
 *             to   : { [dragFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Smoothly move the element from its original position to the pointer position.
 *         // - 0 → original position, 1 → pointer position.
 *         transform: `translate(calc(${relativeDragOffsetX} * 1px * ${dragFactor}), calc(${relativeDragOffsetY} * 1px * ${dragFactor}))`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesDragState = (options?: CssDragStateOptions): CssDragState => ({
    dragStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a drag state changes:
        animations      : [
            {
                ifState   : ifDragging,
                variable  : dragStateVars.animationDragging,
                animation : options?.animationDragging,
            },
            {
                ifState   : ifDropping,
                variable  : dragStateVars.animationDropping,
                animation : options?.animationDropping,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifDraggingOrDragged,
                variable : dragStateVars.isDragged,
            },
            {
                ifState  : ifDroppingOrDropped,
                variable : dragStateVars.isDropped,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : dragStateVars.dragFactor,
        factorCondVar   : dragStateVars.dragFactorCond,
        ifInactiveState : ifDropped,
        activeFactors   : [
            {
                ifState : ifDragged,
                factor  : 1,
            },
        ],
    }),
    
    dragStateVars,
}) satisfies CssDragState;
