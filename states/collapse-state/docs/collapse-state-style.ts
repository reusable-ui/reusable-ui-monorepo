// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Expanded/collapsed state:
import { usesCollapseState } from '@reusable-ui/collapse-state';

// CSS-in-JS:
import { atRule, children, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a collapsible box style.
 * 
 * - Demonstrates how collapse-state drives a custom property (`--expandFactor`).
 * - `--expandFactor` animates between 0 (collapsed) and 1 (expanded).
 * - Always available: defaults to 0 when collapsed, animates to 1 when expanded.
 * - Can be applied to height, opacity, rotation, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `expandFactor` variable in collapse-state.
 */
export const collapsibleBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: collapse/expand lifecycle
    const {
        collapseStateRule,
        collapseStateVars: { isExpanded },
    } = usesCollapseState({
        animationExpanding  : 'var(--box-expanding)',
        animationCollapsing : 'var(--box-collapsing)',
    });
    
    return style({
        /**
         * Layout:
         * - Use CSS Grid to animate the "content" row height.
         * - Multiply 1fr by `--expandFactor` (0 → hidden, 1 → full height).
         */
        display: 'grid',
        gridTemplate: [[
            '"content" calc(1fr * var(--expandFactor))',
            '/',
            '1fr',
        ]],
        overflow: 'hidden', // Crop overflowing content.
        ...children('.content', {
            gridArea: 'content',
        }),
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply expanded/collapsed state rules:
        ...collapseStateRule(),
        
        
        
        /**
         * Define animatable variable:
         * - `--expandFactor` is a typed custom property.
         * - Normalized number: 0 → collapsed, 1 → expanded.
         * - Thanks to `initial-value: 0`, the property is always `0` when not defined (`unset`).
         */
        ...atRule('@property --expandFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Expanding animation: 0 → 1
        ...vars({
            '--box-expanding': [
                ['0.3s', 'ease-out', 'both', 'height-expanding'],
            ],
        }),
        ...keyframes('height-expanding', {
            from: {
                '--expandFactor' : 0,
            },
            to: {
                '--expandFactor' : 1,
            },
        }),
        
        // Collapsing animation: 1 → 0
        ...vars({
            '--box-collapsing': [
                ['0.3s', 'ease-out', 'both', 'height-collapsing'],
            ],
        }),
        ...keyframes('height-collapsing', {
            from: {
                '--expandFactor' : 1,
            },
            to: {
                '--expandFactor' : 0,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled expanded state
        /**
         * When fully expanded:
         * - Force `--expandFactor` to 1.
         * When collapsed:
         * - No explicit fallback needed; @property ensures it resolves to 0.
         * 
         * This variable is agnostic to animation style:
         * - Can drive height, opacity, transform, rotation, etc.
         */
        '--expandFactor': [[
            // Only applies if in expanded state:
            isExpanded,
            
            // The fully expanded value:
            1,
        ]],
        //#endregion Settled expanded state
        
        
        
        // Apply composed animations:
        animation,
    });
};
